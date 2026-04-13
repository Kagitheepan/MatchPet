export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, address, city, postalCode, password } = await request.json();

    if (!name || !email || !password || !address || !city || !postalCode) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent Ãªtre remplis' }, { status: 400 });
    }

    // VÃ©rifier si le refuge existe dÃ©jÃ 
    const existing = await prisma.refuge.findUnique({ where: { email_refuge: email } });
    if (existing) {
      return NextResponse.json({ error: 'Un refuge avec cet email existe dÃ©jÃ ' }, { status: 409 });
    }

    // GÃ©nÃ©rer un code de vÃ©rification Ã  6 chiffres
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const hashedPassword = await bcrypt.hash(password, 12);

    // CrÃ©er le refuge en base
    const refuge = await prisma.refuge.create({
      data: {
        name,
        email_refuge: email,
        phone: phone || null,
        address,
        city,
        postalCode,
        latitude: 0,
        longitude: 0,
        password: hashedPassword,
        verificationCode,
        isVerified: false,
      },
    });

    // Envoyer l'email de vÃ©rification
// Envoyer l'email de vérification
    try {
      await sendVerificationEmail(email, name, verificationCode);
    } catch (emailErr) {
      console.error('Erreur envoi email:', emailErr);
      // On supprime le refuge créé pour qu'il puisse retenter son inscription
      await prisma.refuge.delete({ where: { id: refuge.id } });
      return NextResponse.json({ error: "Le compte n'a pas pu être créé car l'envoi de l'email a échoué." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription rÃ©ussie. Un code de vÃ©rification a Ã©tÃ© envoyÃ© Ã  votre email.',
      refugeId: refuge.id,
    });
  } catch (error) {
    console.error('Admin Register Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

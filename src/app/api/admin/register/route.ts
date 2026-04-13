export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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

    const hashedPassword = await bcrypt.hash(password, 12);

    // CrÃ©er le refuge en base - Directement vÃ©rifiÃ©
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
        verificationCode: null,
        isVerified: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inscription rÃ©ussie.',
      refugeId: refuge.id,
    });
  } catch (error) {
    console.error('Admin Register Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

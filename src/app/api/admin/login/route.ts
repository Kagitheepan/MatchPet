export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Renseignez tous les champs' }, { status: 400 });
    }

    const refuge = await prisma.refuge.findUnique({ where: { email_refuge: email } });

    if (!refuge || !refuge.password) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, refuge.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    // Auto-verify if not verified (legacy fix)
    if (!refuge.isVerified) {
      await prisma.refuge.update({
        where: { id: refuge.id },
        data: { isVerified: true }
      });
    }

    return NextResponse.json({
      success: true,
      refuge: {
        id: refuge.id,
        name: refuge.name,
        email: refuge.email_refuge,
        city: refuge.city,
      },
    });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

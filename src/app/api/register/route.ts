export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.userProfile.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ error: 'Un compte avec cet email existe dÃ©jÃ ' }, { status: 409 });
    }

    const fullName = [firstName, lastName].filter(Boolean).join(' ') || null;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.userProfile.create({
      data: {
        email,
        password: hashedPassword,
        name: fullName,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: user.email,
        phone: user.phone || '',
      },
    });
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json({ error: 'Une erreur serveur est survenue' }, { status: 500 });
  }
}

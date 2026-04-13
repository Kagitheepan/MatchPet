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

    const user = await prisma.userProfile.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Identifiants invalides ou introuvables' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Identifiants invalides ou introuvables' }, { status: 401 });
    }

    // Split name back to format
    const nameParts = user.name ? user.name.split(' ') : [''];
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ') || '';

    return NextResponse.json({
      success: true,
      user: {
        firstName,
        lastName,
        email: user.email,
        phone: user.phone || ''
      }
    });

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Une erreur serveur est survenue' }, { status: 500 });
  }
}

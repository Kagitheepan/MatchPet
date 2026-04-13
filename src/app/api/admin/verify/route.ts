export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email et code requis' }, { status: 400 });
    }

    const refuge = await prisma.refuge.findUnique({ where: { email_refuge: email } });

    if (!refuge) {
      return NextResponse.json({ error: 'Refuge introuvable' }, { status: 404 });
    }

    if (refuge.isVerified) {
      return NextResponse.json({ error: 'Ce refuge est dÃ©jÃ  vÃ©rifiÃ©' }, { status: 400 });
    }

    if (refuge.verificationCode !== code) {
      return NextResponse.json({ error: 'Code de vÃ©rification invalide' }, { status: 401 });
    }

    // Marquer comme vÃ©rifiÃ© et supprimer le code
    await prisma.refuge.update({
      where: { email_refuge: email },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });

    return NextResponse.json({ success: true, message: 'Compte vÃ©rifiÃ© avec succÃ¨s !' });
  } catch (error) {
    console.error('Verify Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

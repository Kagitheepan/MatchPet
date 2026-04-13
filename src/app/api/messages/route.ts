export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Récupérer les messages d'un dossier d'adoption
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const adoptionId = searchParams.get('adoptionId');

  if (!adoptionId) {
    return NextResponse.json({ error: 'adoptionId requis' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { adoptionId: parseInt(adoptionId) },
      orderBy: { createdAt: 'asc' },
    });

    // Marquer comme lu
    const { searchParams: params } = new URL(request.url);
    const viewerType = params.get('viewerType'); // 'user' ou 'refuge'
    
    if (viewerType === 'user') {
      await prisma.adoption.update({
        where: { id: parseInt(adoptionId) },
        data: { hasUnreadUser: false }
      });
    } else if (viewerType === 'refuge') {
      await prisma.adoption.update({
        where: { id: parseInt(adoptionId) },
        data: { hasUnreadRefuge: false }
      });
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Get Messages Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST: Envoyer un message
export async function POST(request: Request) {
  try {
    const { adoptionId, senderType, senderId, content } = await request.json();

    const aid = parseInt(String(adoptionId));
    const sid = parseInt(String(senderId));

    if (isNaN(aid) || !senderType || isNaN(sid) || !content?.trim()) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    // Le frontend envoie 'refuge' ou 'user' en minuscules, on valide d'abord
    if (!['refuge', 'user'].includes(senderType)) {
      return NextResponse.json({ error: 'senderType invalide' }, { status: 400 });
    }

    // Vérifier que l'adoption existe
    const adoption = await prisma.adoption.findUnique({ where: { id: aid } });
    if (!adoption) {
      return NextResponse.json({ error: 'Dossier introuvable' }, { status: 404 });
    }

    // Création du message avec conversion en MAJUSCULE pour correspondre à l'Enum Prisma
    const message = await prisma.message.create({
      data: {
        adoptionId: aid,
        senderType: senderType.toUpperCase(), // <-- La correction est ici
        senderId: sid,
        content: content.trim(),
      },
    });

    // Mettre à jour les drapeaux de lecture dans l'adoption
    await prisma.adoption.update({
      where: { id: aid },
      data: {
        hasUnreadUser: senderType === 'refuge',
        hasUnreadRefuge: senderType === 'user',
      }
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Send Message Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
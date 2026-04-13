export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: RÃ©cupÃ©rer les dossiers d'adoption liÃ©s Ã  un refuge
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refugeId = searchParams.get('refugeId');

  if (!refugeId) {
    return NextResponse.json({ error: 'refugeId requis' }, { status: 400 });
  }

  try {
    // RÃ©cupÃ©rer les adoptions directement par refugeId
    // + fallback par externalIds pour les anciens dossiers
    const animals = await prisma.animal.findMany({
      where: { refugeId: parseInt(refugeId) },
      select: { externalId: true },
    });
    const externalIds = animals.map(a => a.externalId);

    const adoptions = await prisma.adoption.findMany({
      where: {
        OR: [
          { refugeId: parseInt(refugeId) },
          { animalExternalId: { in: externalIds } },
        ],
      },
      select: {
        id: true,
        animalName: true,
        animalImage: true,
        status: true,
        createdAt: true,
        hasUnreadRefuge: true,
        user: { select: { name: true, email: true, phone: true } }
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(adoptions);
  } catch (error) {
    console.error('Get Adoptions Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH: Mettre Ã  jour le statut d'un dossier
export async function PATCH(request: Request) {
  try {
    const { adoptionId, status } = await request.json();

    if (!adoptionId || !status) {
      return NextResponse.json({ error: 'adoptionId et status requis' }, { status: 400 });
    }

    const validStatuses = ['pending', 'reviewing', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
    }

    const adoption = await prisma.adoption.update({
      where: { id: adoptionId },
      data: { status },
    });

    return NextResponse.json({ success: true, adoption });
  } catch (error) {
    console.error('Update Adoption Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE: Supprimer un dossier d'adoption
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adoptionId = searchParams.get('adoptionId');

    if (!adoptionId) {
      return NextResponse.json({ error: 'adoptionId requis' }, { status: 400 });
    }

    await prisma.adoption.delete({
      where: { id: parseInt(adoptionId) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Adoption Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

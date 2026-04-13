export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refugeId, name, species, breed, age, gender, size, description, photos, goodWithChildren, goodWithDogs, goodWithCats, needsGarden, energyLevel } = body;

    if (!refugeId || !name || !species) {
      return NextResponse.json({ error: 'Nom, espÃ¨ce et refuge sont requis' }, { status: 400 });
    }

    // VÃ©rifier que le refuge existe et est vÃ©rifiÃ©
    const refuge = await prisma.refuge.findUnique({ where: { id: refugeId } });
    if (!refuge || !refuge.isVerified) {
      return NextResponse.json({ error: 'Refuge non trouvÃ© ou non vÃ©rifiÃ©' }, { status: 403 });
    }

    // GÃ©nÃ©rer un externalId unique
    const externalId = `MP-${refugeId}-${crypto.randomUUID().slice(0, 8)}`;

    const animal = await prisma.animal.create({
      data: {
        externalId,
        name,
        species,
        breed: breed || null,
        age: age || null,
        gender: gender || null,
        size: size || null,
        description: description || null,
        photos: photos || null,
        goodWithChildren: goodWithChildren || false,
        goodWithDogs: goodWithDogs || false,
        goodWithCats: goodWithCats || false,
        needsGarden: needsGarden || false,
        energyLevel: energyLevel || null,
        refugeId,
      },
    });

    return NextResponse.json({ success: true, animal });
  } catch (error) {
    console.error('Add Animal Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// GET: RÃ©cupÃ©rer les animaux d'un refuge
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refugeId = searchParams.get('refugeId');

  if (!refugeId) {
    return NextResponse.json({ error: 'refugeId requis' }, { status: 400 });
  }

  try {
    const animals = await prisma.animal.findMany({
      where: { refugeId: parseInt(refugeId) },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(animals);
  } catch (error) {
    console.error('Get Animals Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, species, breed, age, gender, size, description, photos, goodWithChildren, goodWithDogs, goodWithCats, needsGarden, energyLevel } = body;
    const refugeId = parseInt(body.refugeId);

    if (isNaN(refugeId) || !name || !species) {
      return NextResponse.json({ error: 'Nom, espèce et refuge valide sont requis' }, { status: 400 });
    }

    // Vérifier que le refuge existe et est vérifié
    const refuge = await prisma.refuge.findUnique({ where: { id: refugeId } });
    if (!refuge) {
      return NextResponse.json({ error: 'Refuge non trouvé' }, { status: 404 });
    }
    
    if (!refuge.isVerified) {
      return NextResponse.json({ error: 'Votre compte refuge doit être vérifié pour ajouter des animaux' }, { status: 403 });
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
      take: 50,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        age: true,
        gender: true,
        size: true,
        photos: true,
        refugeId: true,
        createdAt: true,
        // On exclut 'description' qui est un champ TEXT lourd
      }
    });
    return NextResponse.json(animals);
  } catch (error) {
    console.error('Get Animals Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, password, animalName, animalId, animalImage } = data;

    // Hash du mot de passe uniquement pour les nouveaux utilisateurs
    const hashedPassword = password && password !== "existing_user_hidden_password" 
      ? await bcrypt.hash(password, 12) 
      : undefined;

    // Sauvegarder l'utilisateur en base de donnÃ©es
    const user = await prisma.userProfile.upsert({
      where: { email },
      update: {
        name: `${firstName} ${lastName}`,
        phone,
      },
      create: {
        email,
        name: `${firstName} ${lastName}`,
        phone,
        password: hashedPassword || null,
      }
    });

    // Enregistrer le dossier d'adoption en DB
    if (animalId) {
      const animal = await prisma.animal.findFirst({
        where: {
          OR: [
            { externalId: String(animalId) },
            { id: !isNaN(Number(animalId)) ? Number(animalId) : -1 }
          ]
        },
        select: { id: true, externalId: true, refugeId: true, name: true, photos: true},
      });

      await prisma.adoption.create({
        data: {
          userId: user.id,
          animalExternalId: animal?.externalId || String(animalId),
          animalName: animal?.name || animalName,
          animalImage: (animal?.photos as any)?.[0] || animalImage || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500',
          refugeId: animal?.refugeId || null,
          status: "pending"
        }
      });
    }

    return NextResponse.json({ message: 'Dossier d\'adoption enregistré avec succès', success: true });

  } catch (error) {
    console.error('Adoption API Error:', error);
    return NextResponse.json({ error: 'Failed to process adoption' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchAnimalsFromRescueGroups } from '@/lib/rescuegroups';

export async function POST(request: Request) {
  try {
    const { zipCode = '75001', radius = 50 } = await request.json().catch(() => ({ zipCode: '75001', radius: 50 }));

    // Target a diverse array of species including rodents and volatiles
    const targetSpecies = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Small & Furry'];
    let externalAnimals: any[] = [];

    for (const species of targetSpecies) {
      // Fetch 30 instead of 10 to get a larger pool
      const animals = await fetchAnimalsFromRescueGroups(zipCode, radius, 30, species);
      if (animals && animals.length > 0) {
        // Diversify by breed: limit to max 3 per breed
        const breedCounts: Record<string, number> = {};
        const diverseAnimals = animals.filter(animal => {
          const breed = animal.attributes?.breedPrimary || 'Unknown';
          breedCounts[breed] = (breedCounts[breed] || 0) + 1;
          return breedCounts[breed] <= 3;
        });

        // Add up to 10 diverse animals
        externalAnimals.push(...diverseAnimals.slice(0, 10));
      }
    }

    if (!externalAnimals || externalAnimals.length === 0) {
      console.log(`No results found from RescueGroups for zipCode ${zipCode}.`);
      return NextResponse.json({ message: 'No animals found to sync' }, { status: 404 });
    }

    // On s'assure qu'un refuge par dÃ©faut existe pour les tests (ou on crÃ©e dynamiquement)
    // Pour cet exemple, on utilise le refuge de test ID 1 crÃ©Ã© par le seed.
    let defaultRefuge = await prisma.refuge.findFirst();
    
    if (!defaultRefuge) {
      defaultRefuge = await prisma.refuge.create({
        data: {
          name: 'Refuge Automatique',
          address: 'Adresse inconnue',
          city: 'Ville',
          postalCode: String(zipCode),
          latitude: 0,
          longitude: 0,
          email_refuge: 'contact@refuge-automatique.fr'
        }
      });
    }

    const syncResults = [];

    for (const ext of externalAnimals) {
      const animal = await prisma.animal.upsert({
        where: { externalId: ext.id },
        update: {
          name: ext.attributes.name,
          description: ext.attributes.descriptionText || '',
          species: ext.attributes.speciesString || ext.attributes.type || 'Unknown',
          breed: ext.attributes.breedPrimary || 'Unknown',
          age: ext.attributes.ageGroup || 'Unknown',
          gender: ext.attributes.sex || 'Unknown',
          size: ext.attributes.sizeGroup || 'Unknown',
          photos: ext.attributes.pictureThumbnailUrl ? [ext.attributes.pictureThumbnailUrl] : [],
        },
        create: {
          externalId: ext.id,
          name: ext.attributes.name,
          description: ext.attributes.descriptionText || '',
          species: ext.attributes.speciesString || ext.attributes.type || 'Unknown',
          breed: ext.attributes.breedPrimary || 'Unknown',
          age: ext.attributes.ageGroup || 'Unknown',
          gender: ext.attributes.sex || 'Unknown',
          size: ext.attributes.sizeGroup || 'Unknown',
          photos: ext.attributes.pictureThumbnailUrl ? [ext.attributes.pictureThumbnailUrl] : [],
          refugeId: defaultRefuge.id,
          // CritÃ¨res par dÃ©faut (pourront Ãªtre affinÃ©s avec plus de donnÃ©es RescueGroups)
          goodWithChildren: true, 
          goodWithDogs: true,
          goodWithCats: true,
          needsGarden: false,
        }
      });
      syncResults.push(animal.id);
    }

    return NextResponse.json({
      message: 'Synchronization complete',
      count: syncResults.length,
      animalIds: syncResults
    });

  } catch (error) {
    console.error('Sync Error:', error);
    return NextResponse.json({ error: 'Failed to sync with RescueGroups' }, { status: 500 });
  }
}

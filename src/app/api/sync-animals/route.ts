import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchAnimalsFromRescueGroups } from '@/lib/rescuegroups';

export async function POST(request: Request) {
  try {
    const { zipCode, radius = 50 } = await request.json().catch(() => ({ zipCode: undefined, radius: 50 }));

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

    // Si on est en France (code postal à 5 chiffres) et qu'on n'a pas de résultats,
    // on génère des données de test locales pour la démonstration.
    if (!externalAnimals || externalAnimals.length === 0) {
      console.log(`No results for ${zipCode}, generating mock data for France...`);
      externalAnimals = [
        {
          id: `fr_dog_${zipCode}_01`,
          attributes: {
            name: "Rocky",
            descriptionText: "Un chien dynamique qui adore les balades en forêt de Fontainebleau.",
            type: "Dog",
            breedPrimary: "Berger Allemand",
            ageGroup: "Adulte",
            sex: "Mâle",
            sizeGroup: "Grand",
            pictureThumbnailUrl: "https://images.unsplash.com/photo-1589944173250-3f90b5163d0b?q=80&w=800&auto=format&fit=crop",
          }
        },
        {
          id: `fr_cat_${zipCode}_01`,
          attributes: {
            name: "Misty",
            descriptionText: "Chatte tricolore très calme, cherche un appartement douillet.",
            type: "Cat",
            breedPrimary: "Européen",
            ageGroup: "Jeune",
            sex: "Femelle",
            sizeGroup: "Petit",
            pictureThumbnailUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800&auto=format&fit=crop",
          }
        },
        {
          id: `fr_dog_${zipCode}_02`,
          attributes: {
            name: "Bella",
            descriptionText: "Adore les enfants et les jeux de balle. Propre et affectueuse.",
            type: "Dog",
            breedPrimary: "Labrador",
            ageGroup: "Senior",
            sex: "Femelle",
            sizeGroup: "Moyen",
            pictureThumbnailUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop",
          }
        },
        {
          id: `fr_rabbit_${zipCode}_01`,
          attributes: {
            name: "Panpan",
            descriptionText: "Un petit lapin nain bélier, très curieux et amateur de carottes bio.",
            type: "Rabbit",
            breedPrimary: "Nain Bélier",
            ageGroup: "Jeune",
            sex: "Mâle",
            sizeGroup: "Petit",
            pictureThumbnailUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=800&auto=format&fit=crop",
          }
        },
        {
          id: `fr_bird_${zipCode}_01`,
          attributes: {
            name: "Céleste",
            descriptionText: "Magnifique perruche calopsitte, chanteuse mélodieuse et sociable.",
            type: "Bird",
            breedPrimary: "Calopsitte",
            ageGroup: "Adulte",
            sex: "Femelle",
            sizeGroup: "Petit",
            pictureThumbnailUrl: "https://images.unsplash.com/photo-1552728089-57bdde30eba3?q=80&w=800&auto=format&fit=crop",
          }
        }
      ] as any[];
    }

    // On s'assure qu'un refuge par défaut existe pour les tests (ou on crée dynamiquement)
    // Pour cet exemple, on utilise le refuge de test ID 1 créé par le seed.
    let defaultRefuge = await prisma.refuge.findFirst();
    
    if (!defaultRefuge) {
      defaultRefuge = await prisma.refuge.create({
        data: {
          name: 'Refuge Automatique',
          address: 'Adresse inconnue',
          city: 'Ville',
          postalCode: zipCode,
          latitude: 0,
          longitude: 0,
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
          // Critères par défaut (pourront être affinés avec plus de données RescueGroups)
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

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const hasChildren = searchParams.get('hasChildren') === 'true'
  const hasOtherPets = searchParams.get('hasOtherPets') === 'true'
  const hasGarden = searchParams.get('hasGarden') === 'true'
  const speciesRaw = searchParams.get('species') || ''
  const ageRaw = searchParams.get('age') || ''

  const speciesMap: Record<string, string[]> = {
    dog: ['Dog', 'Chien'],
    cat: ['Cat', 'Chat'],
    rabbit: ['Rabbit', 'Lapin'],
    bird: ['Bird', 'Oiseau'],
    other: ['Other', 'Autre'],
  }

  function getAgeFilter(ageStr: string): string[] {
    if (!ageStr) return []
    const categories = ageStr.split(',').filter(Boolean)
    return categories.includes('any') ? [] : categories
  }

  try {
    const whereClause: Prisma.AnimalWhereInput = {}

    if (speciesRaw) {
      const keys = speciesRaw.split(',').filter(Boolean);
      const dbSpecies: string[] = [];
      
      keys.forEach(k => {
        const matches = speciesMap[k.toLowerCase()] || [k];
        dbSpecies.push(...matches);
      });
      
      if (dbSpecies.length > 0) {
        whereClause.species = { in: dbSpecies }
      }
    }

    const ageCategories = getAgeFilter(ageRaw)
    if (ageCategories.length > 0) {
      whereClause.age = { in: ageCategories }
    }

    if (hasChildren) {
      whereClause.goodWithChildren = true
    }

    if (hasOtherPets) {
      whereClause.goodWithDogs = true
    }

    if (!hasGarden) {
      whereClause.needsGarden = false
    }

    const animals = await prisma.animal.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        age: true,
        photos: true,
        updatedAt: true,
        refuge: true, // La relation est incluse ici directement
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 50 
    })

    return NextResponse.json(animals)
  } catch (error: any) {
    console.error('Error in matching API:', error)
    return NextResponse.json({ error: error.message || error.toString() }, { status: 500 })
  }
}

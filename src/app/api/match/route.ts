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

  const speciesMap: Record<string, string> = {
    dog: 'Dog',
    cat: 'Cat',
    rabbit: 'Rabbit',
    other: 'Other',
  }

  function getAgeFilter(ageStr: string): string[] {
    if (!ageStr) return []
    const categories = ageStr.split(',').filter(Boolean)
    return categories.includes('any') ? [] : categories
  }

  try {
    // Remplacement de `any` par le type exact de Prisma
    const whereClause: Prisma.AnimalWhereInput = {}

    if (speciesRaw) {
      const dbSpecies = speciesRaw
        .split(',')
        .map(k => speciesMap[k] || k)
        .filter(Boolean)
      
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
      // Ã€ rÃ©viser selon votre schÃ©ma de base de donnÃ©es (ex: goodWithCats)
      whereClause.goodWithDogs = true
    }

    if (!hasGarden) {
      whereClause.needsGarden = false
    }

    const animals = await prisma.animal.findMany({
      where: whereClause,
      include: {
        refuge: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      // Ã€ remplacer par des variables dynamiques (skip, take) pour la pagination
      take: 50 
    })

    return NextResponse.json(animals)
  } catch (error: any) {
    console.error('Error in matching API:', error)
    return NextResponse.json({ error: error.message || error.toString(), detail: "DEBUG" }, { status: 500 })
  }
}

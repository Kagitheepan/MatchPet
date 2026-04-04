import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const hasChildren = searchParams.get('hasChildren') === 'true'
  const hasOtherPets = searchParams.get('hasOtherPets') === 'true'
  const hasGarden = searchParams.get('hasGarden') === 'true'

  try {
    const whereClause: any = {}

    if (hasChildren) {
      whereClause.goodWithChildren = true
    }

    if (hasOtherPets) {
      whereClause.goodWithDogs = true
      // whereClause.goodWithCats = true // Can adjust criteria later based on desired animal
    }

    if (!hasGarden) {
      whereClause.needsGarden = false
    }

    // 3. Récupérer les animaux (avec leur refuge)
    const animals = await prisma.animal.findMany({
      where: whereClause,
      include: {
        refuge: true
      },
      orderBy: {
        updatedAt: 'desc' // Priorité aux derniers animaux synchronisés
      },
      take: 50 // Limit to first 50 matches currently
    })

    return NextResponse.json(animals)
  } catch (error) {
    console.error('Error in matching API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

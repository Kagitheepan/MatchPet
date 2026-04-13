export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const animals = await prisma.animal.findMany({
      include: {
        refuge: true
      },
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        age: true,
        photos: true,
        refuge: true,
        updatedAt: true,
        // On exclut 'description' pour alléger le tri MySQL
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 50
    })

    return NextResponse.json(animals)
  } catch (error) {
    console.error('Error in search API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

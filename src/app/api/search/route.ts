export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const animals = await prisma.animal.findMany({
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        age: true,
        photos: true,
        updatedAt: true,
        refuge: true, // Relation incluse dans le select
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

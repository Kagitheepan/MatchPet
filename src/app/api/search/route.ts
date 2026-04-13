export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const animals = await prisma.animal.findMany({
      include: {
        refuge: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 100
    })

    return NextResponse.json(animals)
  } catch (error) {
    console.error('Error in search API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

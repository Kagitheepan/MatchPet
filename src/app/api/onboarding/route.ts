import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { 
      email, 
      name, 
      location, 
      hasGarden, 
      hasChildren, 
      hasOtherPets, 
      timeFree,
      latitude,
      longitude 
    } = data

    // Validation basique
    if (!email || !location) {
      return NextResponse.json(
        { error: 'Email and location are required' },
        { status: 400 }
      )
    }

    // Création ou mise à jour du profil utilisateur
    const userProfile = await prisma.userProfile.upsert({
      where: { email },
      update: {
        name,
        location,
        hasGarden,
        hasChildren,
        hasOtherPets,
        timeFree,
        latitude,
        longitude
      },
      create: {
        email,
        name,
        location,
        hasGarden,
        hasChildren,
        hasOtherPets,
        timeFree,
        latitude,
        longitude
      }
    })

    return NextResponse.json(userProfile)
  } catch (error) {
    console.error('Error in onboarding API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

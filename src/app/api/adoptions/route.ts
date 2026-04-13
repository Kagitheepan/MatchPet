export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    const user = await prisma.userProfile.findUnique({
      where: { email },
      include: {
        adoptions: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Map adoptions to the format expected by the frontend
    const mappedAdoptions = user.adoptions.map(adoption => ({
      id: adoption.id,
      name: adoption.animalName,
      image: adoption.animalImage,
      status: adoption.status,
      hasUnread: adoption.hasUnreadUser,
      requestDate: adoption.createdAt.toISOString()
    }));

    return NextResponse.json(mappedAdoptions);
  } catch (error) {
    console.error('Fetch Adoptions Error:', error);
    return NextResponse.json({ error: 'Failed to fetch adoptions' }, { status: 500 });
  }
}

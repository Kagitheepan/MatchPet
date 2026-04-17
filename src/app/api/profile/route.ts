export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { email },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Split name back to first/last for the frontend logic
    const nameParts = profile.name ? profile.name.split(' ') : [''];
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ') || '';

    return NextResponse.json({
      firstName,
      lastName,
      email: profile.email,
      phone: profile.phone || '',
    });
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { currentEmail, firstName, lastName, phone } = body;

    await prisma.userProfile.update({
      where: { email: currentEmail },
      data: {
        name: `${firstName} ${lastName}`.trim(),
        phone
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

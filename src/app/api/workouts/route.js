import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch remote API');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch API' }, { status: 500 });
  }
}
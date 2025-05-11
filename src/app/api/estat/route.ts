import { NextResponse } from 'next/server';
import { fetchEstatData } from '@/utils/estatApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const statsDataId = searchParams.get('statsDataId');

  if (!statsDataId) {
    return NextResponse.json({ error: 'statsDataId is required' }, { status: 400 });
  }

  try {
    const data = await fetchEstatData(statsDataId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from e-stat API' },
      { status: 500 }
    );
  }
} 
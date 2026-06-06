import { NextResponse } from 'next/server';
import * as compareController from '@/controllers/compare.controller';

/**
 * GET /api/compare?slugs=slug1,slug2,slug3
 * Compare 2-3 colleges side by side
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const params = {
    slugs: searchParams.get('slugs') || undefined,
  };

  const result = await compareController.compare(params);

  return NextResponse.json(result, { status: result.status });
}

import { NextResponse } from 'next/server';
import * as collegeController from '@/controllers/college.controller';

/**
 * GET /api/colleges/search?q=query
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  const result = await collegeController.search(q);

  return NextResponse.json(result, { status: result.status });
}

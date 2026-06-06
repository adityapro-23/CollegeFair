import { NextResponse } from 'next/server';
import * as collegeController from '@/controllers/college.controller';

/**
 * GET /api/colleges
 * List colleges with search, filters, and pagination
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const params = {
    q: searchParams.get('q') || undefined,
    state: searchParams.get('state') || undefined,
    city: searchParams.get('city') || undefined,
    type: searchParams.get('type') || undefined,
    feesMin: searchParams.get('feesMin') || undefined,
    feesMax: searchParams.get('feesMax') || undefined,
    ratingMin: searchParams.get('ratingMin') || undefined,
    exam: searchParams.get('exam') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    page: searchParams.get('page') || undefined,
    limit: searchParams.get('limit') || undefined,
  };

  const result = await collegeController.list(params);

  return NextResponse.json(result, { status: result.status });
}

import { NextResponse } from 'next/server';
import * as detailController from '@/controllers/detail.controller';

/**
 * GET /api/colleges/:slug
 * Get full college detail by slug
 */
export async function GET(request, { params }) {
  const { slug } = await params;

  const result = await detailController.getBySlug(slug);

  return NextResponse.json(result, { status: result.status });
}

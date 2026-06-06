import { NextResponse } from 'next/server';
import * as predictorController from '@/controllers/predictor.controller';

/**
 * GET /api/predictor
 * Predict colleges based on exam and rank
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const body = {
    exam: searchParams.get('exam'),
    rank: searchParams.get('rank') ? parseInt(searchParams.get('rank'), 10) : undefined,
    category: searchParams.get('category'),
    quota: searchParams.get('quota') || undefined,
    gender: searchParams.get('gender') || undefined,
    round: searchParams.get('round') || undefined,
  };

  const result = await predictorController.predict(body);

  return NextResponse.json(result, { status: result.status });
}

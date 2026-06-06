import { NextResponse } from 'next/server';
import * as predictorController from '@/controllers/predictor.controller';

/**
 * GET /api/predictor/exams
 * Fetch all available exams for the predictor form dropdown
 */
export async function GET() {
  const result = await predictorController.getExams();
  return NextResponse.json(result, { status: result.status });
}

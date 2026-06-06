import { EXAMS, CATEGORIES, QUOTAS } from '@/lib/constants';

/**
 * Validate predictor request body
 */
export function validatePredictorInput(body) {
  const errors = [];
  const data = {};

  // Exam (required)
  if (!body.exam) {
    errors.push('exam is required');
  } else if (typeof body.exam !== 'string') {
    errors.push('exam must be a string');
  } else {
    data.exam = body.exam.trim();
    // We don't strictly enforce EXAMS list here since DB might have more
  }

  // Rank (required)
  if (body.rank === undefined || body.rank === null) {
    errors.push('rank is required');
  } else {
    const rank = parseInt(body.rank, 10);
    if (isNaN(rank) || rank < 1) {
      errors.push('rank must be a positive integer');
    } else if (rank > 10000000) {
      errors.push('rank seems unrealistically high');
    } else {
      data.rank = rank;
    }
  }

  // Category (optional, default OPEN)
  if (body.category !== undefined) {
    const cat = String(body.category).toUpperCase();
    if (!CATEGORIES.includes(cat)) {
      errors.push(`Invalid category. Must be one of: ${CATEGORIES.join(', ')}`);
    } else {
      data.category = cat;
    }
  } else {
    data.category = 'OPEN';
  }

  // Quota (optional, default AI)
  if (body.quota !== undefined) {
    const q = String(body.quota).toUpperCase();
    if (!QUOTAS.includes(q)) {
      errors.push('Invalid quota. Must be AI, HS, or OS');
    } else {
      data.quota = q;
    }
  } else {
    data.quota = 'AI';
  }

  // Gender (optional, default Gender-Neutral)
  if (body.gender !== undefined) {
    if (body.gender !== 'Gender-Neutral' && body.gender !== 'Female-only') {
      errors.push('Invalid gender. Must be Gender-Neutral or Female-only');
    } else {
      data.gender = body.gender;
    }
  } else {
    data.gender = 'Gender-Neutral';
  }

  // Round (optional, default 6)
  if (body.round !== undefined) {
    const r = parseInt(body.round, 10);
    if (isNaN(r) || r < 1 || r > 10) {
      errors.push('Invalid round.');
    } else {
      data.round = r;
    }
  } else {
    data.round = 6;
  }

  return errors.length > 0
    ? { valid: false, errors }
    : { valid: true, data };
}

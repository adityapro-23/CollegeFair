import { validatePredictorInput } from '@/validators/predictor.validator';
import * as predictorModel from '@/models/predictor.model';

export async function getExams() {
  try {
    const exams = await predictorModel.getAvailableExams();
    return { success: true, status: 200, data: exams };
  } catch (error) {
    return { success: false, status: 500, errors: ['Failed to load exams'] };
  }
}

/**
 * Classify match confidence based on rank vs cutoff
 */
function classifyConfidence(userRank, openingRank, closingRank) {
  if (!closingRank) return 'UNKNOWN';

  const rankRange = closingRank - (openingRank || 1);
  const position = closingRank - userRank;
  const percentile = rankRange > 0 ? (position / rankRange) * 100 : 100;

  if (percentile >= 40) return 'SAFE';       // Well within range
  if (percentile >= 10) return 'MODERATE';   // Near the edge
  return 'REACH';                             // Just barely qualifies
}

/**
 * Predict colleges based on exam and rank
 */
export async function predict(rawBody) {
  const validation = validatePredictorInput(rawBody);

  if (!validation.valid) {
    return {
      success: false,
      status: 400,
      errors: validation.errors,
    };
  }

  const { exam, rank, category, quota, gender, round } = validation.data;

  try {
    // Get the latest cutoff year for this exam
    const latestYear = await predictorModel.getLatestCutoffYear(exam);

    const cutoffs = await predictorModel.findMatchingCutoffs({
      exam, rank, category, quota, gender, round,
      year: latestYear,
    });

    // Group by college (a college might have multiple course cutoffs)
    const collegeMap = new Map();

    for (const cutoff of cutoffs) {
      const key = cutoff.college.slug;
      if (!collegeMap.has(key)) {
        collegeMap.set(key, {
          college: cutoff.college,
          matchingCourses: [],
          bestConfidence: 'REACH',
        });
      }

      const confidence = classifyConfidence(rank, cutoff.openingRank, cutoff.closingRank);
      const entry = collegeMap.get(key);

      entry.matchingCourses.push({
        courseName: cutoff.courseName || 'General',
        openingRank: cutoff.openingRank,
        closingRank: cutoff.closingRank,
        year: cutoff.year,
        confidence,
      });

      // Update best confidence
      const confidenceOrder = { SAFE: 3, MODERATE: 2, REACH: 1, UNKNOWN: 0 };
      if (confidenceOrder[confidence] > confidenceOrder[entry.bestConfidence]) {
        entry.bestConfidence = confidence;
      }
    }

    // Sort by confidence (SAFE first) then by college rating
    const results = Array.from(collegeMap.values()).sort((a, b) => {
      const confidenceOrder = { SAFE: 3, MODERATE: 2, REACH: 1, UNKNOWN: 0 };
      const confDiff = confidenceOrder[b.bestConfidence] - confidenceOrder[a.bestConfidence];
      if (confDiff !== 0) return confDiff;
      return (b.college.rating || 0) - (a.college.rating || 0);
    });

    return {
      success: true,
      status: 200,
      data: {
        exam,
        rank,
        category,
        quota,
        gender,
        round,
        cutoffYear: latestYear,
        totalMatches: results.length,
        results,
      },
    };
  } catch (error) {
    console.error('Predictor error:', error);
    return {
      success: false,
      status: 500,
      errors: ['Internal server error'],
    };
  }
}

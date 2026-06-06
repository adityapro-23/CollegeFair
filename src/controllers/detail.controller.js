import * as collegeModel from '@/models/college.model';
import * as reviewModel from '@/models/review.model';

/**
 * Get full college detail by slug
 */
export async function getBySlug(slug) {
  if (!slug || typeof slug !== 'string') {
    return {
      success: false,
      status: 400,
      errors: ['Invalid slug'],
    };
  }

  try {
    const college = await collegeModel.findBySlug(slug.trim());

    if (!college) {
      return {
        success: false,
        status: 404,
        errors: ['College not found'],
      };
    }

    // Get rating distribution
    const ratingDistribution = await reviewModel.getRatingDistribution(college.id);

    // Compute latest placement summary
    const latestPlacement = college.placements.length > 0 ? college.placements[0] : null;

    return {
      success: true,
      status: 200,
      data: {
        ...college,
        ratingDistribution,
        latestPlacement,
      },
    };
  } catch (error) {
    console.error('College detail error:', error);
    return {
      success: false,
      status: 500,
      errors: ['Internal server error'],
    };
  }
}

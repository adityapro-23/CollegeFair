import { validateCompareParams } from '@/validators/compare.validator';
import * as collegeModel from '@/models/college.model';

/**
 * Compare 2-3 colleges side by side
 */
export async function compare(rawParams) {
  const validation = validateCompareParams(rawParams);

  if (!validation.valid) {
    return {
      success: false,
      status: 400,
      errors: validation.errors,
    };
  }

  try {
    const colleges = await collegeModel.findBySlugs(validation.data.slugs);

    if (colleges.length < 2) {
      return {
        success: false,
        status: 404,
        errors: ['One or more colleges not found. Please check the slugs.'],
      };
    }

    // Normalize comparison data
    const comparisonData = colleges.map((college) => {
      const latestPlacement = college.placements.length > 0 ? college.placements[0] : null;
      const coursesSummary = college.courses.reduce((acc, course) => {
        if (!acc[course.degree]) acc[course.degree] = [];
        acc[course.degree].push(course.name);
        return acc;
      }, {});

      return {
        id: college.id,
        name: college.name,
        slug: college.slug,
        type: college.type,
        city: college.city,
        state: college.state,
        established: college.established,
        rating: college.rating,
        totalReviews: college.totalReviews,
        feesMin: college.feesMin,
        feesMax: college.feesMax,
        nirfRank: college.nirfRank,
        approvedBy: college.approvedBy,
        examsAccepted: college.examsAccepted,
        logoUrl: college.logoUrl,
        placement: latestPlacement
          ? {
              year: latestPlacement.year,
              averagePackage: latestPlacement.averagePackage,
              highestPackage: latestPlacement.highestPackage,
              medianPackage: latestPlacement.medianPackage,
              placementRate: latestPlacement.placementRate,
              topRecruiters: latestPlacement.topRecruiters,
            }
          : null,
        coursesSummary,
        totalCourses: college.courses.length,
      };
    });

    return {
      success: true,
      status: 200,
      data: comparisonData,
    };
  } catch (error) {
    console.error('Compare error:', error);
    return {
      success: false,
      status: 500,
      errors: ['Internal server error'],
    };
  }
}

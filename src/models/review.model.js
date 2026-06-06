import prisma from '@/lib/prisma';

/**
 * Find reviews for a college with pagination
 */
export async function findByCollegeId(collegeId, { skip = 0, take = 10 } = {}) {
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { collegeId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.review.count({ where: { collegeId } }),
  ]);

  return { reviews, total };
}

/**
 * Get rating distribution for a college
 */
export async function getRatingDistribution(collegeId) {
  const reviews = await prisma.review.findMany({
    where: { collegeId },
    select: {
      rating: true,
      academicsRating: true,
      infrastructureRating: true,
      placementsRating: true,
      campusLifeRating: true,
    },
  });

  if (reviews.length === 0) return null;

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const categoryAverages = {
    academics: 0,
    infrastructure: 0,
    placements: 0,
    campusLife: 0,
  };
  const categoryCounts = { academics: 0, infrastructure: 0, placements: 0, campusLife: 0 };

  for (const review of reviews) {
    const bucket = Math.min(5, Math.max(1, Math.round(review.rating)));
    distribution[bucket]++;

    if (review.academicsRating) { categoryAverages.academics += review.academicsRating; categoryCounts.academics++; }
    if (review.infrastructureRating) { categoryAverages.infrastructure += review.infrastructureRating; categoryCounts.infrastructure++; }
    if (review.placementsRating) { categoryAverages.placements += review.placementsRating; categoryCounts.placements++; }
    if (review.campusLifeRating) { categoryAverages.campusLife += review.campusLifeRating; categoryCounts.campusLife++; }
  }

  for (const key of Object.keys(categoryAverages)) {
    categoryAverages[key] = categoryCounts[key] > 0
      ? Math.round((categoryAverages[key] / categoryCounts[key]) * 10) / 10
      : null;
  }

  return { distribution, categoryAverages, total: reviews.length };
}

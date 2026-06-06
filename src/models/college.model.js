import prisma from '@/lib/prisma';

/**
 * Find many colleges with filters and pagination
 */
export async function findMany({ where = {}, orderBy = { rating: 'desc' }, skip = 0, take = 12 }) {
  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        name: true,
        slug: true,
        type: true,
        city: true,
        state: true,
        rating: true,
        totalReviews: true,
        feesMin: true,
        feesMax: true,
        logoUrl: true,
        approvedBy: true,
        nirfRank: true,
        examsAccepted: true,
      },
    }),
    prisma.college.count({ where }),
  ]);

  return { colleges, total };
}

/**
 * Find a single college by slug with all relations
 */
export async function findBySlug(slug) {
  return prisma.college.findUnique({
    where: { slug },
    include: {
      courses: {
        orderBy: { feesTotal: 'asc' },
      },
      placements: {
        orderBy: { year: 'desc' },
        take: 5,
      },
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });
}

/**
 * Find multiple colleges by slugs (for comparison)
 */
export async function findBySlugs(slugs) {
  return prisma.college.findMany({
    where: { slug: { in: slugs } },
    include: {
      courses: true,
      placements: {
        orderBy: { year: 'desc' },
        take: 1,
      },
    },
  });
}

/**
 * Search colleges by name (for autocomplete)
 */
export async function searchByName(query, limit = 10) {
  return prisma.college.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      city: true,
      state: true,
      logoUrl: true,
    },
    take: limit,
  });
}

/**
 * Get distinct states that have colleges (for filter dropdown)
 */
export async function getDistinctStates() {
  const results = await prisma.college.findMany({
    distinct: ['state'],
    select: { state: true },
    orderBy: { state: 'asc' },
  });
  return results.map((r) => r.state);
}

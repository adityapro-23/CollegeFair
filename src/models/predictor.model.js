import prisma from '@/lib/prisma';

/**
 * Find cutoffs matching all filter criteria for the latest available year
 */
export async function findMatchingCutoffs({ exam, category = 'OPEN', quota = 'AI', gender = 'Gender-Neutral', round = 6, rank, year }) {
  return prisma.cutoff.findMany({
    where: {
      exam,
      category,
      quota,
      gender,
      round,
      ...(year ? { year } : {}),
      closingRank: { gte: rank },
    },
    include: {
      college: {
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
          state: true,
          rating: true,
          type: true,
          logoUrl: true,
          feesMin: true,
          feesMax: true,
          nirfRank: true,
        },
      },
    },
    orderBy: { closingRank: 'asc' },
    take: 200,
  });
}

/**
 * Get available exams with cutoff data
 */
export async function getAvailableExams() {
  const results = await prisma.cutoff.findMany({
    distinct: ['exam'],
    select: { exam: true },
    orderBy: { exam: 'asc' },
  });
  return results.map((r) => r.exam);
}

/**
 * Get latest cutoff year for an exam
 */
export async function getLatestCutoffYear(exam) {
  const result = await prisma.cutoff.findFirst({
    where: { exam },
    orderBy: { year: 'desc' },
    select: { year: true },
  });
  return result?.year || null;
}

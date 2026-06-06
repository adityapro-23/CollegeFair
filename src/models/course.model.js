import prisma from '@/lib/prisma';

/**
 * Find courses by college ID
 */
export async function findByCollegeId(collegeId) {
  return prisma.course.findMany({
    where: { collegeId },
    orderBy: { degree: 'asc' },
  });
}

/**
 * Find distinct degrees across all colleges
 */
export async function getDistinctDegrees() {
  const results = await prisma.course.findMany({
    distinct: ['degree'],
    select: { degree: true },
    orderBy: { degree: 'asc' },
  });
  return results.map((r) => r.degree);
}

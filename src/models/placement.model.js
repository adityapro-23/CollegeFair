import prisma from '@/lib/prisma';

/**
 * Find placement data for a college (all years)
 */
export async function findByCollegeId(collegeId) {
  return prisma.placement.findMany({
    where: { collegeId },
    orderBy: { year: 'desc' },
  });
}

/**
 * Find latest placement for a college
 */
export async function findLatestByCollegeId(collegeId) {
  return prisma.placement.findFirst({
    where: { collegeId },
    orderBy: { year: 'desc' },
  });
}

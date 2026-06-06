import { validateListParams } from '@/validators/college.validator';
import * as collegeModel from '@/models/college.model';
import { SORT_OPTIONS } from '@/lib/constants';

/**
 * Build Prisma where clause from validated filters
 */
function buildWhereClause(filters) {
  const where = {};

  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: 'insensitive' } },
      { city: { contains: filters.q, mode: 'insensitive' } },
      { state: { contains: filters.q, mode: 'insensitive' } },
    ];
  }

  if (filters.state) {
    where.state = { equals: filters.state, mode: 'insensitive' };
  }

  if (filters.city) {
    where.city = { contains: filters.city, mode: 'insensitive' };
  }

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.feesMin !== undefined || filters.feesMax !== undefined) {
    where.feesMax = {};
    where.feesMin = {};
    if (filters.feesMin !== undefined) {
      where.feesMax.gte = filters.feesMin; // college's max fee should be >= user's min
    }
    if (filters.feesMax !== undefined) {
      where.feesMin.lte = filters.feesMax; // college's min fee should be <= user's max
    }
  }

  if (filters.ratingMin !== undefined) {
    where.rating = { gte: filters.ratingMin };
  }

  if (filters.exam) {
    where.examsAccepted = { has: filters.exam };
  }

  return where;
}

/**
 * Build Prisma orderBy from sort option
 */
function buildOrderBy(sortBy) {
  switch (sortBy) {
    case SORT_OPTIONS.RATING_ASC:
      return { rating: 'asc' };
    case SORT_OPTIONS.FEES_ASC:
      return { feesMin: 'asc' };
    case SORT_OPTIONS.FEES_DESC:
      return { feesMax: 'desc' };
    case SORT_OPTIONS.NIRF_RANK:
      return { nirfRank: 'asc' };
    case SORT_OPTIONS.NAME_ASC:
      return { name: 'asc' };
    case SORT_OPTIONS.RATING_DESC:
    default:
      return { rating: 'desc' };
  }
}

/**
 * List colleges with search, filters, and pagination
 */
export async function list(rawParams) {
  const validation = validateListParams(rawParams);

  if (!validation.valid) {
    return {
      success: false,
      status: 400,
      errors: validation.errors,
    };
  }

  const { page, limit, sortBy, ...filters } = validation.data;
  const skip = (page - 1) * limit;
  const where = buildWhereClause(filters);
  const orderBy = buildOrderBy(sortBy);

  try {
    const { colleges, total } = await collegeModel.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    return {
      success: true,
      status: 200,
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + colleges.length < total,
      },
    };
  } catch (error) {
    console.error('College list error:', error);
    return {
      success: false,
      status: 500,
      errors: ['Internal server error'],
    };
  }
}

/**
 * Search colleges by name (for autocomplete)
 */
export async function search(query) {
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return {
      success: true,
      status: 200,
      data: [],
    };
  }

  try {
    const results = await collegeModel.searchByName(query.trim());
    return {
      success: true,
      status: 200,
      data: results,
    };
  } catch (error) {
    console.error('College search error:', error);
    return {
      success: false,
      status: 500,
      errors: ['Internal server error'],
    };
  }
}

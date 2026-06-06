import { PAGINATION, COLLEGE_TYPES, SORT_OPTIONS, INDIAN_STATES } from '@/lib/constants';

/**
 * Validate and sanitize college listing query params
 */
export function validateListParams(params) {
  const errors = [];
  const data = {};

  // Search query
  if (params.q !== undefined) {
    if (typeof params.q !== 'string') {
      errors.push('Search query must be a string');
    } else {
      data.q = params.q.trim();
    }
  }

  // State filter
  if (params.state !== undefined) {
    if (typeof params.state !== 'string') {
      errors.push('State must be a string');
    } else {
      data.state = params.state.trim();
    }
  }

  // City filter
  if (params.city !== undefined) {
    if (typeof params.city !== 'string') {
      errors.push('City must be a string');
    } else {
      data.city = params.city.trim();
    }
  }

  // Type filter
  if (params.type !== undefined) {
    const upperType = String(params.type).toUpperCase();
    if (!COLLEGE_TYPES.includes(upperType)) {
      errors.push(`Invalid college type. Must be one of: ${COLLEGE_TYPES.join(', ')}`);
    } else {
      data.type = upperType;
    }
  }

  // Fees range
  if (params.feesMin !== undefined) {
    const val = parseInt(params.feesMin, 10);
    if (isNaN(val) || val < 0) {
      errors.push('feesMin must be a non-negative integer');
    } else {
      data.feesMin = val;
    }
  }
  if (params.feesMax !== undefined) {
    const val = parseInt(params.feesMax, 10);
    if (isNaN(val) || val < 0) {
      errors.push('feesMax must be a non-negative integer');
    } else {
      data.feesMax = val;
    }
  }
  if (data.feesMin !== undefined && data.feesMax !== undefined && data.feesMin > data.feesMax) {
    errors.push('feesMin cannot be greater than feesMax');
  }

  // Rating minimum
  if (params.ratingMin !== undefined) {
    const val = parseFloat(params.ratingMin);
    if (isNaN(val) || val < 0 || val > 5) {
      errors.push('ratingMin must be a number between 0 and 5');
    } else {
      data.ratingMin = val;
    }
  }

  // Exam filter
  if (params.exam !== undefined) {
    if (typeof params.exam !== 'string') {
      errors.push('Exam must be a string');
    } else {
      data.exam = params.exam.trim();
    }
  }

  // Sort
  if (params.sortBy !== undefined) {
    const validSorts = Object.values(SORT_OPTIONS);
    if (!validSorts.includes(params.sortBy)) {
      errors.push(`Invalid sortBy. Must be one of: ${validSorts.join(', ')}`);
    } else {
      data.sortBy = params.sortBy;
    }
  }

  // Pagination
  const page = parseInt(params.page, 10);
  data.page = (!isNaN(page) && page >= 1) ? page : PAGINATION.DEFAULT_PAGE;

  const limit = parseInt(params.limit, 10);
  data.limit = (!isNaN(limit) && limit >= 1 && limit <= PAGINATION.MAX_LIMIT)
    ? limit
    : PAGINATION.DEFAULT_LIMIT;

  return errors.length > 0
    ? { valid: false, errors }
    : { valid: true, data };
}

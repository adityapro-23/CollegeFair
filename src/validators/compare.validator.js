import { MAX_COMPARE_COLLEGES, MIN_COMPARE_COLLEGES } from '@/lib/constants';

/**
 * Validate compare request params
 */
export function validateCompareParams(params) {
  const errors = [];

  if (!params.slugs) {
    errors.push('slugs parameter is required');
    return { valid: false, errors };
  }

  let slugs;
  if (typeof params.slugs === 'string') {
    slugs = params.slugs.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (Array.isArray(params.slugs)) {
    slugs = params.slugs.map((s) => String(s).trim()).filter(Boolean);
  } else {
    errors.push('slugs must be a comma-separated string or array');
    return { valid: false, errors };
  }

  // Remove duplicates
  slugs = [...new Set(slugs)];

  if (slugs.length < MIN_COMPARE_COLLEGES) {
    errors.push(`At least ${MIN_COMPARE_COLLEGES} colleges are required for comparison`);
  }
  if (slugs.length > MAX_COMPARE_COLLEGES) {
    errors.push(`Maximum ${MAX_COMPARE_COLLEGES} colleges can be compared at once`);
  }

  // Validate slug format
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  for (const slug of slugs) {
    if (!slugRegex.test(slug)) {
      errors.push(`Invalid slug format: "${slug}"`);
    }
  }

  return errors.length > 0
    ? { valid: false, errors }
    : { valid: true, data: { slugs } };
}

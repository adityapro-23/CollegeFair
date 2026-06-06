import Link from 'next/link';

const CONFIDENCE_CONFIG = {
  SAFE: {
    label: 'Safe',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-500',
    icon: '✓',
    description: 'Very likely to get admission',
  },
  MODERATE: {
    label: 'Moderate',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    icon: '~',
    description: 'Good chance of admission',
  },
  REACH: {
    label: 'Reach',
    color: 'bg-red-100 text-red-800 border-red-200',
    dot: 'bg-red-500',
    icon: '!',
    description: 'Borderline — may require luck',
  },
  UNKNOWN: {
    label: 'Unknown',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    dot: 'bg-gray-400',
    icon: '?',
    description: 'Insufficient data',
  },
};

function ConfidenceBadge({ level, size = 'sm' }) {
  const config = CONFIDENCE_CONFIG[level] || CONFIDENCE_CONFIG.UNKNOWN;
  const sizeClasses = size === 'lg'
    ? 'px-3 py-1.5 text-sm'
    : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold border ${config.color} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {config.label}
    </span>
  );
}

function CollegeCard({ college, matchingCourses, bestConfidence, rank }) {
  const conf = CONFIDENCE_CONFIG[bestConfidence] || CONFIDENCE_CONFIG.UNKNOWN;

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* College Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            {college.logoUrl ? (
              <img src={college.logoUrl} alt="" className="w-8 h-8 object-contain" />
            ) : (
              <span className="font-bold text-lg text-gray-400">{college.name.charAt(0)}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] leading-tight">
                  <Link href={`/colleges/${college.slug}`} className="hover:text-blue-600 transition-colors">
                    {college.name}
                  </Link>
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                  {college.city}, {college.state}
                </p>
              </div>
              <ConfidenceBadge level={bestConfidence} size="lg" />
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {college.nirfRank && (
                <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                  NIRF #{college.nirfRank}
                </span>
              )}
              <span className="text-xs font-medium bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md">
                {college.type}
              </span>
              {college.rating > 0 && (
                <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {college.rating}
                </span>
              )}
              {(college.feesMin > 0 || college.feesMax > 0) && (
                <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-md">
                  ₹{(college.feesMin / 100000).toFixed(1)}L – ₹{(college.feesMax / 100000).toFixed(1)}L
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="border-t border-gray-100">
        <div className="px-5 py-2.5 bg-gray-50/50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Matching Courses ({matchingCourses.length})
          </p>
        </div>
        <div className="divide-y divide-gray-50">
          {matchingCourses.map((course, idx) => (
            <div key={idx} className="px-5 py-3 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                  {course.courseName}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-[var(--color-text-muted)]">
                    Opening: <strong className="text-gray-700">{course.openingRank?.toLocaleString() ?? '—'}</strong>
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    Closing: <strong className="text-gray-700">{course.closingRank?.toLocaleString() ?? '—'}</strong>
                  </span>
                  {course.year && (
                    <span className="text-xs text-gray-400">({course.year})</span>
                  )}
                </div>
              </div>
              <ConfidenceBadge level={course.confidence} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PredictorResults({ results, query }) {
  if (!results || results.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-12 text-center shadow-sm">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No Colleges Found</h3>
        <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
          No colleges match <strong>{query.exam}</strong> at Rank <strong>{query.rank?.toLocaleString()}</strong> ({query.category}).
          Try a higher rank or different filters.
        </p>
      </div>
    );
  }

  // Count totals
  const totalCourses = results.reduce((sum, r) => sum + r.matchingCourses.length, 0);
  const safeCount = results.filter(r => r.bestConfidence === 'SAFE').length;
  const moderateCount = results.filter(r => r.bestConfidence === 'MODERATE').length;
  const reachCount = results.filter(r => r.bestConfidence === 'REACH').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Summary Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl overflow-hidden">
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-1">Prediction Results</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-bold text-lg text-purple-900">{query.exam}</span>
                <span className="text-purple-300">•</span>
                <span className="font-bold text-lg text-purple-900">Rank {query.rank?.toLocaleString()}</span>
                <span className="text-purple-300">•</span>
                <span className="font-bold text-lg text-purple-900">{query.category}</span>
                {query.quota && (
                  <>
                    <span className="text-purple-300">•</span>
                    <span className="font-medium text-purple-800">
                      {query.quota === 'AI' ? 'All India' : query.quota === 'HS' ? 'Home State' : 'Other State'}
                    </span>
                  </>
                )}
                {query.gender && query.gender !== 'Gender-Neutral' && (
                  <>
                    <span className="text-purple-300">•</span>
                    <span className="font-medium text-purple-800">{query.gender}</span>
                  </>
                )}
              </div>
              {query.cutoffYear && (
                <p className="text-xs text-purple-600 mt-1">Based on {query.cutoffYear} cutoff data</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="bg-white/70 border border-purple-200 px-3 py-1.5 rounded-lg text-sm font-medium text-purple-800">
              {results.length} Colleges • {totalCourses} Courses
            </div>
            {safeCount > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-700">
                {safeCount} Safe
              </div>
            )}
            {moderateCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-sm font-medium text-amber-700">
                {moderateCount} Moderate
              </div>
            )}
            {reachCount > 0 && (
              <div className="bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg text-sm font-medium text-red-700">
                {reachCount} Reach
              </div>
            )}
          </div>
        </div>
      </div>

      {/* College Cards */}
      <div className="grid gap-5">
        {results.map((result) => (
          <CollegeCard
            key={result.college.slug}
            college={result.college}
            matchingCourses={result.matchingCourses}
            bestConfidence={result.bestConfidence}
            rank={query.rank}
          />
        ))}
      </div>

      <p className="text-xs text-center text-[var(--color-text-muted)] mt-4">
        * Predictions are based on previous years&apos; cutoff data and do not guarantee admission.
      </p>
    </div>
  );
}

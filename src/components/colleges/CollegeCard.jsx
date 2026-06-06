import Link from 'next/link';
import StarRating from '../ui/StarRating';

export default function CollegeCard({ college }) {
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="group bg-white rounded-xl border border-[var(--color-border)] p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-4">
        {/* Logo/Avatar */}
        <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 overflow-hidden">
          {college.logoUrl ? (
            <img src={college.logoUrl} alt={college.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-blue-600">{college.name.substring(0, 2).toUpperCase()}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <Link href={`/colleges/${college.slug}`} className="group-hover:text-[var(--color-primary)] transition-colors">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] leading-tight line-clamp-2">
                {college.name}
              </h3>
            </Link>
          </div>
          
          <div className="flex items-center gap-1.5 mt-1.5 text-sm text-[var(--color-text-muted)]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {college.city}, {college.state}
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
              {college.type}
            </span>
            {college.nirfRank && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
                NIRF #{college.nirfRank}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Total Fees</p>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            {formatCurrency(college.feesMin)} - {formatCurrency(college.feesMax)}
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">{college.totalReviews} Reviews</p>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-[var(--color-text-primary)]">{college.rating.toFixed(1)}</span>
            <StarRating rating={college.rating} />
          </div>
        </div>
      </div>
    </div>
  );
}

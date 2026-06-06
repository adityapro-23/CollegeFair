import StarRating from '../ui/StarRating';

export default function ReviewsTab({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-12 text-center">
        <p className="text-[var(--color-text-muted)]">No reviews available yet.</p>
      </div>
    );
  }

  // Calculate some basic aggregate stats from the sample reviews
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Review Summary */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="text-center md:text-left shrink-0">
          <p className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Overall Rating</p>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-5xl font-extrabold text-[var(--color-text-primary)]">{avgRating.toFixed(1)}</span>
            <div className="flex flex-col items-start gap-1">
              <StarRating rating={avgRating} />
              <span className="text-xs text-[var(--color-text-muted)]">Based on {reviews.length} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        <h3 className="font-bold text-[var(--color-text-primary)] mb-4">Student Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                  {review.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[var(--color-text-primary)]">{review.authorName}</p>
                    {review.isVerified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 px-2 py-1 rounded-md flex items-center gap-1">
                <span className="font-bold text-amber-700">{review.rating.toFixed(1)}</span>
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            {review.title && <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">{review.title}</h4>}
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
              {review.body}
            </p>

            {/* Category Ratings */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-x-6 gap-y-2">
              {review.academicsRating && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[var(--color-text-muted)] w-20">Academics</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{review.academicsRating}</span>
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                </div>
              )}
              {review.placementsRating && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[var(--color-text-muted)] w-20">Placements</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{review.placementsRating}</span>
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

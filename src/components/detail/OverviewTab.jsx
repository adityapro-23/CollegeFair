import StarRating from '../ui/StarRating';

export default function OverviewTab({ college }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* About Section */}
      <section className="bg-white rounded-xl border border-[var(--color-border)] p-6 md:p-8">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">About {college.name}</h2>
        <div className="prose prose-blue max-w-none">
          <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
            {college.description || 'Description not available.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-[var(--color-border)]">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Key Details</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-32 text-sm font-medium text-[var(--color-text-secondary)]">Established:</span>
                <span className="text-sm text-[var(--color-text-primary)]">{college.established || 'N/A'}</span>
              </li>
              <li className="flex items-start">
                <span className="w-32 text-sm font-medium text-[var(--color-text-secondary)]">Institution Type:</span>
                <span className="text-sm text-[var(--color-text-primary)]">{college.type}</span>
              </li>
              <li className="flex items-start">
                <span className="w-32 text-sm font-medium text-[var(--color-text-secondary)]">Location:</span>
                <span className="text-sm text-[var(--color-text-primary)]">{college.city}, {college.state}</span>
              </li>
              {college.website && (
                <li className="flex items-start">
                  <span className="w-32 text-sm font-medium text-[var(--color-text-secondary)]">Website:</span>
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] hover:underline">
                    {new URL(college.website).hostname.replace('www.', '')}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Approvals & Ranking</h3>
            <div className="space-y-4">
              {college.nirfRank && (
                <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 px-4 py-3 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                  <div>
                    <div className="text-xs font-medium uppercase opacity-80">NIRF Ranking</div>
                    <div className="font-bold text-lg">#{college.nirfRank}</div>
                  </div>
                </div>
              )}
              
              {college.approvedBy?.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Approved By:</div>
                  <div className="flex flex-wrap gap-2">
                    {college.approvedBy.map(approval => (
                      <span key={approval} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-semibold">
                        {approval}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Fee Range</h3>
          <p className="text-lg font-bold text-[var(--color-text-primary)]">
            ₹{(college.feesMin/100000).toFixed(1)}L - ₹{(college.feesMax/100000).toFixed(1)}L
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Student Rating</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-[var(--color-text-primary)]">{college.rating.toFixed(1)}/5</p>
            <p className="text-xs text-[var(--color-text-muted)]">({college.totalReviews} reviews)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Exams Accepted</h3>
          <p className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-2">
            {college.examsAccepted?.length > 0 ? college.examsAccepted.join(', ') : 'Not specified'}
          </p>
        </div>
      </div>
    </div>
  );
}

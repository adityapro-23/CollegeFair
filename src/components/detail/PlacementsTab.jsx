export default function PlacementsTab({ placements }) {
  if (!placements || placements.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-12 text-center">
        <p className="text-[var(--color-text-muted)]">No placement records available.</p>
      </div>
    );
  }

  // Get the most recent placement data
  const latest = placements[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Placement Statistics</h2>
      
      {/* Highlight cards for latest year */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
            Batch {latest.year}
          </span>
          <span className="text-sm font-medium text-blue-800">Latest Report</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100/50">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Highest Package</p>
            <p className="text-2xl font-extrabold text-[var(--color-text-primary)]">
              {latest.highestPackage ? `₹${latest.highestPackage}L` : 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100/50">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Average Package</p>
            <p className="text-2xl font-extrabold text-[var(--color-text-primary)]">
              {latest.averagePackage ? `₹${latest.averagePackage}L` : 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100/50">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Median Package</p>
            <p className="text-2xl font-extrabold text-[var(--color-text-primary)]">
              {latest.medianPackage ? `₹${latest.medianPackage}L` : 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100/50">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Placement Rate</p>
            <p className="text-2xl font-extrabold text-[var(--color-text-primary)]">
              {latest.placementRate ? `${latest.placementRate}%` : 'N/A'}
            </p>
          </div>
        </div>

        {latest.topRecruiters?.length > 0 && (
          <div className="mt-8 pt-6 border-t border-blue-100">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">Top Recruiters</h4>
            <div className="flex flex-wrap gap-2">
              {latest.topRecruiters.map(recruiter => (
                <span key={recruiter} className="px-3 py-1.5 bg-white border border-blue-200 text-blue-800 rounded-md text-sm font-medium shadow-sm">
                  {recruiter}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Historical Data Table */}
      {placements.length > 1 && (
        <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--color-border)]">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Past Years Trends</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Highest</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Average</th>
                  <th className="px-6 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {placements.slice(1).map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[var(--color-text-primary)]">{p.year}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{p.highestPackage ? `₹${p.highestPackage}L` : '-'}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{p.averagePackage ? `₹${p.averagePackage}L` : '-'}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{p.placementRate ? `${p.placementRate}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

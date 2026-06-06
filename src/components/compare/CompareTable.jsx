import Link from 'next/link';

export default function CompareTable({ colleges }) {
  if (!colleges || colleges.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-[var(--color-border)]">
              <th className="w-48 p-4 font-semibold text-[var(--color-text-secondary)] border-r border-[var(--color-border)]">
                Feature
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="p-4 w-64 align-top border-r border-[var(--color-border)] last:border-r-0">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      {college.logoUrl ? (
                        <img src={college.logoUrl} alt={college.name} className="h-12 w-auto mb-3 object-contain" />
                      ) : (
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold mb-3">
                          {college.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <h3 className="font-bold text-[var(--color-text-primary)] text-lg leading-tight mb-1">
                        {college.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] mb-4">
                        {college.city}, {college.state}
                      </p>
                    </div>
                    <Link 
                      href={`/colleges/${college.slug}`}
                      className="mt-auto block w-full text-center py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[var(--color-border)]">
            {/* Institute Type */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[var(--color-text-secondary)] bg-gray-50/50 border-r border-[var(--color-border)]">
                Institution Type
              </td>
              {colleges.map(c => (
                <td key={c.id} className="p-4 text-sm text-[var(--color-text-primary)] border-r border-[var(--color-border)] last:border-r-0">
                  <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs font-semibold">{c.type}</span>
                </td>
              ))}
            </tr>

            {/* Ranking */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[var(--color-text-secondary)] bg-gray-50/50 border-r border-[var(--color-border)]">
                NIRF Ranking
              </td>
              {colleges.map(c => (
                <td key={c.id} className="p-4 text-sm text-[var(--color-text-primary)] border-r border-[var(--color-border)] last:border-r-0">
                  {c.nirfRank ? (
                    <span className="text-emerald-600 font-bold">#{c.nirfRank}</span>
                  ) : '-'}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[var(--color-text-secondary)] bg-gray-50/50 border-r border-[var(--color-border)]">
                Student Rating
              </td>
              {colleges.map(c => (
                <td key={c.id} className="p-4 text-sm text-[var(--color-text-primary)] border-r border-[var(--color-border)] last:border-r-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-600 text-lg">{c.rating.toFixed(1)}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">/ 5</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Fees */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[var(--color-text-secondary)] bg-gray-50/50 border-r border-[var(--color-border)]">
                Total Fees Range
              </td>
              {colleges.map(c => (
                <td key={c.id} className="p-4 text-sm text-[var(--color-text-primary)] border-r border-[var(--color-border)] last:border-r-0">
                  <span className="font-medium">
                    ₹{(c.feesMin/100000).toFixed(1)}L - ₹{(c.feesMax/100000).toFixed(1)}L
                  </span>
                </td>
              ))}
            </tr>

            {/* Placements - Highest */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[var(--color-text-secondary)] bg-gray-50/50 border-r border-[var(--color-border)]">
                Highest Package
              </td>
              {colleges.map(c => {
                const latestPlacement = c.placements?.[0];
                return (
                  <td key={c.id} className="p-4 text-sm text-[var(--color-text-primary)] border-r border-[var(--color-border)] last:border-r-0">
                    {latestPlacement?.highestPackage ? (
                      <span className="font-bold text-blue-600 text-lg">₹{latestPlacement.highestPackage}L</span>
                    ) : '-'}
                  </td>
                );
              })}
            </tr>

            {/* Placements - Average */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[var(--color-text-secondary)] bg-gray-50/50 border-r border-[var(--color-border)]">
                Average Package
              </td>
              {colleges.map(c => {
                const latestPlacement = c.placements?.[0];
                return (
                  <td key={c.id} className="p-4 text-sm text-[var(--color-text-primary)] border-r border-[var(--color-border)] last:border-r-0">
                    {latestPlacement?.averagePackage ? (
                      <span className="font-bold text-gray-900">₹{latestPlacement.averagePackage}L</span>
                    ) : '-'}
                  </td>
                );
              })}
            </tr>

            {/* Exams */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[var(--color-text-secondary)] bg-gray-50/50 border-r border-[var(--color-border)]">
                Exams Accepted
              </td>
              {colleges.map(c => (
                <td key={c.id} className="p-4 text-sm text-[var(--color-text-primary)] border-r border-[var(--color-border)] last:border-r-0">
                  <div className="flex flex-wrap gap-1">
                    {c.examsAccepted?.map(exam => (
                      <span key={exam} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{exam}</span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

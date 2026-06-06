'use client';

import { useState, useEffect } from 'react';
import CollegeSelector from '@/components/compare/CollegeSelector';
import CompareTable from '@/components/compare/CompareTable';
import { MAX_COMPARE_COLLEGES, MIN_COMPARE_COLLEGES } from '@/lib/constants';

export default function ComparePage() {
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch full data for selected colleges when the list changes
  useEffect(() => {
    const fetchCompareData = async () => {
      if (selectedColleges.length === 0) {
        setCompareData([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const slugs = selectedColleges.map(c => c.slug).join(',');
        const res = await fetch(`/api/compare?slugs=${slugs}`);
        const data = await res.json();
        
        if (data.success) {
          // Keep the order of selection
          const fetchedColleges = data.data;
          const orderedData = selectedColleges.map(selected => 
            fetchedColleges.find(c => c.slug === selected.slug)
          ).filter(Boolean);
          
          setCompareData(orderedData);
        } else {
          setError(data.errors?.[0] || 'Failed to fetch comparison data');
        }
      } catch (e) {
        setError('Failed to connect to database. Please check your Render connection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompareData();
  }, [selectedColleges]);

  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      {/* Header section */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Compare Colleges
            </h1>
            <p className="mt-2 text-[var(--color-text-muted)] mb-8">
              Select up to {MAX_COMPARE_COLLEGES} colleges to compare their fees, placements, ratings, and features side-by-side.
            </p>
            
            <CollegeSelector 
              selectedColleges={selectedColleges} 
              setSelectedColleges={setSelectedColleges} 
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedColleges.length === 0 ? (
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No Colleges Selected</h2>
            <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
              Use the search bar above to select colleges. Add at least {MIN_COMPARE_COLLEGES} colleges to start comparing.
            </p>
          </div>
        ) : selectedColleges.length < MIN_COMPARE_COLLEGES ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-amber-800">
            Select at least one more college to see the comparison table.
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-800">
            {error}
          </div>
        ) : isLoading && compareData.length === 0 ? (
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-16 text-center shadow-sm animate-pulse">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--color-text-muted)]">Loading comparison data...</p>
          </div>
        ) : (
          <CompareTable colleges={compareData} />
        )}
      </div>
    </div>
  );
}

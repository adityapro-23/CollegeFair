'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CollegeCard from './CollegeCard';
import { CollegeCardSkeleton } from '../ui/Skeleton';

export default function CollegeList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/colleges?${params.toString()}`);
  };

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = searchParams.toString();
        const res = await fetch(`/api/colleges?${query}`);
        const data = await res.json();
        
        if (data.success) {
          setColleges(data.data);
          setPagination(data.pagination);
        } else {
          setError(data.errors?.[0] || 'Failed to fetch colleges');
        }
      } catch (err) {
        setError('Database connection failed. Please ensure the database is running and migrated.');
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => <CollegeCardSkeleton key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center">
        <svg className="w-10 h-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-bold mb-1">Unable to load colleges</h3>
        <p className="text-sm opacity-90">{error}</p>
        <p className="text-xs mt-4 opacity-75">Tip: Check if your Render DATABASE_URL is configured correctly.</p>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="bg-white border border-[var(--color-border)] p-12 rounded-xl text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">No colleges found</h3>
        <p className="text-sm text-[var(--color-text-muted)]">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-end">
        <p className="text-sm text-[var(--color-text-muted)]">
          Showing <span className="font-semibold text-[var(--color-text-primary)]">{colleges.length}</span> of <span className="font-semibold text-[var(--color-text-primary)]">{pagination?.total || 0}</span> colleges
        </p>
      </div>
      <div className="space-y-4">
        {colleges.map(college => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            Page <span className="font-medium text-[var(--color-text-primary)]">{pagination.page}</span> of <span className="font-medium text-[var(--color-text-primary)]">{pagination.totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

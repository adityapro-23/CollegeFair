import { Suspense } from 'react';
import SearchBar from '@/components/colleges/SearchBar';
import FilterPanel from '@/components/colleges/FilterPanel';
import CollegeList from '@/components/colleges/CollegeList';
import { CollegeCardSkeleton } from '@/components/ui/Skeleton';

export const metadata = {
  title: "Explore Colleges",
  description: "Search and discover top engineering colleges across India. Filter by location, fees, rating, and entrance exam.",
};

export default function CollegesPage() {
  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen">
      {/* Header section */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Explore Colleges
          </h1>
          <p className="mt-2 text-[var(--color-text-muted)] max-w-2xl">
            Find the best college for your career. Use our comprehensive search and filters to narrow down your options.
          </p>
          
          <div className="mt-8">
            <Suspense fallback={<div className="h-12 w-full max-w-2xl bg-gray-100 rounded-xl animate-pulse"></div>}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-72 shrink-0">
            <Suspense fallback={<div className="h-96 bg-white rounded-xl border border-gray-200 animate-pulse"></div>}>
              <FilterPanel />
            </Suspense>
          </div>

          {/* Listing */}
          <div className="flex-1">
            <Suspense fallback={
              <div className="space-y-4">
                {[1, 2, 3].map(i => <CollegeCardSkeleton key={i} />)}
              </div>
            }>
              <CollegeList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

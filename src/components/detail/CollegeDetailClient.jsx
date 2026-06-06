'use client';

import { useState } from 'react';
import Link from 'next/link';
import TabBar from '@/components/detail/TabBar';
import OverviewTab from '@/components/detail/OverviewTab';
import CoursesTab from '@/components/detail/CoursesTab';
import PlacementsTab from '@/components/detail/PlacementsTab';
import ReviewsTab from '@/components/detail/ReviewsTab';
import StarRating from '@/components/ui/StarRating';

export default function CollegeDetailClient({ college }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-[var(--color-border)] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-[var(--color-text-muted)] mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                  <Link href="/colleges" className="hover:text-blue-600 transition-colors">Colleges</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                  <span className="text-[var(--color-text-primary)] font-medium max-w-[200px] truncate">{college.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
              {college.logoUrl ? (
                <img src={college.logoUrl} alt={college.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-blue-600">{college.name.substring(0, 2).toUpperCase()}</span>
              )}
            </div>

            {/* Title & Core Meta */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide">
                  {college.type}
                </span>
                {college.nirfRank && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide">
                    NIRF #{college.nirfRank}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight leading-tight mb-2">
                {college.name}
              </h1>
              
              <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)] mb-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {college.city}, {college.state}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-50 px-2 py-1 rounded-md">
                    <span className="font-bold text-amber-700 text-lg">{college.rating.toFixed(1)}</span>
                  </div>
                  <div>
                    <StarRating rating={college.rating} />
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{college.totalReviews} student reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab college={college} />}
        {activeTab === 'courses' && <CoursesTab courses={college.courses} />}
        {activeTab === 'placements' && <PlacementsTab placements={college.placements} />}
        {activeTab === 'reviews' && <ReviewsTab reviews={college.reviews} />}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { MAX_COMPARE_COLLEGES } from '@/lib/constants';

export default function CollegeSelector({ selectedColleges, setSelectedColleges }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/colleges/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) {
          // Filter out already selected colleges
          const selectedSlugs = new Set(selectedColleges.map(c => c.slug));
          setResults(data.data.filter(c => !selectedSlugs.has(c.slug)));
        }
      } catch (e) {
        console.error("Search failed");
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedColleges]);

  const handleSelect = (college) => {
    if (selectedColleges.length >= MAX_COMPARE_COLLEGES) return;
    setSelectedColleges([...selectedColleges, college]);
    setQuery('');
    setIsOpen(false);
  };

  const handleRemove = (slug) => {
    setSelectedColleges(selectedColleges.filter(c => c.slug !== slug));
  };

  const isMaxReached = selectedColleges.length >= MAX_COMPARE_COLLEGES;

  return (
    <div className="w-full max-w-3xl mx-auto" ref={wrapperRef}>
      {/* Selected Chips */}
      <div className="flex flex-wrap gap-3 mb-4">
        {selectedColleges.map((college) => (
          <div key={college.slug} className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-800 px-3 py-2 rounded-lg shadow-sm">
            {college.logoUrl ? (
              <img src={college.logoUrl} alt="" className="w-6 h-6 rounded-md object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-md bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-700">
                {college.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium">{college.name}</span>
            <button 
              onClick={() => handleRemove(college.slug)}
              className="ml-1 p-1 hover:bg-blue-200 rounded-full text-blue-500 hover:text-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={isMaxReached ? `Maximum ${MAX_COMPARE_COLLEGES} colleges selected` : "Search to add colleges for comparison..."}
            disabled={isMaxReached}
            className={`w-full pl-11 pr-4 py-3.5 bg-white border ${isMaxReached ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-gray-300'} rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-shadow`}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            )}
          </div>
        </div>

        {/* Dropdown Results */}
        {isOpen && query.trim().length >= 2 && !isMaxReached && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-[var(--color-border)] rounded-xl shadow-xl max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="py-2">
                {results.map((college) => (
                  <li key={college.slug}>
                    <button
                      onClick={() => handleSelect(college)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      {college.logoUrl ? (
                        <img src={college.logoUrl} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                          {college.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-[var(--color-text-primary)]">{college.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{college.city}, {college.state}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                {isLoading ? 'Searching...' : 'No colleges found matching your query.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

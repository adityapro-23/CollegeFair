'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { COLLEGE_TYPES, EXAMS, INDIAN_STATES } from '@/lib/constants';

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`/colleges?${params.toString()}`);
  };

  const currentType = searchParams.get('type') || '';
  const currentState = searchParams.get('state') || '';
  const currentExam = searchParams.get('exam') || '';
  const currentFeesMax = searchParams.get('feesMax') || '';

  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[var(--color-text-primary)]">Filters</h2>
        {Array.from(searchParams.keys()).length > 0 && (
          <button
            onClick={() => router.push('/colleges')}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* State Filter */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">State</h3>
          <select
            value={currentState}
            onChange={(e) => updateFilter('state', e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
          >
            <option value="">All States</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* College Type */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">Institution Type</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                checked={currentType === ''}
                onChange={() => updateFilter('type', '')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Any</span>
            </label>
            {COLLEGE_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={currentType === type}
                  onChange={() => updateFilter('type', type)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Exams */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">Exams Accepted</h3>
          <select
            value={currentExam}
            onChange={(e) => updateFilter('exam', e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
          >
            <option value="">All Exams</option>
            {EXAMS.map((exam) => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>
        </div>

        {/* Max Fees */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">Max Total Fees</h3>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="100000"
              max="2000000"
              step="100000"
              value={currentFeesMax || 2000000}
              onChange={(e) => updateFilter('feesMax', e.target.value)}
              className="w-full accent-blue-600"
            />
            <span className="text-xs font-medium text-gray-600 w-12 text-right">
              {currentFeesMax ? `₹${(parseInt(currentFeesMax)/100000).toFixed(1)}L` : 'Any'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

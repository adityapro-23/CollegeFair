'use client';

import { useState } from 'react';
import PredictorForm from '@/components/predictor/PredictorForm';
import PredictorResults from '@/components/predictor/PredictorResults';

export default function PredictorPage() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResults(null); // Clear previous results so skeleton shows
    setQuery(formData);
    
    try {
      const params = new URLSearchParams({
        exam: formData.exam,
        rank: formData.rank,
        category: formData.category,
        quota: formData.quota,
        gender: formData.gender,
      });
      
      const res = await fetch(`/api/predictor?${params.toString()}`);
      const data = await res.json();
      
      if (data.success) {
        // Pass cutoffYear back into query for display
        setQuery(prev => ({ ...prev, cutoffYear: data.data.cutoffYear }));
        setResults(data.data.results);
      } else {
        setError(data.errors?.[0] || 'Failed to get predictions');
        setResults([]);
      }
    } catch (e) {
      setError('Failed to connect to database. Please try again later.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      {/* Header section */}
      <div className="bg-white border-b border-[var(--color-border)] overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-4 tracking-wider uppercase">
              Data-Driven Matching
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
              College Predictor
            </h1>
            <p className="text-lg text-[var(--color-text-muted)]">
              Find out which colleges you can get into based on your entrance exam rank. 
              Our algorithm matches your profile against historical cutoff data from our database.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-[400px] shrink-0 sticky top-24">
            <PredictorForm onSubmit={handlePredict} isLoading={isLoading} />
            
            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                How it works
              </h4>
              <ul className="text-sm text-blue-800/80 leading-relaxed space-y-1.5">
                <li><strong className="text-blue-900">Safe:</strong> Your rank is well within the cutoff range.</li>
                <li><strong className="text-blue-900">Moderate:</strong> Your rank is near the cutoff edge.</li>
                <li><strong className="text-blue-900">Reach:</strong> Borderline — admission not guaranteed.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="flex-1 w-full">
            {error && !isLoading && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-6">
                <h3 className="font-bold mb-1">Prediction Failed</h3>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!results && !isLoading && !error ? (
              <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-white/50">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Predict</h3>
                <p className="text-gray-500 max-w-sm">
                  Fill out the form with your exam details to see your predicted colleges.
                </p>
              </div>
            ) : null}

            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden animate-pulse">
                    <div className="p-5">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="flex gap-2">
                            <div className="h-5 bg-gray-100 rounded w-16"></div>
                            <div className="h-5 bg-gray-100 rounded w-20"></div>
                            <div className="h-5 bg-gray-100 rounded w-14"></div>
                          </div>
                        </div>
                        <div className="h-7 bg-gray-200 rounded-full w-20"></div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 px-5 py-3">
                      <div className="h-3 bg-gray-100 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {results && !isLoading && (
              <PredictorResults results={results} query={query} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

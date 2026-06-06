import { useState, useEffect } from 'react';
import { CATEGORIES, QUOTAS, GENDERS } from '@/lib/constants';

export default function PredictorForm({ onSubmit, isLoading }) {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    exam: '',
    rank: '',
    category: 'OPEN',
    quota: 'AI',
    gender: 'Gender-Neutral',
  });
  const [error, setError] = useState(null);

  // Fetch available exams on mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch('/api/predictor/exams');
        const data = await res.json();
        if (data.success) {
          setExams(data.data);
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, exam: data.data[0] }));
          }
        }
      } catch (e) {
        console.error("Failed to fetch exams:", e);
        setExams([]);
      }
    };
    fetchExams();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.exam) {
      setError("Please select an exam");
      return;
    }
    
    const rankNum = parseInt(formData.rank, 10);
    if (!formData.rank || isNaN(rankNum) || rankNum <= 0) {
      setError("Please enter a valid positive rank");
      return;
    }

    onSubmit({
      exam: formData.exam,
      rank: rankNum,
      category: formData.category,
      quota: formData.quota,
      gender: formData.gender,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          Enter Your Details
        </h2>
        <p className="text-purple-100 mt-1 text-sm">We'll match your profile with historical cutoff data.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exam Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
              Entrance Exam <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.exam}
              onChange={(e) => setFormData({...formData, exam: e.target.value})}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            >
              <option value="" disabled>Select an exam</option>
              {exams.map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
              Caste Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Quota Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
              Quota <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.quota}
              onChange={(e) => setFormData({...formData, quota: e.target.value})}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            >
              {QUOTAS.map(q => (
                <option key={q} value={q}>{q === 'AI' ? 'All India' : q === 'HS' ? 'Home State' : 'Other State'}</option>
              ))}
            </select>
          </div>

          {/* Gender Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            >
              {GENDERS.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Rank Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
            Overall Rank <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">#</span>
            </div>
            <input
              type="number"
              min="1"
              placeholder="e.g. 15000"
              value={formData.rank}
              onChange={(e) => setFormData({...formData, rank: e.target.value})}
              className="w-full pl-8 p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-lg font-medium"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Enter your exact rank, not percentile.</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing Cutoffs...
            </>
          ) : (
            <>
              Predict Colleges
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

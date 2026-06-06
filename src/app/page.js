import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">


            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Find Your <span className="text-cyan-300">Perfect College</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Discover, compare, and predict your best-fit colleges in India.
              Make informed decisions with real data on fees, placements, and rankings.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/colleges"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-blue-700
                  font-semibold text-base shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Explore Colleges
              </Link>
              <Link
                href="/predictor"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 text-white
                  font-semibold text-base border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
                Try Predictor Tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
            Everything you need for college decisions
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            From discovering colleges to predicting your admission chances — we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Link href="/colleges" className="group bg-white rounded-xl p-6 border border-[var(--color-border)]
            hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4
              group-hover:bg-blue-100 transition-colors duration-200">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5">Search & Discover</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Browse colleges with filters for location, fees, rating, and entrance exams.
            </p>
          </Link>

          {/* Feature 2 */}
          <Link href="/colleges" className="group bg-white rounded-xl p-6 border border-[var(--color-border)]
            hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-4
              group-hover:bg-emerald-100 transition-colors duration-200">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5">Detailed Profiles</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              View courses, fees, placements, reviews, and rankings for every college.
            </p>
          </Link>

          {/* Feature 3 */}
          <Link href="/compare" className="group bg-white rounded-xl p-6 border border-[var(--color-border)]
            hover:border-amber-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center mb-4
              group-hover:bg-amber-100 transition-colors duration-200">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5">Compare Colleges</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Compare up to 3 colleges side-by-side on fees, placements, and ratings.
            </p>
          </Link>

          {/* Feature 4 */}
          <Link href="/predictor" className="group bg-white rounded-xl p-6 border border-[var(--color-border)]
            hover:border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4
              group-hover:bg-purple-100 transition-colors duration-200">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5">College Predictor</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Enter your exam rank and get predicted colleges with match confidence.
            </p>
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">200+</div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">Colleges Listed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">150+</div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">Courses Available</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">12</div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">Exams Covered</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">5000+</div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">Cutoff Records</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

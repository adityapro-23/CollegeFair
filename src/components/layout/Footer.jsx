import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-[var(--color-text-primary)]">
                College<span className="text-[var(--color-primary)]">Fair</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
              Your trusted companion for college discovery, comparison, and admission prediction.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Explore</h4>
            <ul className="space-y-2.5">
              <li><Link href="/colleges" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">All Colleges</Link></li>
              <li><Link href="/compare" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Compare Colleges</Link></li>
              <li><Link href="/predictor" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">College Predictor</Link></li>
            </ul>
          </div>

          {/* Top Colleges */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Top Colleges</h4>
            <ul className="space-y-2.5">
              <li><Link href="/colleges/iit-bombay" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">IIT Bombay</Link></li>
              <li><Link href="/colleges/iit-delhi" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">IIT Delhi</Link></li>
              <li><Link href="/colleges/iit-madras" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">IIT Madras</Link></li>
              <li><Link href="/colleges/bits-pilani" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">BITS Pilani</Link></li>
            </ul>
          </div>

          {/* Top Exams */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Top Exams</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-[var(--color-text-muted)]">JEE Main</span></li>
              <li><span className="text-sm text-[var(--color-text-muted)]">JEE Advanced</span></li>
              <li><span className="text-sm text-[var(--color-text-muted)]">MHT-CET</span></li>
              <li><span className="text-sm text-[var(--color-text-muted)]">NEET</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} CollegeFair. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}

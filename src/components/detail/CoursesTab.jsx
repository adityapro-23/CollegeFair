export default function CoursesTab({ courses }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-12 text-center">
        <p className="text-[var(--color-text-muted)]">No course data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Courses & Fees</h2>
      
      <div className="grid gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-[var(--color-border)] p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold tracking-wide">
                    {course.degree}
                  </span>
                  {course.duration && (
                    <span className="text-sm text-[var(--color-text-muted)]">
                      • {course.duration}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {course.name}
                </h3>
                {course.branch && (
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Specialization: {course.branch}
                  </p>
                )}
              </div>
              
              <div className="md:text-right">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Total Fees</p>
                <p className="text-xl font-bold text-[var(--color-text-primary)]">
                  ₹{course.feesTotal.toLocaleString()}
                </p>
                {course.feesPerYear && (
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    ₹{course.feesPerYear.toLocaleString()} / year
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.eligibility && (
                <div>
                  <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Eligibility</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{course.eligibility}</p>
                </div>
              )}
              {course.seats && (
                <div>
                  <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total Seats</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{course.seats}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/components/SectionWrapper.jsx
// Consistent padding/max-width wrapper for every section.
// Section vertical padding: py-20 md:py-32 (from phase-0-reference.html spacing rules).
// Max width: max-w-6xl, centered, with horizontal padding.

/**
 * SectionWrapper — wraps a section's content with consistent layout constraints.
 * @param {string}  [id]        - HTML id for scroll targeting
 * @param {string}  [className] - additional classes (e.g. bg-ink for dark sections)
 * @param {boolean} [fullWidth] - if true, skip max-width constraint (for full-bleed sections like Hero)
 * @param {React.ReactNode} children
 */
export default function SectionWrapper({ id, className = '', fullWidth = false, children }) {
  return (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-6xl mx-auto px-6">
          {children}
        </div>
      )}
    </section>
  );
}

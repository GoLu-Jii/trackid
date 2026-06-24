// src/components/Divider.jsx
// Wraps the .divider-teardrop markup from phase-0-reference.html.
// Use between every section boundary — never use a plain <hr>.

/**
 * Divider — the signature teardrop hairline divider.
 * @param {string} [className] - additional classes (e.g. color via text-slate)
 */
export default function Divider({ className = 'text-slate' }) {
  return (
    <div className={`divider-teardrop ${className}`}>
      <span className="bullet" />
    </div>
  );
}

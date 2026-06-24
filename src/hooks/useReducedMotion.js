// src/hooks/useReducedMotion.js
// Thin wrapper around Framer Motion's useReducedMotion.
// Single source of truth — every component imports from here,
// not directly from framer-motion. If the upstream API changes,
// we update this one file.

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * useReducedMotion — returns true if the user prefers reduced motion.
 * When true, components should render final state directly with no transition.
 */
export function useReducedMotion() {
  return useFramerReducedMotion();
}

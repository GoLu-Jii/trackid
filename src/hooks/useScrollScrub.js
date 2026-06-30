// src/hooks/useScrollScrub.js
// Shared GSAP ScrollTrigger wrapper — used ONLY by Sections 01 (Hero)
// and 02 (Reveal). Do not reach for this in other sections; use
// Framer Motion's whileInView instead.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollScrub — pins a container and reports scroll progress (0→1).
 *
 * @param {object}   options
 * @param {string}   [options.start='top top']   - ScrollTrigger start position
 * @param {string}   [options.end='bottom top']  - ScrollTrigger end position
 * @param {boolean}  [options.pin=true]           - pin the trigger element
 * @param {function} [options.onUpdate]           - called with (progress: number, self: ScrollTrigger)
 * @param {boolean}  [options.scrub=true]         - link animation to scroll position
 *
 * @returns {React.RefObject} ref — attach this to the container element
 */
export function useScrollScrub({
  start = 'top top',
  end = 'bottom top',
  pin = true,
  onUpdate,
  scrub = true,
} = {}) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      pin,
      scrub: scrub === true ? 1 : scrub, // 1 = smooth 1-second catch-up
      onUpdate: (self) => {
        if (onUpdate) {
          onUpdate(self.progress, self);
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [start, end, pin, onUpdate, scrub]);

  return triggerRef;
}

// src/components/StoryThread.jsx
// THE GOLDEN THREAD — the motif that makes the whole site feel like one
// continuous story. Between every chapter, a thin gold line draws itself
// downward with a glowing comet riding its tip (the same language as
// Chapter Two's minute rail), then lands in a teardrop — the brand mark.
// Optionally carries a narrative hand-off line above it.
//
// Replaces the static <Divider /> at chapter boundaries:
//   <StoryThread />                          plain stitch
//   <StoryThread bridge="And then —" />      stitch with a hand-off line
// Scroll-scrubbed and fully reversible. Reduced motion: static.

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUp, EASE } from '../motion/variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function StoryThread({ bridge }) {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const cometRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrap, start: 'top 95%', end: 'top 45%', scrub: 0.5 },
    });
    tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0);
    tl.fromTo(
      cometRef.current,
      { top: '0%', opacity: 1 },
      { top: '100%', opacity: 0.9, ease: 'none' },
      0
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative bg-parchment py-10 md:py-14 flex flex-col items-center">
      {bridge && (
        <motion.p
          {...fadeUp}
          className="font-mono text-[11px] md:text-xs uppercase tracking-kicker text-gold/80 mb-8 px-6 text-center max-w-xl"
        >
          {bridge}
        </motion.p>
      )}

      {/* the thread */}
      <div ref={wrapRef} aria-hidden className="relative h-16 md:h-24">
        <span
          ref={lineRef}
          style={prefersReducedMotion ? undefined : { transform: 'scaleY(0)' }}
          className="block w-px h-full origin-top bg-gradient-to-b from-transparent via-gold/50 to-gold/70"
        />
        {!prefersReducedMotion && (
          <span
            ref={cometRef}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_12px_rgba(201,166,107,0.9),0_0_28px_rgba(201,166,107,0.4)]"
            style={{ top: 0 }}
          />
        )}
      </div>

      {/* the drop — the thread lands in the brand teardrop */}
      <motion.span
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-1 block w-[9px] h-[12px] bg-gold shadow-[0_0_14px_rgba(201,166,107,0.6)]"
        style={{ borderRadius: '50% 50% 50% 4%' }}
      />
    </div>
  );
}

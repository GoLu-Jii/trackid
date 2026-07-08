import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus } from "lucide-react";

import { ASSETS } from "../../content/assets";
import { EASE, fadeUp } from "../../motion/variants";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function PendantCard({ item }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [showBack, setShowBack] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const image =
    ASSETS.pendants[item.id]?.heroImage ||
    ASSETS.pendants.classicTeardrop.heroImage;
  const backImage =
    ASSETS.pendants[item.id]?.backImage || image;

  // ----- cursor-tracked 3D tilt -----
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["20%", "80%"]);

  function handleMouseMove(e) {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      {...fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="
        group
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-gold/25
        bg-gradient-to-b
        from-white
        to-stone/60
        backdrop-blur
        p-10
        shadow-lg
        transition-[border-color,box-shadow,transform]
        duration-300
        hover:border-gold/50
        hover:shadow-2xl
      "
    >
      {/* Hairline top accent — echoes the gold glow used in the dark
          collection panel above, so the card grid still feels tied to it. */}
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
      {/* Cursor-following glow, replaces the fixed corner blur */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={shouldReduceMotion ? undefined : { left: glowX, top: glowY }}
      />

      {/* Image — click to flip to the back / engraving side */}

      <div className="relative flex justify-center py-10" style={{ transformStyle: "preserve-3d" }}>
        <button
          type="button"
          onClick={() => setShowBack((v) => !v)}
          className="relative z-10 [perspective:1000px]"
          aria-label={showBack ? "Show front of pendant" : "Show back of pendant"}
        >
          <motion.div
            animate={{ rotateY: showBack ? 180 : 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-[250px] lg:w-[280px]"
          >
            <motion.img
              src={image}
              alt={item.name}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [-3, 3, -3], rotate: [-1, 1, -1] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: EASE }}
              style={{ backfaceVisibility: "hidden" }}
              className="w-full transition-transform duration-500 group-hover:scale-105"
            />
            <img
              src={backImage}
              alt={`${item.name} — reverse`}
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 w-full"
            />
          </motion.div>
          <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-accent/70">
            {showBack ? "← front" : "engraving →"}
          </span>
        </button>

        {/* Top Annotation */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute left-0 top-8"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {item.motifNotes[0].title}
            </span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </motion.div>

        {/* Bottom Annotation */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute right-0 bottom-10 text-right"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="h-px w-12 bg-gold/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {item.motifNotes[1].title}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Name */}
      <h3 className="mt-8 font-display font-medium text-4xl text-ink leading-tight">
        {item.name}
      </h3>

      {/* Description */}
      <p className="mt-5 leading-8 text-slate text-lg">{item.description}</p>

      {/* Motifs */}
      <div className="mt-10 space-y-6">
        {item.motifNotes.map((note, index) => (
          <motion.div
            key={note.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
            className="flex items-start gap-4"
          >
            <div className="mt-2 h-2 w-2 rounded-full bg-gold transition-transform duration-300 group-hover:scale-125" />
            <div>
              <p className="font-display text-lg text-ink">{note.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate">
                {note.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Footer — now an actual disclosure trigger, not just static text */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-8 flex w-full items-center justify-between border-t border-gold/15 pt-6 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Craft Collection
        </span>
        <span className="flex items-center gap-2 font-body text-sm text-slate">
          {expanded ? "Hide specs" : "Tech specs"}
          <motion.span
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Plus size={14} strokeWidth={2} className="text-accent" />
          </motion.span>
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden"
      >
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider text-slate">
          {(item.specs || []).map((spec) => (
            <div key={spec.label} className="flex flex-col gap-1">
              <dt className="text-accent/70">{spec.label}</dt>
              <dd className="text-ink normal-case tracking-normal text-sm font-body">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </motion.article>
  );
}
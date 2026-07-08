import { motion } from 'framer-motion';
import { fadeUp } from '../../motion/variants';
import { COPY } from '../../content/copy';
import * as Icons from 'lucide-react';
import Divider from '../../components/Divider';

const { brandStatement, tagline, footerColumns, socialLinks, copyright } = COPY.closing;

export default function Closing() {
  return (
    <section className="bg-ink pt-28 pb-14 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <motion.div {...fadeUp} className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-display text-5xl md:text-7xl text-parchment">
            {brandStatement}
          </h2>
          <p className="font-body text-base text-parchment/50 max-w-md leading-relaxed">
            {tagline}
          </p>
        </motion.div>

        <Divider className="text-gold/50" />

        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {footerColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
                {col.heading}
              </span>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-sm text-parchment/55 hover:text-parchment transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
              
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="font-body text-sm text-parchment/55 hover:text-parchment transition-colors duration-200">
                  Track your device
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-parchment/55 hover:text-parchment transition-colors duration-200">
                  Share your location
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gold/80">
              Follow
            </span>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((s) => {
                const LucideIcon = Icons[s.icon];
                return (
                  <li key={s.label}>
                    <a href={s.href} className="inline-flex items-center gap-2 font-body text-sm text-parchment/55 hover:text-parchment transition-colors duration-200">
                      {LucideIcon && <LucideIcon size={14} />}
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </motion.div>

        <p className="font-mono text-xs text-parchment/35 text-center border-t border-parchment/10 pt-8">
          {copyright}
        </p>

      </div>
    </section>
  );
}
import { School, Users, ArrowRight } from "lucide-react";
import { useTrack } from "../../context/TrackContext";
import { ASSETS } from "../../content/assets";

function Fork() {
  const { activeTrack, setActiveTrack } = useTrack();

  const handleSelect = (track) => {
    setActiveTrack(track);

    const section = document.getElementById( track === "institution" ? "compliance-case" : "anatomy" );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-ink flex items-center justify-center px-6 py-24 overflow-hidden">

      {/* Ambient background image — kept low-opacity so it never fights the text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.4]"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.fork})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/50" />

      <div className="relative z-10 max-w-7xl w-full">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="font-mono uppercase tracking-[0.35em] text-accent text-sm mb-4">
            CHOOSE YOUR EXPERIENCE
          </p>

          <h2 className="font-display text-7xl md:text-8xl text-parchment">
            Choose Your Path
          </h2>

          <div className="divider-teardrop text-gold my-8">
            <span className="bullet"></span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Institution Card */}
          <div
            onClick={() => handleSelect("institution")}
            className={`group cursor-pointer rounded-[32px]
            border p-10 bg-gradient-to-br from-white to-stone/40
            transition-all duration-500
            hover:-translate-y-2 hover:shadow-2xl
            ${
              activeTrack === "institution"
                ? "border-accent ring-2 ring-accent/20 shadow-2xl"
                : "border-stone"
            }`}
          >
            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10">
                <School className="w-8 h-8 text-accentDeep" />
              </div>

              <ArrowRight className="w-5 h-5 text-slate group-hover:translate-x-2 transition-transform duration-300" />

            </div>

            <p className="uppercase tracking-[0.3em] text-xs text-accentDeep mb-3">
              Institutions
            </p>

            <h3 className="font-display text-3xl text-ink mb-5">
              For Schools & Institutions
            </h3>

            <p className="text-slate leading-8">
              Safety and visibility for every student, at scale.
            </p>

            <div className="mt-10 flex items-center gap-2 text-accentDeep font-medium">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Family Card */}
          <div
            onClick={() => handleSelect("family")}
            className={`group cursor-pointer rounded-[32px]
            border p-10 bg-gradient-to-br from-white to-stone/40
            transition-all duration-500
            hover:-translate-y-2 hover:shadow-2xl
            ${
              activeTrack === "family"
                ? "border-accent ring-2 ring-accent/20 shadow-2xl"
                : "border-stone"
            }`}
          >
            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10">
                <Users className="w-8 h-8 text-accentDeep" />
              </div>

              <ArrowRight className="w-5 h-5 text-slate group-hover:translate-x-2 transition-transform duration-300" />

            </div>

            <p className="uppercase tracking-[0.3em] text-xs text-accentDeep mb-3">
              Family
            </p>

            <h3 className="font-display text-3xl text-ink mb-5">
              For Families
            </h3>

            <p className="text-slate leading-8">
              A beautiful, secure way to stay close to the ones you love.
            </p>

            <div className="mt-10 flex items-center gap-2 text-accentDeep font-medium">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Fork;
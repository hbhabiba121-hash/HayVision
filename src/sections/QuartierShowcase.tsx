import { useState, useEffect, useRef } from 'react';
import { MapPin, TrendingUp, Calculator, Bell, ArrowRight, ChevronLeft, ChevronRight, Building2, School, Train } from 'lucide-react';
import { quartierShowcaseConfig } from '../config';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, TrendingUp, Calculator, Bell,
};

export function QuartierShowcase() {
  // Null check: if config is empty, render nothing
  if (!quartierShowcaseConfig.mainTitle || quartierShowcaseConfig.quartiers.length === 0) return null;

  const [activeQuartier, setActiveQuartier] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const quartiers = quartierShowcaseConfig.quartiers;
  const features = quartierShowcaseConfig.features;
  const quote = quartierShowcaseConfig.quote;
  const quartier = quartiers[activeQuartier];

  const nextQuartier = () => setActiveQuartier((prev) => (prev + 1) % quartiers.length);
  const prevQuartier = () => setActiveQuartier((prev) => (prev - 1 + quartiers.length) % quartiers.length);

  return (
    <section
      id="quartiers"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d2a855 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative">
        {/* Section Title */}
        <div className="fade-up text-center mb-16">
          <span className="font-script text-3xl text-gold-400 block mb-2">{quartierShowcaseConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {quartierShowcaseConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{quartierShowcaseConfig.mainTitle}</h2>
        </div>

        {/* Quartier Tabs */}
        <div className="fade-up flex flex-wrap justify-center gap-2 mb-16" style={{ transitionDelay: '0.1s' }}>
          {quartiers.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setActiveQuartier(i)}
              className={`px-4 py-2 rounded-sm text-sm transition-all duration-300 ${
                i === activeQuartier
                  ? 'bg-gold-500 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {q.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Quartier Info */}
          <div className="slide-in-left lg:col-span-2 order-2 lg:order-1">
            {/* Year + Name */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-serif text-4xl lg:text-5xl text-gold-500/30 leading-none">{quartier.year}</span>
                <div>
                  <h2 className="font-serif text-h3 text-white leading-tight">{quartier.name}</h2>
                  <span className="font-script text-xl text-gold-400">{quartier.subtitle}</span>
                </div>
              </div>
              <div className="w-16 h-px bg-gold-500 mt-4" />
            </div>

            {/* Description */}
            <p className="text-white/85 leading-relaxed mb-6">{quartier.description}</p>

            {/* Price & Evolution */}
            <div className="flex gap-6 mb-8">
              <div>
                <div className="font-serif text-2xl text-gold-500">{quartier.prixMoyen}</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider mt-1">Prix moyen</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className={`font-serif text-2xl ${quartier.evolution.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {quartier.evolution}
                </div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider mt-1">Évolution</div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-gold-500 mt-0.5" />
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">Type de bien</div>
                  <div className="text-sm text-white/80">{quartier.typeBien}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-gold-500 mt-0.5" />
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">Infrastructures</div>
                  <div className="text-sm text-white/80">{quartier.infrastructures}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <School className="w-4 h-4 text-gold-500 mt-0.5" />
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">Écoles</div>
                  <div className="text-sm text-white/80">{quartier.ecoles}</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                const element = document.querySelector('#estimation');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary rounded-sm flex items-center gap-2 group"
              aria-label="Estimer dans ce quartier"
            >
              Estimer dans ce quartier
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Center: Quartier Image */}
          <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
            <div className="relative" style={{ width: '320px', height: '400px' }}>
              {/* Glow */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
                <div className={`w-56 h-56 ${quartier.glowColor} rounded-full blur-3xl transition-colors duration-700`} />
              </div>

              {/* Images */}
              {quartiers.map((q, i) => (
                <img
                  key={q.id}
                  src={q.image}
                  alt={`${q.name} - ${q.subtitle}`}
                  loading={i === 0 ? undefined : 'lazy'}
                  style={q.filter ? { filter: q.filter } : undefined}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg z-10 shadow-2xl transition-all duration-700 ${
                    i === activeQuartier
                      ? 'opacity-100 scale-100 translate-y-0'
                      : i < activeQuartier
                        ? 'opacity-0 scale-90 -translate-y-6 pointer-events-none'
                        : 'opacity-0 scale-90 translate-y-6 pointer-events-none'
                  }`}
                />
              ))}

              {/* Switcher Arrows */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                <button
                  onClick={prevQuartier}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
                  aria-label="Quartier précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-white/50 font-serif tabular-nums whitespace-nowrap">
                  {activeQuartier + 1} / {quartiers.length}
                </span>
                <button
                  onClick={nextQuartier}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
                  aria-label="Quartier suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Features + Quote */}
          <div className="slide-in-right lg:col-span-2 order-3">
            <div className="space-y-6">
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon] || MapPin;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-gold-500/30 transition-colors">
                      <IconComponent className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-white/65 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            {quote.text && (
              <div className="mt-10 p-6 bg-white/[0.03] rounded-lg border-l-2 border-gold-500/50">
                {quote.prefix && <p className="font-script text-2xl text-gold-400 mb-2">{quote.prefix}</p>}
                <p className="text-white/70 text-sm italic leading-relaxed">
                  "{quote.text}"
                </p>
                {quote.attribution && <p className="text-gold-500 text-xs mt-3">— {quote.attribution}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

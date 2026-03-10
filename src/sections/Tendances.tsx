import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, ChevronLeft, ChevronRight, TrendingUp, BarChart3, Building2 } from 'lucide-react';
import { tendancesConfig } from '../config';

export function Tendances() {
  if (!tendancesConfig.mainTitle || tendancesConfig.slides.length === 0) return null;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = tendancesConfig.slides;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance slides
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

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

  return (
    <section
      id="tendances"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom relative">
        {/* Section Title */}
        <div className="fade-up text-center mb-12">
          <span className="font-script text-3xl text-gold-400 block mb-2">{tendancesConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {tendancesConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{tendancesConfig.mainTitle}</h2>
        </div>

        {/* Location Tag */}
        <div className="fade-up flex justify-center mb-8" style={{ transitionDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span className="text-sm text-white/70">{tendancesConfig.locationTag}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="fade-up relative" style={{ transitionDelay: '0.2s' }}>
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] lg:aspect-[21/9]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === activeSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                {/* Image with Ken Burns effect */}
                <div className={`absolute inset-0 transition-transform duration-[8000ms] ${
                  index === activeSlide ? 'scale-110' : 'scale-100'
                }`}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                  <div className="max-w-2xl">
                    <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-2 block">
                      {slide.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl lg:text-4xl text-white mb-4">{slide.title}</h3>
                    <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-6">
                      {slide.description}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span className="font-serif text-2xl text-emerald-400">{slide.evolution}</span>
                      </div>
                      <div className="text-white/50 text-sm">{slide.periode}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 z-10"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 z-10"
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-8 bg-gold-500'
                    : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="fade-up grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12" style={{ transitionDelay: '0.3s' }}>
          <div className="bg-white/[0.03] rounded-lg p-6 border border-white/10 text-center">
            <BarChart3 className="w-8 h-8 text-gold-500 mx-auto mb-3" />
            <div className="font-serif text-2xl text-white mb-1">+35%</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Croissance 5 ans</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-6 border border-white/10 text-center">
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="font-serif text-2xl text-white mb-1">+28%</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Prédiction 2030</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-6 border border-white/10 text-center">
            <Building2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="font-serif text-2xl text-white mb-1">12</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Grands projets</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-6 border border-white/10 text-center">
            <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="font-serif text-2xl text-white mb-1">15+</div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Quartiers</div>
          </div>
        </div>
      </div>
    </section>
  );
}

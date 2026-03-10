import { useState, useEffect, useRef } from 'react';
import { BarChart3, Check, TrendingUp, Building2, GraduationCap, Bus, Shield, DollarSign } from 'lucide-react';
import { comparateurConfig } from '../config';

export function Comparateur() {
  if (!comparateurConfig.mainTitle || comparateurConfig.quartiers.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedQuartiers, setSelectedQuartiers] = useState<string[]>([]);

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

  const toggleQuartier = (id: string) => {
    setSelectedQuartiers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((q) => q !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const selectedData = comparateurConfig.quartiers.filter((q) => selectedQuartiers.includes(q.id));

  const getScoreColor = (value: number, max: number = 100) => {
    const percentage = value / max;
    if (percentage >= 0.8) return 'bg-emerald-500';
    if (percentage >= 0.6) return 'bg-gold-500';
    if (percentage >= 0.4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (value: number, max: number = 100) => {
    const percentage = value / max;
    if (percentage >= 0.8) return 'text-emerald-400';
    if (percentage >= 0.6) return 'text-gold-400';
    if (percentage >= 0.4) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <section
      id="comparateur"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d2a855 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative">
        {/* Section Title */}
        <div className="fade-up text-center mb-12">
          <span className="font-script text-3xl text-gold-400 block mb-2">{comparateurConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {comparateurConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{comparateurConfig.mainTitle}</h2>
          <p className="text-white/70 mt-6 max-w-2xl mx-auto">{comparateurConfig.introText}</p>
        </div>

        {/* Quartier Selection */}
        <div className="fade-up mb-12" style={{ transitionDelay: '0.1s' }}>
          <div className="flex flex-wrap justify-center gap-3">
            {comparateurConfig.quartiers.map((quartier) => {
              const isSelected = selectedQuartiers.includes(quartier.id);
              return (
                <button
                  key={quartier.id}
                  onClick={() => toggleQuartier(quartier.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-gold-500 bg-gold-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-4 h-4 text-gold-500" />
                  ) : (
                    <div className="w-4 h-4 rounded border border-white/30" />
                  )}
                  <span>{quartier.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-white/50 text-sm mt-4">
            Sélectionnez jusqu'à 3 quartiers à comparer
          </p>
        </div>

        {/* Comparison Table */}
        {selectedData.length > 0 && (
          <div className="fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[200px_1fr] lg:grid-cols-[200px_repeat(3,1fr)] border-b border-white/10">
                <div className="p-4 lg:p-6 flex items-center">
                  <BarChart3 className="w-5 h-5 text-gold-500 mr-2" />
                  <span className="text-white/70 font-medium">Critères</span>
                </div>
                {selectedData.map((q) => (
                  <div key={q.id} className="p-4 lg:p-6 text-center border-l border-white/10">
                    <span className="text-white font-serif text-lg">{q.name}</span>
                  </div>
                ))}
                {/* Empty cells for alignment */}
                {Array(3 - selectedData.length).fill(0).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden lg:block p-6 border-l border-white/10" />
                ))}
              </div>

              {/* Prix au m² */}
              <div className="grid grid-cols-[200px_1fr] lg:grid-cols-[200px_repeat(3,1fr)] border-b border-white/10">
                <div className="p-4 lg:p-6 flex items-center bg-white/[0.02]">
                  <DollarSign className="w-4 h-4 text-gold-500 mr-2" />
                  <span className="text-white/60 text-sm">Prix au m²</span>
                </div>
                {selectedData.map((q) => (
                  <div key={q.id} className="p-4 lg:p-6 text-center border-l border-white/10">
                    <span className="font-serif text-xl text-white">{q.prixMoyen.toLocaleString()} MAD</span>
                  </div>
                ))}
                {Array(3 - selectedData.length).fill(0).map((_, i) => (
                  <div key={`empty-prix-${i}`} className="hidden lg:block p-6 border-l border-white/10" />
                ))}
              </div>

              {/* Évolution */}
              <div className="grid grid-cols-[200px_1fr] lg:grid-cols-[200px_repeat(3,1fr)] border-b border-white/10">
                <div className="p-4 lg:p-6 flex items-center bg-white/[0.02]">
                  <TrendingUp className="w-4 h-4 text-gold-500 mr-2" />
                  <span className="text-white/60 text-sm">Évolution annuelle</span>
                </div>
                {selectedData.map((q) => (
                  <div key={q.id} className="p-4 lg:p-6 text-center border-l border-white/10">
                    <span className={`font-serif text-xl ${q.evolution > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {q.evolution > 0 ? '+' : ''}{q.evolution}%
                    </span>
                  </div>
                ))}
                {Array(3 - selectedData.length).fill(0).map((_, i) => (
                  <div key={`empty-evo-${i}`} className="hidden lg:block p-6 border-l border-white/10" />
                ))}
              </div>

              {/* Score bars */}
              {[
                { key: 'infrastructures', label: 'Infrastructures', icon: Building2 },
                { key: 'ecoles', label: 'Écoles', icon: GraduationCap },
                { key: 'transport', label: 'Transport', icon: Bus },
                { key: 'securite', label: 'Sécurité', icon: Shield },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="grid grid-cols-[200px_1fr] lg:grid-cols-[200px_repeat(3,1fr)] border-b border-white/10 last:border-b-0">
                  <div className="p-4 lg:p-6 flex items-center bg-white/[0.02]">
                    <Icon className="w-4 h-4 text-gold-500 mr-2" />
                    <span className="text-white/60 text-sm">{label}</span>
                  </div>
                  {selectedData.map((q) => {
                    const value = q[key as keyof typeof q] as number;
                    return (
                      <div key={q.id} className="p-4 lg:p-6 border-l border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getScoreColor(value)}`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className={`font-serif text-lg ${getScoreTextColor(value)}`}>
                            {value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {Array(3 - selectedData.length).fill(0).map((_, i) => (
                    <div key={`empty-${key}-${i}`} className="hidden lg:block p-6 border-l border-white/10" />
                  ))}
                </div>
              ))}
            </div>

            {/* Summary Cards */}
            <div className="grid lg:grid-cols-3 gap-4 mt-8">
              {selectedData.map((q) => (
                <div key={q.id} className="bg-white/[0.03] rounded-lg p-6 border border-white/10">
                  <h4 className="font-serif text-xl text-white mb-4">{q.name}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/50 text-sm">Prix moyen</span>
                      <span className="text-white">{q.prixMoyen.toLocaleString()} MAD/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50 text-sm">Évolution</span>
                      <span className={q.evolution > 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {q.evolution > 0 ? '+' : ''}{q.evolution}%
                      </span>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-sm">Score global</span>
                        <span className="font-serif text-2xl text-gold-500">
                          {Math.round((q.infrastructures + q.ecoles + q.transport + q.securite) / 4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedData.length === 0 && (
          <div className="fade-up bg-white/[0.03] rounded-xl p-12 border border-white/10 text-center" style={{ transitionDelay: '0.2s' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <BarChart3 className="w-8 h-8 text-gold-500/50" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Sélectionnez des quartiers</h3>
            <p className="text-white/50">Choisissez au moins un quartier pour voir la comparaison</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Calculator, Home, Building, Landmark, TreePine, Briefcase, Search, TrendingUp, MapPin } from 'lucide-react';
import { estimationConfig, quartierShowcaseConfig } from '../config';

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Appartement": Building,
  "Villa": Home,
  "Riad": Landmark,
  "Terrain": TreePine,
  "Bureau": Briefcase,
};

export function Estimation() {
  if (!estimationConfig.mainTitle) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedQuartier, setSelectedQuartier] = useState('');
  const [surface, setSurface] = useState('');
  const [typeBien, setTypeBien] = useState('');
  const [chambres, setChambres] = useState('');
  const [showResult, setShowResult] = useState(false);

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

  const calculateEstimation = () => {
    const quartier = quartiers.find(q => q.id === selectedQuartier);
    if (!quartier || !surface) return null;

    const prixMoyen = parseInt(quartier.prixMoyen.replace(/\D/g, ''));
    const surfaceNum = parseInt(surface);
    
    // Adjust based on property type
    let multiplier = 1;
    switch(typeBien) {
      case 'Villa': multiplier = 1.3; break;
      case 'Riad': multiplier = 1.2; break;
      case 'Terrain': multiplier = 0.7; break;
      case 'Bureau': multiplier = 0.9; break;
      default: multiplier = 1;
    }

    // Adjust based on bedrooms
    let chambreMultiplier = 1;
    if (chambres === 'Studio') chambreMultiplier = 0.85;
    else if (chambres === '1') chambreMultiplier = 0.9;
    else if (chambres === '2') chambreMultiplier = 0.95;
    else if (chambres === '4+') chambreMultiplier = 1.1;
    else if (chambres === '5+') chambreMultiplier = 1.2;

    const prixTotal = Math.round(prixMoyen * surfaceNum * multiplier * chambreMultiplier);
    const prixMin = Math.round(prixTotal * 0.9);
    const prixMax = Math.round(prixTotal * 1.1);

    return { prixMin, prixMax, prixTotal, quartier };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuartier && surface && typeBien) {
      setShowResult(true);
    }
  };

  const estimation = calculateEstimation();

  return (
    <section
      id="estimation"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-[#141414] to-[#1a1a1a]"
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
          <span className="font-script text-3xl text-gold-400 block mb-2">{estimationConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {estimationConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{estimationConfig.mainTitle}</h2>
          <p className="text-white/70 mt-6 max-w-2xl mx-auto">{estimationConfig.introText}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="slide-in-left">
            <form onSubmit={handleSubmit} className="bg-white/[0.03] rounded-xl p-8 border border-white/10">
              {/* Ville */}
              <div className="mb-6">
                <label className="block text-sm text-white/70 mb-2">{estimationConfig.form.villeLabel}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
                  <input
                    type="text"
                    value="Rabat"
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Quartier */}
              <div className="mb-6">
                <label className="block text-sm text-white/70 mb-2">{estimationConfig.form.quartierLabel}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
                  <select
                    value={selectedQuartier}
                    onChange={(e) => { setSelectedQuartier(e.target.value); setShowResult(false); }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white appearance-none cursor-pointer focus:border-gold-500 focus:outline-none"
                  >
                    <option value="" className="bg-[#1a1a1a]">{estimationConfig.form.quartierPlaceholder}</option>
                    {quartiers.map((q) => (
                      <option key={q.id} value={q.id} className="bg-[#1a1a1a]">{q.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Surface */}
              <div className="mb-6">
                <label className="block text-sm text-white/70 mb-2">{estimationConfig.form.surfaceLabel}</label>
                <div className="relative">
                  <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
                  <input
                    type="number"
                    value={surface}
                    onChange={(e) => { setSurface(e.target.value); setShowResult(false); }}
                    placeholder={estimationConfig.form.surfacePlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Type de bien */}
              <div className="mb-6">
                <label className="block text-sm text-white/70 mb-2">{estimationConfig.form.typeBienLabel}</label>
                <div className="grid grid-cols-3 gap-3">
                  {estimationConfig.form.typeBienOptions.map((type) => {
                    const Icon = typeIcons[type] || Home;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => { setTypeBien(type); setShowResult(false); }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                          typeBien === type
                            ? 'border-gold-500 bg-gold-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${typeBien === type ? 'text-gold-500' : 'text-white/50'}`} />
                        <span className={`text-xs ${typeBien === type ? 'text-white' : 'text-white/50'}`}>{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chambres */}
              <div className="mb-8">
                <label className="block text-sm text-white/70 mb-2">{estimationConfig.form.chambresLabel}</label>
                <div className="flex flex-wrap gap-2">
                  {estimationConfig.form.chambresOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => { setChambres(opt); setShowResult(false); }}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        chambres === opt
                          ? 'border-gold-500 bg-gold-500 text-white'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-primary rounded-lg flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                {estimationConfig.form.submitText}
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="slide-in-right">
            {showResult && estimation ? (
              <div className="bg-gradient-to-br from-gold-500/20 to-gold-900/20 rounded-xl p-8 border border-gold-500/30">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/20 mb-4">
                    <TrendingUp className="w-8 h-8 text-gold-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2">{estimationConfig.form.resultTitle}</h3>
                  <p className="text-white/60">{estimationConfig.form.resultSubtitle}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <div className="font-serif text-4xl lg:text-5xl text-gold-500 mb-2">
                      {estimation.prixTotal.toLocaleString()} MAD
                    </div>
                    <div className="text-white/60 text-sm">
                      Fourchette : {estimation.prixMin.toLocaleString()} - {estimation.prixMax.toLocaleString()} MAD
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Quartier</span>
                    <span className="text-white font-medium">{estimation.quartier.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Prix au m²</span>
                    <span className="text-white font-medium">{estimation.quartier.prixMoyen}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Surface</span>
                    <span className="text-white font-medium">{surface} m²</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Type</span>
                    <span className="text-white font-medium">{typeBien}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/60">Chambres</span>
                    <span className="text-white font-medium">{chambres}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-6 btn-primary rounded-lg"
                >
                  Contacter un expert
                </button>
              </div>
            ) : (
              <div className="bg-white/[0.03] rounded-xl p-8 border border-white/10 h-full flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                  <Calculator className="w-10 h-10 text-gold-500/50" />
                </div>
                <h3 className="font-serif text-xl text-white mb-3">Votre estimation</h3>
                <p className="text-white/50 max-w-sm">
                  Remplissez le formulaire pour obtenir une estimation précise de la valeur de votre bien immobilier à Rabat.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

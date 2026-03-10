import { useState, useEffect, useRef } from 'react';
import { Bell, TrendingUp, Building2, AlertTriangle, Check, Plus, X, MapPin } from 'lucide-react';
import { notificationsConfig, quartierShowcaseConfig } from '../config';

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Nouveau projet": Building2,
  "Hausse notable": TrendingUp,
  "Infrastructure": Building2,
  "Projet immobilier": Building2,
};

const importanceColors: Record<string, string> = {
  high: 'border-l-red-500 bg-red-500/5',
  medium: 'border-l-gold-500 bg-gold-500/5',
  low: 'border-l-blue-500 bg-blue-500/5',
};

export function Notifications() {
  if (!notificationsConfig.mainTitle) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [subscribedQuartiers, setSubscribedQuartiers] = useState<string[]>([]);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

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

  const toggleSubscription = (id: string) => {
    setSubscribedQuartiers((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="alertes"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#141414]"
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
          <span className="font-script text-3xl text-gold-400 block mb-2">{notificationsConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {notificationsConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{notificationsConfig.mainTitle}</h2>
          <p className="text-white/70 mt-6 max-w-2xl mx-auto">{notificationsConfig.introText}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Notifications List */}
          <div className="slide-in-left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-white">Dernières alertes</h3>
              <span className="text-white/50 text-sm">{notificationsConfig.notifications.length} nouvelles</span>
            </div>

            <div className="space-y-4">
              {notificationsConfig.notifications.map((notif) => {
                const Icon = typeIcons[notif.type] || AlertTriangle;
                return (
                  <div
                    key={notif.id}
                    className={`p-5 rounded-lg border border-white/10 border-l-4 ${importanceColors[notif.importance]} bg-white/[0.03]`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gold-500 text-xs uppercase tracking-wider">{notif.type}</span>
                          <span className="text-white/30">•</span>
                          <span className="text-white/50 text-xs">{notif.date}</span>
                        </div>
                        <h4 className="text-white font-medium mb-1">{notif.quartier}</h4>
                        <p className="text-white/60 text-sm">{notif.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="slide-in-right">
            <div className="bg-white/[0.03] rounded-xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-white">Mes alertes</h3>
                  <p className="text-white/50 text-sm">{subscribedQuartiers.length} quartier(s) suivi(s)</p>
                </div>
              </div>

              {subscribedQuartiers.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {subscribedQuartiers.map((id) => {
                    const quartier = quartierShowcaseConfig.quartiers.find((q) => q.id === id);
                    if (!quartier) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gold-500" />
                          <span className="text-white">{quartier.name}</span>
                        </div>
                        <button
                          onClick={() => toggleSubscription(id)}
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                        >
                          <X className="w-4 h-4 text-white/50" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 mb-6 bg-white/5 rounded-lg">
                  <Bell className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/50">Vous ne suivez aucun quartier</p>
                </div>
              )}

              {/* Alert Types */}
              <div className="mb-6">
                <h4 className="text-white/70 text-sm mb-3">Types d'alertes</h4>
                <div className="space-y-2">
                  {notificationsConfig.alertTypes.map((type) => (
                    <div key={type} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-gold-500 bg-gold-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-gold-500" />
                      </div>
                      <span className="text-white/70 text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => setShowSubscribeModal(true)}
                className="w-full btn-primary rounded-lg flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {notificationsConfig.ctaButtonText}
              </button>
            </div>
          </div>
        </div>

        {/* Subscribe Modal */}
        {showSubscribeModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-xl p-6 max-w-md w-full border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-white">Choisir des quartiers</h3>
                <button
                  onClick={() => setShowSubscribeModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {quartierShowcaseConfig.quartiers.map((quartier) => {
                  const isSubscribed = subscribedQuartiers.includes(quartier.id);
                  return (
                    <button
                      key={quartier.id}
                      onClick={() => toggleSubscription(quartier.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                        isSubscribed
                          ? 'border-gold-500 bg-gold-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${isSubscribed ? 'text-gold-500' : 'text-white/50'}`} />
                        <div className="text-left">
                          <span className={`block ${isSubscribed ? 'text-white' : 'text-white/70'}`}>
                            {quartier.name}
                          </span>
                          <span className="text-xs text-white/50">{quartier.prixMoyen}</span>
                        </div>
                      </div>
                      {isSubscribed && <Check className="w-5 h-5 text-gold-500" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowSubscribeModal(false)}
                className="w-full mt-6 btn-primary rounded-lg"
              >
                Terminé
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

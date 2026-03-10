// =============================================================================
// HayVision - Estimateur Immobilier Rabat
// =============================================================================
// Plateforme d'estimation de valeur immobilière des quartiers de Rabat
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "HayVision - Estimateur Immobilier Rabat",
  description: "Découvrez la valeur actuelle et future des quartiers de Rabat. Prix moyens, tendances, prédictions et comparateur de quartiers pour investisseurs et citoyens.",
  language: "fr",
  keywords: "immobilier Rabat, estimation immobilière, prix quartiers Rabat, investissement immobilier Maroc, HayVision",
  ogImage: "/images/hero-rabat.jpg",
  canonical: "https://hayvision.ma",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "HayVision",
  brandSubname: "الرؤية العقارية",
  tagline: "L'immobilier de Rabat en clair",
  navLinks: [
    { name: "Accueil", href: "#hero", icon: "Home" },
    { name: "Quartiers", href: "#quartiers", icon: "MapPin", dropdown: [
      { name: "Souissi", href: "#souissi" },
      { name: "Agdal", href: "#agdal" },
      { name: "Hassan", href: "#hassan" },
      { name: "Hay Riad", href: "#hayriad" },
    ]},
    { name: "Estimation", href: "#estimation", icon: "Calculator" },
    { name: "Tendances", href: "#tendances", icon: "TrendingUp" },
    { name: "Comparateur", href: "#comparateur", icon: "BarChart3" },
    { name: "Contact", href: "#contact", icon: "Mail" },
  ],
  ctaButtonText: "Estimer mon bien",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
  developerName?: string; // optional, your credentials
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "HayVision",
  brandSubname: "الرؤية العقارية",
  yearText: "Rabat 2026",
  developerName: "Développé par Habiba El Mahfoudi",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: "L'intelligence immobilière de Rabat",
  mainTitle: "Connaissez la valeur\nde chaque quartier",
  ctaButtonText: "Commencer l'estimation",
  ctaTarget: "#estimation",
  stats: [
    { value: 15, suffix: "+", label: "Quartiers analysés" },
    { value: 98, suffix: "%", label: "Précision des prédictions" },
    { value: 25000, suffix: "+", label: "Biens répertoriés" },
  ],
  decorativeText: "INVESTISSEZ INTELLIGEMMENT",
  backgroundImage: "/images/hero-rabat.jpg",
};

// -----------------------------------------------------------------------------
// Quartier Showcase Config (adapté de Wine Showcase)
// -----------------------------------------------------------------------------
export interface Quartier {
  id: string;
  name: string;
  subtitle: string;
  year: string;
  image: string;
  filter: string;
  glowColor: string;
  description: string;
  prixMoyen: string;
  evolution: string;
  typeBien: string;
  infrastructures: string;
  ecoles: string;
}

export interface QuartierFeature {
  icon: string;
  title: string;
  description: string;
}

export interface QuartierQuote {
  text: string;
  attribution: string;
  prefix: string;
}

export interface QuartierShowcaseConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  quartiers: Quartier[];
  features: QuartierFeature[];
  quote: QuartierQuote;
}

export const quartierShowcaseConfig: QuartierShowcaseConfig = {
  scriptText: "Les quartiers de Rabat",
  subtitle: "ANALYSE DÉTAILLÉE",
  mainTitle: "Découvrez les meilleurs\nquartiers à investir",
  quartiers: [
    {
      id: "souissi",
      name: "Souissi",
      subtitle: "Quartier résidentiel premium",
      year: "Premium",
      image: "/images/quartier-souissi.jpg",
      filter: "",
      glowColor: "bg-amber-500/20",
      description: "Souissi est le quartier résidentiel le plus prestigieux de Rabat. Avec ses villas luxueuses, ses ambassades et ses espaces verts, il représente l'excellence immobilière de la capitale.",
      prixMoyen: "18 500 MAD/m²",
      evolution: "+8.5%",
      typeBien: "Villas, Riads",
      infrastructures: "Golf Royal, Parc",
      ecoles: "Lycée Descartes, ASR"
    },
    {
      id: "agdal",
      name: "Agdal",
      subtitle: "Cœur battant de Rabat",
      year: "Très demandé",
      image: "/images/quartier-agdal.jpg",
      filter: "brightness(1.1)",
      glowColor: "bg-blue-500/20",
      description: "Agdal allie dynamisme urbain et qualité de vie. Ses avenues commerçantes, ses cafés branchés et sa proximité avec le centre-ville en font un quartier très recherché par les jeunes actifs.",
      prixMoyen: "14 200 MAD/m²",
      evolution: "+6.2%",
      typeBien: "Appartements",
      infrastructures: "Tramway, Centres commerciaux",
      ecoles: "Universités, Lycées"
    },
    {
      id: "hassan",
      name: "Hassan",
      subtitle: "Prestige historique",
      year: "Prestigieux",
      image: "/images/quartier-hassan.jpg",
      filter: "sepia(0.2)",
      glowColor: "bg-emerald-500/20",
      description: "Le quartier Hassan conjugue histoire et modernité. Autour de la Tour Hassan et du Mausolée Mohammed V, ce quartier administratif abrite des résidences de caractère et des immeubles de standing.",
      prixMoyen: "16 800 MAD/m²",
      evolution: "+5.8%",
      typeBien: "Appartements, Bureaux",
      infrastructures: "Monuments, Administrations",
      ecoles: "Écoles internationales"
    },
    {
      id: "hayriad",
      name: "Hay Riad",
      subtitle: "Familial et moderne",
      year: "Émergent",
      image: "/images/quartier-hayriad.jpg",
      filter: "brightness(1.05)",
      glowColor: "bg-purple-500/20",
      description: "Hay Riad offre un cadre de vie idéal pour les familles. Ses résidences modernes, ses parcs et ses équipements sportifs en font un quartier en plein essor avec un excellent rapport qualité-prix.",
      prixMoyen: "11 500 MAD/m²",
      evolution: "+9.1%",
      typeBien: "Appartements, Villas",
      infrastructures: "Mall, Parc, Sport",
      ecoles: "Écoles privées"
    },
    {
      id: "orangers",
      name: "Les Orangers",
      subtitle: "Vue sur l'Atlantique",
      year: "Balnéaire",
      image: "/images/quartier-orangers.jpg",
      filter: "brightness(1.15) sepia(0.1) hue-rotate(-10deg)",
      glowColor: "bg-cyan-500/20",
      description: "Les Orangers bénéficie d'une situation exceptionnelle face à l'océan. Ce quartier côtier prisé offre des vues imprenables et un cadre de vie unique à proximité des plages.",
      prixMoyen: "15 900 MAD/m²",
      evolution: "+7.3%",
      typeBien: "Appartements vue mer",
      infrastructures: "Plages, Corniche",
      ecoles: "Écoles à proximité"
    },
    {
      id: "ocean",
      name: "L'Océan",
      subtitle: "Luxe contemporain",
      year: "Haut standing",
      image: "/images/quartier-ocean.jpg",
      filter: "brightness(1.1)",
      glowColor: "bg-teal-500/20",
      description: "Le quartier de l'Océan incarne le luxe moderne à Rabat. Ses résidences d'exception, ses résidences hôtelières et sa promenade maritime en font l'adresse privilégiée d'une clientèle exigeante.",
      prixMoyen: "22 000 MAD/m²",
      evolution: "+10.2%",
      typeBien: "Appartements luxe",
      infrastructures: "Marina, Hôtels 5*",
      ecoles: "Écoles internationales"
    }
  ],
  features: [
    { icon: "MapPin", title: "15 Quartiers", description: "Analyse complète des quartiers de Rabat" },
    { icon: "TrendingUp", title: "Tendances 2025", description: "Évolution des prix en temps réel" },
    { icon: "Calculator", title: "Estimation", description: "Calculez la valeur de votre bien" },
    { icon: "Bell", title: "Alertes", description: "Soyez informé des nouveaux projets" },
  ],
  quote: {
    text: "HayVision nous a permis de trouver le quartier parfait pour notre investissement. Les données précises et les prédictions fiables ont fait toute la différence.",
    attribution: "Karim B., Investisseur",
    prefix: "Témoignage",
  },
};

// -----------------------------------------------------------------------------
// Estimation Config (nouvelle section)
// -----------------------------------------------------------------------------
export interface EstimationConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  form: {
    villeLabel: string;
    villePlaceholder: string;
    quartierLabel: string;
    quartierPlaceholder: string;
    surfaceLabel: string;
    surfacePlaceholder: string;
    typeBienLabel: string;
    typeBienOptions: string[];
    chambresLabel: string;
    chambresOptions: string[];
    submitText: string;
    resultTitle: string;
    resultSubtitle: string;
  };
}

export const estimationConfig: EstimationConfig = {
  scriptText: "Estimation gratuite",
  subtitle: "CALCULEZ LA VALEUR",
  mainTitle: "Combien vaut\nvotre bien ?",
  introText: "Renseignez les caractéristiques de votre bien et obtenez une estimation précise basée sur les données du marché immobilier rabatais.",
  form: {
    villeLabel: "Ville",
    villePlaceholder: "Rabat",
    quartierLabel: "Quartier",
    quartierPlaceholder: "Sélectionnez un quartier",
    surfaceLabel: "Surface (m²)",
    surfacePlaceholder: "Ex: 120",
    typeBienLabel: "Type de bien",
    typeBienOptions: ["Appartement", "Villa", "Riad", "Terrain", "Bureau"],
    chambresLabel: "Chambres",
    chambresOptions: ["Studio", "1", "2", "3", "4+", "5+"],
    submitText: "Estimer mon bien",
    resultTitle: "Estimation",
    resultSubtitle: "Prix estimé pour votre bien",
  },
};

// -----------------------------------------------------------------------------
// Tendances Config (adapté de Winery Carousel)
// -----------------------------------------------------------------------------
export interface TendanceSlide {
  image: string;
  title: string;
  subtitle: string;
  evolution: string;
  periode: string;
  description: string;
}

export interface TendancesConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  locationTag: string;
  slides: TendanceSlide[];
}

export const tendancesConfig: TendancesConfig = {
  scriptText: "Évolution du marché",
  subtitle: "TENDANCES & PRÉDICTIONS",
  mainTitle: "L'immobilier de Rabat\nen 5 ans",
  locationTag: "Rabat, Maroc",
  slides: [
    {
      image: "/images/analytics-bg.jpg",
      title: "Croissance 2020-2025",
      subtitle: "Évolution historique",
      evolution: "+35%",
      periode: "5 ans",
      description: "Le marché immobilier rabatais a connu une croissance constante de 35% sur 5 ans, avec une accélération notable depuis 2023."
    },
    {
      image: "/images/quartier-souissi.jpg",
      title: "Prédictions 2025-2030",
      subtitle: "Projection IA",
      evolution: "+28%",
      periode: "5 ans à venir",
      description: "Notre algorithme prévoit une croissance de 28% d'ici 2030, portée par les grands projets d'infrastructure."
    },
    {
      image: "/images/quartier-admin.jpg",
      title: "Projets en cours",
      subtitle: "Nouvelles infrastructures",
      evolution: "12",
      periode: "grands projets",
      description: "12 projets majeurs sont en cours : extension du tramway, nouveaux centres commerciaux, parcs et équipements publics."
    }
  ],
};

// -----------------------------------------------------------------------------
// Comparateur Config (adapté de Museum)
// -----------------------------------------------------------------------------
export interface ComparateurQuartier {
  id: string;
  name: string;
  prixMoyen: number;
  evolution: number;
  infrastructures: number;
  ecoles: number;
  transport: number;
  securite: number;
}

export interface ComparateurConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  quartiers: ComparateurQuartier[];
  criteres: string[];
  ctaButtonText: string;
}

export const comparateurConfig: ComparateurConfig = {
  scriptText: "Comparez les quartiers",
  subtitle: "COMPARATEUR INTELLIGENT",
  mainTitle: "Trouvez le quartier\nidéal pour vous",
  introText: "Comparez jusqu'à 3 quartiers simultanément selon vos critères : prix, infrastructures, écoles, transport et sécurité.",
  quartiers: [
    { id: "souissi", name: "Souissi", prixMoyen: 18500, evolution: 8.5, infrastructures: 95, ecoles: 90, transport: 75, securite: 98 },
    { id: "agdal", name: "Agdal", prixMoyen: 14200, evolution: 6.2, infrastructures: 90, ecoles: 85, transport: 95, securite: 88 },
    { id: "hassan", name: "Hassan", prixMoyen: 16800, evolution: 5.8, infrastructures: 85, ecoles: 80, transport: 90, securite: 92 },
    { id: "hayriad", name: "Hay Riad", prixMoyen: 11500, evolution: 9.1, infrastructures: 80, ecoles: 85, transport: 75, securite: 85 },
    { id: "orangers", name: "Les Orangers", prixMoyen: 15900, evolution: 7.3, infrastructures: 85, ecoles: 75, transport: 80, securite: 90 },
    { id: "ocean", name: "L'Océan", prixMoyen: 22000, evolution: 10.2, infrastructures: 95, ecoles: 80, transport: 85, securite: 95 },
  ],
  criteres: ["Prix au m²", "Évolution", "Infrastructures", "Écoles", "Transport", "Sécurité"],
  ctaButtonText: "Lancer la comparaison",
};

// -----------------------------------------------------------------------------
// Notifications Config (nouvelle section)
// -----------------------------------------------------------------------------
export interface Notification {
  id: string;
  quartier: string;
  type: string;
  message: string;
  date: string;
  importance: "high" | "medium" | "low";
}

export interface NotificationsConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  notifications: Notification[];
  alertTypes: string[];
  ctaButtonText: string;
}

export const notificationsConfig: NotificationsConfig = {
  scriptText: "Restez informé",
  subtitle: "ALERTES & NOTIFICATIONS",
  mainTitle: "Ne manquez aucune\nopportunité",
  introText: "Configurez vos alertes personnalisées et recevez des notifications en temps réel sur les projets, les hausses de prix et les nouvelles opportunités dans vos quartiers favoris.",
  notifications: [
    { id: "1", quartier: "Hay Riad", type: "Nouveau projet", message: "Construction d'un nouveau centre commercial de 15 000 m²", date: "Il y a 2 jours", importance: "high" },
    { id: "2", quartier: "Agdal", type: "Hausse notable", message: "+12% sur les appartements T3 en 3 mois", date: "Il y a 5 jours", importance: "high" },
    { id: "3", quartier: "Souissi", type: "Infrastructure", message: "Nouvelle ligne de tramway prévue pour 2026", date: "Il y a 1 semaine", importance: "medium" },
    { id: "4", quartier: "L'Océan", type: "Projet immobilier", message: "Résidence de luxe avec vue sur mer en pré-lancement", date: "Il y a 3 jours", importance: "medium" },
  ],
  alertTypes: ["Nouveaux projets", "Hausses de prix", "Nouvelles infrastructures", "Opportunités d'investissement"],
  ctaButtonText: "Configurer mes alertes",
};

// -----------------------------------------------------------------------------
// News & Testimonials Config
// -----------------------------------------------------------------------------
export interface NewsArticle {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface StoryQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface StoryTimelineItem {
  value: string;
  label: string;
}

export interface NewsConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  viewAllText: string;
  readMoreText: string;
  articles: NewsArticle[];
  testimonialsScriptText: string;
  testimonialsSubtitle: string;
  testimonialsMainTitle: string;
  testimonials: Testimonial[];
  storyScriptText: string;
  storySubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyTimeline: StoryTimelineItem[];
  storyQuote: StoryQuote;
  storyImage: string;
  storyImageCaption: string;
}

export const newsConfig: NewsConfig = {
  scriptText: "Actualités immobilières",
  subtitle: "NEWS & ANALYSES",
  mainTitle: "L'actualité du marché\nimmobilier rabatais",
  viewAllText: "Voir tous les articles",
  readMoreText: "Lire la suite",
  articles: [
    {
      id: 1,
      image: "/images/quartier-hayriad.jpg",
      title: "Hay Riad : le quartier émergent de Rabat",
      excerpt: "Avec une croissance de 9.1% cette année, Hay Riad s'impose comme le quartier le plus dynamique de la capitale.",
      date: "10 Mars 2026",
      category: "Tendances"
    },
    {
      id: 2,
      image: "/images/quartier-ocean.jpg",
      title: "L'Océan : le luxe à prix d'or",
      excerpt: "Les prix atteignent des records avec 22 000 MAD/m². Analyse d'un marché de plus en plus exclusif.",
      date: "8 Mars 2026",
      category: "Analyse"
    },
    {
      id: 3,
      image: "/images/analytics-bg.jpg",
      title: "Prédictions 2025-2030 : vers où va Rabat ?",
      excerpt: "Notre étude basée sur l'IA révèle les quartiers les plus prometteurs pour les 5 années à venir.",
      date: "5 Mars 2026",
      category: "Prédictions"
    },
    {
      id: 4,
      image: "/images/quartier-admin.jpg",
      title: "Nouveau plan d'aménagement : ce qui change",
      excerpt: "La mairie de Rabat dévoile son plan d'urbanisme 2025-2030 avec 12 grands projets d'infrastructure.",
      date: "1 Mars 2026",
      category: "Urbanisme"
    }
  ],
  testimonialsScriptText: "Ils nous font confiance",
  testimonialsSubtitle: "TÉMOIGNAGES",
  testimonialsMainTitle: "Ce que disent\n nos utilisateurs",
  testimonials: [
    {
      name: "Fatima A.",
      role: "Propriétaire",
      text: "HayVision m'a aidée à vendre mon appartement au meilleur prix. L'estimation était précise et j'ai pu négocier sereinement.",
      rating: 5
    },
    {
      name: "Youssef M.",
      role: "Investisseur",
      text: "Les alertes m'ont permis d'anticiper la hausse à Hay Riad. J'ai acheté avant que les prix n'explosent. Merci HayVision !",
      rating: 5
    },
    {
      name: "Sophie L.",
      role: "Expatriée",
      text: "Parfaite pour découvrir Rabat à distance. J'ai pu comparer les quartiers et choisir le meilleur pour ma famille.",
      rating: 5
    }
  ],
  storyScriptText: "Notre histoire",
  storySubtitle: "À PROPOS",
  storyTitle: "Pourquoi HayVision ?",
  storyParagraphs: [
    "HayVision est né d'un constat simple : l'information immobilière à Rabat était fragmentée et peu transparente. Les investisseurs et les citoyens manquaient d'outils fiables pour évaluer la valeur des quartiers.",
    "Notre équipe d'experts en data science et en immobilier a développé des algorithmes de pointe qui analysent des milliers de données pour vous offrir des estimations précises et des prédictions fiables."
  ],
  storyTimeline: [
    { value: "2023", label: "Création" },
    { value: "15+", label: "Quartiers" },
    { value: "25K+", label: "Biens" },
    { value: "98%", label: "Précision" }
  ],
  storyQuote: {
    prefix: "Notre mission",
    text: "Rendre l'immobilier transparent et accessible à tous les investisseurs et citoyens de Rabat.",
    attribution: "L'équipe HayVision"
  },
  storyImage: "/images/famille-visite.jpg",
  storyImageCaption: "Une famille trouve son bien idéal grâce à HayVision"
};

// -----------------------------------------------------------------------------
// Contact Form Config
// -----------------------------------------------------------------------------
export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  subtext: string;
}

export interface ContactFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  visitDateLabel: string;
  visitorsLabel: string;
  visitorsOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactFormConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  contactInfoTitle: string;
  contactInfo: ContactInfoItem[];
  form: ContactFormFields;
  privacyNotice: string;
  formEndpoint: string;
}

export const contactFormConfig: ContactFormConfig = {
  scriptText: "Contactez-nous",
  subtitle: "BESOIN D'AIDE ?",
  mainTitle: "Discutons de\nvotre projet",
  introText: "Notre équipe d'experts est à votre disposition pour vous accompagner dans votre recherche immobilière à Rabat.",
  contactInfoTitle: "Nos coordonnées",
  contactInfo: [
    { icon: "MapPin", label: "Adresse", value: "Avenue Mohammed VI, Rabat", subtext: "Maroc" },
    { icon: "Phone", label: "Téléphone", value: "+212 5 37 00 00 00", subtext: "Lun-Ven, 9h-18h" },
    { icon: "Mail", label: "Email", value: "contact@hayvision.ma", subtext: "Réponse sous 24h" },
    { icon: "Clock", label: "Horaires", value: "Lundi - Vendredi", subtext: "9:00 - 18:00" },
  ],
  form: {
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom",
    emailLabel: "Email",
    emailPlaceholder: "votre@email.com",
    phoneLabel: "Téléphone",
    phonePlaceholder: "+212 6 XX XX XX XX",
    visitDateLabel: "Date de rendez-vous",
    visitorsLabel: "Type de projet",
    visitorsOptions: ["Achat résidentiel", "Investissement", "Vente", "Location", "Estimation", "Autre"],
    messageLabel: "Message",
    messagePlaceholder: "Décrivez votre projet immobilier...",
    submitText: "Envoyer ma demande",
    submittingText: "Envoi en cours...",
    successMessage: "Merci ! Nous vous contacterons sous 24h.",
    errorMessage: "Une erreur est survenue. Veuillez réessayer.",
  },
  privacyNotice: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité.",
  formEndpoint: "https://formspree.io/f/YOUR_REAL_ID",
};

// -----------------------------------------------------------------------------
// Footer Config
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  icon: string;
  text: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  contactItems: FooterContactItem[];
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  newsletterErrorText: string;
  newsletterEndpoint: string;
  copyrightText: string;
  legalLinks: string[];
  icpText: string;
  backToTopText: string;
  ageVerificationText: string;
}

export const footerConfig: FooterConfig = {
  brandName: "HayVision",
  tagline: "الرؤية العقارية",
  description: "HayVision est la plateforme de référence pour l'estimation immobilière à Rabat. Prix, tendances, prédictions et comparateur pour investisseurs et citoyens.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "#" },
    { icon: "Facebook", label: "Facebook", href: "#" },
    { icon: "Twitter", label: "Twitter", href: "#" },
    { icon: "Linkedin", label: "LinkedIn", href: "#" },
  ],
  linkGroups: [
    {
      title: "Services",
      links: [
        { name: "Estimation", href: "#estimation" },
        { name: "Comparateur", href: "#comparateur" },
        { name: "Alertes", href: "#alertes" },
        { name: "Rapports", href: "#rapports" },
      ]
    },
    {
      title: "Quartiers",
      links: [
        { name: "Souissi", href: "#souissi" },
        { name: "Agdal", href: "#agdal" },
        { name: "Hassan", href: "#hassan" },
        { name: "Hay Riad", href: "#hayriad" },
      ]
    }
  ],
  contactItems: [
    { icon: "MapPin", text: "Avenue Mohammed VI, Rabat" },
    { icon: "Phone", text: "+212 5 00 00 00 00" },
    { icon: "Mail", text: "contact@hayvision.ma" },
  ],
  newsletterLabel: "Recevez nos analyses mensuelles",
  newsletterPlaceholder: "Votre email",
  newsletterButtonText: "S'inscrire",
  newsletterSuccessText: "Inscription réussie !",
  newsletterErrorText: "Erreur lors de l'inscription.",
  newsletterEndpoint: "https://form.jotform.com/260685538432059",
  copyrightText: "HayVision © 2026 Plateforme développée par Habiba El Mahfoudi",
  legalLinks: ["Politique de confidentialité", "Conditions d'utilisation", "Mentions légales"],
  icpText: "Données issues d'analyses de marché marocain et de sources publiques.",
  backToTopText: "Haut de page",
  ageVerificationText: "",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Retour en haut",
};

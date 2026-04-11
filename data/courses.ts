// On définit la structure exacte d'un cours pour que TypeScript nous aide
export interface CourseData {
  id: string;
  title: string;
  category: "Ethos" | "Pathos" | "Logos";
  videoUrl: string;
  content: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

// Notre base de données de cours
export const coursesDatabase: CourseData[] = [
  {
    id: "1",
    title: "L'art de l'Exorde",
    category: "Ethos",
    videoUrl: "#",
    content: "L'exorde est la toute première partie de votre discours. Les 30 premières secondes déterminent si l'auditoire va vous écouter ou non. Il faut capter l'attention (ce qu'on appelle la 'captatio benevolentiae') tout en posant sa crédibilité. Ne commencez jamais par vous excuser, commencez par une accroche forte.",
    question: "Quel est l'objectif principal de l'exorde ?",
    options: [
      { id: "A", text: "Résumer tout le discours d'un coup.", isCorrect: false },
      { id: "B", text: "S'excuser d'être un peu stressé.", isCorrect: false },
      { id: "C", text: "Capter l'attention et se rendre sympathique.", isCorrect: true },
    ],
    explanation: "Excellent ! L'exorde sert à accrocher l'oreille et à instaurer un climat de confiance avec le public. L'orateur doit y prouver sa légitimité."
  },
  {
    id: "2",
    title: "La posture de l'Orateur",
    category: "Ethos",
    videoUrl: "#",
    content: "Avant même que vous ne prononciez un mot, votre corps parle pour vous. Un bon orateur doit être ancré au sol (pieds écartés à la largeur du bassin), avoir les mains ouvertes (signe de sincérité) et surtout, maintenir un contact visuel avec l'ensemble de son auditoire pour que chacun se sente concerné.",
    question: "Que doit faire le regard d'un bon orateur ?",
    options: [
      { id: "A", text: "Fixer un point au fond de la salle pour ne pas stresser.", isCorrect: false },
      { id: "B", text: "Balayer l'auditoire pour inclure tout le monde.", isCorrect: true },
      { id: "C", text: "Regarder ses notes 80% du temps pour ne rien oublier.", isCorrect: false },
    ],
    explanation: "Parfait ! Le regard est le fil invisible qui vous relie à votre public. Fixer le vide ou vos fiches rompt ce lien de confiance."
  },
  {
    id: "4", // Note: On saute au 4 pour correspondre à ton arbre de parcours (Chapitre 2)
    title: "Maîtriser l'Anaphore",
    category: "Pathos",
    videoUrl: "#",
    content: "L'anaphore consiste à commencer plusieurs phrases, vers ou membres de phrase par le même mot. Elle crée un effet de martèlement, d'insistance et rythme le discours pour emporter l'émotion de l'auditoire. C'est l'une des figures de style les plus puissantes en politique.",
    question: "Identifiez l'anaphore parmi ces citations célèbres :",
    options: [
      { id: "A", text: "Je suis venu, j'ai vu, j'ai vaincu.", isCorrect: false },
      { id: "B", text: "Moi président de la République, je ne serai pas le chef de la majorité. Moi président de la République...", isCorrect: true },
      { id: "C", text: "Un petit pas pour l'homme, un bond de géant pour l'humanité.", isCorrect: false },
    ],
    explanation: "C'est ça ! La répétition de 'Moi président de la République' par François Hollande en 2012 est un cas d'école parfait de l'anaphore."
  },
  {
    id: "6", // Correspond au premier cours du Chapitre 3 dans ton parcours
    title: "Le Syllogisme parfait",
    category: "Logos",
    videoUrl: "#",
    content: "Le syllogisme est un raisonnement logique implacable à trois temps. Il est composé de deux prémisses (la majeure et la mineure) qui, si elles sont vraies, mènent obligatoirement à une conclusion irréfutable. Le plus célèbre est celui d'Aristote sur Socrate.",
    question: "Quelle est la conclusion logique de ces deux prémisses : 'Tous les hommes sont mortels. Or, Socrate est un homme.' ?",
    options: [
      { id: "A", text: "Donc, Socrate est un philosophe.", isCorrect: false },
      { id: "B", text: "Donc, Socrate est mortel.", isCorrect: true },
      { id: "C", text: "Donc, les hommes sont Socrate.", isCorrect: false },
    ],
    explanation: "Exactement ! La logique est fermée et indiscutable. C'est l'arme absolue du pilier 'Logos'."
  }
];
// On définit la structure exacte d'une question
export interface QuestionData {
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

// On met à jour la structure du cours pour accepter un tableau de questions
export interface CourseData {
  id: string;
  title: string;
  category: "Ethos" | "Pathos" | "Logos";
  videoUrl: string;
  content: string;
  questions: QuestionData[];
}

// Notre base de données de cours
export const coursesDatabase: CourseData[] = [
  {
    id: "1",
    title: "L'art de l'Exorde",
    category: "Ethos",
    // 💡 Mise à jour du lien Cloudinary ici
    videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dz8g1qhyj&public_id=Les_30_secondes_de%CC%81cisives_1_m4wvqx",
    content: "L'exorde est la toute première partie de votre discours. Les 30 premières secondes déterminent si l'auditoire va vous écouter ou non. Il faut capter l'attention (ce qu'on appelle la 'captatio benevolentiae') tout en posant sa crédibilité. Ne commencez jamais par vous excuser, commencez par une accroche forte.",
    questions: [
      {
        question: "Quel est l'objectif principal de l'exorde ?",
        options: [
          { id: "A", text: "Résumer tout le discours d'un coup.", isCorrect: false },
          { id: "B", text: "S'excuser d'être un peu stressé.", isCorrect: false },
          { id: "C", text: "Capter l'attention et se rendre sympathique.", isCorrect: true },
        ],
        explanation: "Excellent ! L'exorde sert à accrocher l'oreille et à instaurer un climat de confiance avec le public."
      },
      {
        question: "Comment appelle-t-on la technique consistant à s'attirer la bienveillance du public ?",
        options: [
          { id: "A", text: "La captatio benevolentiae", isCorrect: true },
          { id: "B", text: "Le syllogisme oratoire", isCorrect: false },
          { id: "C", text: "La prosodie", isCorrect: false },
        ],
        explanation: "C'est exact ! La 'captatio benevolentiae' (capter la bienveillance) est le but premier de vos 30 premières secondes."
      },
      {
        question: "Quelle erreur fatale faut-il absolument éviter en commençant ?",
        options: [
          { id: "A", text: "Faire un silence avant de parler.", isCorrect: false },
          { id: "B", text: "Commencer par s'excuser (stress, manque de préparation...).", isCorrect: true },
          { id: "C", text: "Regarder le public dans les yeux.", isCorrect: false },
        ],
        explanation: "Parfait ! S'excuser détruit immédiatement votre Ethos (crédibilité). Un leader assume sa présence sur scène."
      }
    ]
  },
  {
    id: "2",
    title: "La posture de l'Orateur",
    category: "Ethos",
    videoUrl: "#",
    content: "Avant même que vous ne prononciez un mot, votre corps parle pour vous. Un bon orateur doit être ancré au sol (pieds écartés à la largeur du bassin), avoir les mains ouvertes (signe de sincérité) et surtout, maintenir un contact visuel avec l'ensemble de son auditoire pour que chacun se sente concerné.",
    questions: [
      {
        question: "Que doit faire le regard d'un bon orateur ?",
        options: [
          { id: "A", text: "Fixer un point au fond de la salle pour ne pas stresser.", isCorrect: false },
          { id: "B", text: "Balayer l'auditoire pour inclure tout le monde.", isCorrect: true },
          { id: "C", text: "Regarder ses notes 80% du temps pour ne rien oublier.", isCorrect: false },
        ],
        explanation: "Parfait ! Le regard est le fil invisible qui vous relie à votre public. Fixer le vide rompt ce lien."
      },
      {
        question: "Comment un orateur doit-il positionner ses pieds pour projeter de l'assurance ?",
        options: [
          { id: "A", text: "Croisés l'un sur l'autre.", isCorrect: false },
          { id: "B", text: "Joints et serrés.", isCorrect: false },
          { id: "C", text: "Écartés à la largeur du bassin, bien ancrés.", isCorrect: true },
        ],
        explanation: "Exact ! Cet 'ancrage' physique calme votre stress et montre au public que vous êtes inébranlable."
      },
      {
        question: "Que symbolise le fait de parler avec les mains ouvertes ?",
        options: [
          { id: "A", text: "La sincérité et la transparence.", isCorrect: true },
          { id: "B", text: "Un manque de préparation.", isCorrect: false },
          { id: "C", text: "Une posture défensive.", isCorrect: false },
        ],
        explanation: "C'est ça ! Montrer l'intérieur de ses mains est un signe ancestral prouvant que vous ne cachez rien."
      }
    ]
  },
  {
    id: "4",
    title: "Maîtriser l'Anaphore",
    category: "Pathos",
    videoUrl: "#",
    content: "L'anaphore consiste à commencer plusieurs phrases, vers ou membres de phrase par le même mot. Elle crée un effet de martèlement, d'insistance et rythme le discours pour emporter l'émotion de l'auditoire. C'est l'une des figures de style les plus puissantes en politique.",
    questions: [
      {
        question: "Identifiez l'anaphore parmi ces citations célèbres :",
        options: [
          { id: "A", text: "Je suis venu, j'ai vu, j'ai vaincu.", isCorrect: false },
          { id: "B", text: "Moi président de la République, je ne serai pas... Moi président de la République...", isCorrect: true },
          { id: "C", text: "Un petit pas pour l'homme, un bond de géant pour l'humanité.", isCorrect: false },
        ],
        explanation: "C'est ça ! La répétition de 'Moi président de la République' par François Hollande est un cas d'école parfait de l'anaphore."
      },
      {
        question: "Quelle est la définition exacte de l'anaphore ?",
        options: [
          { id: "A", text: "Commencer plusieurs phrases de suite par le même mot.", isCorrect: true },
          { id: "B", text: "Exagérer une situation pour faire rire.", isCorrect: false },
          { id: "C", text: "Terminer toutes ses phrases par la même rime.", isCorrect: false },
        ],
        explanation: "Exactement ! Répéter au début de la phrase est ce qui crée ce fameux rythme si particulier."
      },
      {
        question: "Quel est l'effet principal recherché en utilisant une anaphore ?",
        options: [
          { id: "A", text: "Démontrer une logique mathématique.", isCorrect: false },
          { id: "B", text: "Créer un effet de martèlement et d'insistance.", isCorrect: true },
          { id: "C", text: "Aider l'orateur à ne pas perdre le fil.", isCorrect: false },
        ],
        explanation: "Parfait ! L'anaphore touche le 'Pathos' : elle donne l'impression d'une urgence ou d'une puissance irrésistible."
      }
    ]
  },
  {
    id: "6",
    title: "Le Syllogisme parfait",
    category: "Logos",
    videoUrl: "#",
    content: "Le syllogisme est un raisonnement logique implacable à trois temps. Il est composé de deux prémisses (la majeure et la mineure) qui, si elles sont vraies, mènent obligatoirement à une conclusion irréfutable. Le plus célèbre est celui d'Aristote sur Socrate.",
    questions: [
      {
        question: "Quelle est la conclusion logique de ces deux prémisses : 'Tous les hommes sont mortels. Or, Socrate est un homme.' ?",
        options: [
          { id: "A", text: "Donc, Socrate est un philosophe.", isCorrect: false },
          { id: "B", text: "Donc, Socrate est mortel.", isCorrect: true },
          { id: "C", text: "Donc, les hommes sont Socrate.", isCorrect: false },
        ],
        explanation: "Exactement ! La logique est fermée et indiscutable. C'est l'arme absolue du pilier 'Logos'."
      },
      {
        question: "De combien d'étapes est composé un syllogisme ?",
        options: [
          { id: "A", text: "Deux (une prémisse et une conclusion).", isCorrect: false },
          { id: "B", text: "Trois (la majeure, la mineure et la conclusion).", isCorrect: true },
          { id: "C", text: "Quatre (l'introduction, la thèse, l'antithèse, la synthèse).", isCorrect: false },
        ],
        explanation: "C'est exact ! Un syllogisme repose sur un rythme en 3 temps, comme un piège qui se referme."
      },
      {
        question: "Si mon adversaire utilise un syllogisme parfait, comment puis-je le contrer ?",
        options: [
          { id: "A", text: "En attaquant sa conclusion.", isCorrect: false },
          { id: "B", text: "En prouvant que l'une de ses prémisses de départ est fausse.", isCorrect: true },
          { id: "C", text: "En parlant plus fort que lui.", isCorrect: false },
        ],
        explanation: "Très bien vu ! Si le raisonnement (Logos) est parfait, la seule faille possible est que l'affirmation de départ soit mensongère."
      }
    ]
  }
];
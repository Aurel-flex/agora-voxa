"use client"; 

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Check, Lock, Play, HelpCircle, Crown } from "lucide-react"; // 👈 Ajout de Crown

// 💡 1. NOUVEAU : On simule l'état Premium (à relier à ton futur système de paiement)
const IS_USER_PREMIUM = false; 

const CURRICULUM = [
  {
    chapterId: 1, 
    title: "Chapitre 1 : Les fondations", 
    description: "Asseoir ta crédibilité.", 
    isPremium: false,
    lessons: [
      { id: "1", title: "L'art de l'Exorde", type: "VIDEO" },
      { id: "2", title: "La posture de l'Orateur", type: "QUIZ" },
    ]
  },
  {
    chapterId: 2, 
    title: "Chapitre 2 : L'arme du Pathos", 
    description: "Touche le cœur de ton auditoire.", 
    isPremium: false,
    lessons: [
      { id: "4", title: "Maîtriser l'Anaphore", type: "VIDEO" },
      { id: "5", title: "Le Storytelling", type: "QUIZ" },
    ]
  },
  // 💡 2. NOUVEAU : Le chapitre Premium
  {
    chapterId: 3, 
    title: "Chapitre 3 : La Voix du Leader", 
    description: "Analyse IA de ta prosodie et de tes silences.", 
    isPremium: true, // Ce flag va déclencher le design spécial
    lessons: [
      { id: "6", title: "Le Silence Oratoire", type: "VIDEO" },
      { id: "7", title: "Épreuve du Studio", type: "QUIZ" },
    ]
  }
];

export default function ParcoursPage() {
  const { completedCourses } = useUser();
  const allLessonIds = CURRICULUM.flatMap(c => c.lessons.map(l => l.id));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 animate-fade-in pb-24">
      
      {/* En-tête global */}
      <div className="text-center mb-16">
        <h1 className="font-baloo text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Ton <span className="text-primary">Parcours.</span>
        </h1>
        <p className="font-soleil text-lg text-slate-400">
          Complète un module pour débloquer le suivant.
        </p>
      </div>

      <div className="space-y-20">
        {CURRICULUM.map((chapter) => (
          <div key={chapter.chapterId} className="relative flex flex-col items-center">
            
            {/* 💡 3. NOUVEAU : Badge Premium sur le chapitre */}
            {chapter.isPremium && (
              <div className="absolute -top-4 bg-[#662483] text-white text-xs font-baloo font-bold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-[#662483]/30 z-20">
                <Crown className="w-4 h-4 text-[#d08df5]" /> 
                EXCLUSIVITÉ AGORA PREMIUM
              </div>
            )}

            {/* Bannière du Chapitre */}
            <div className={`w-full bg-[#1E293B] border rounded-3xl p-6 md:p-8 text-center relative z-10 mb-12 shadow-lg ${chapter.isPremium ? 'border-[#662483]/50 shadow-[#662483]/10' : 'border-slate-700/50 shadow-indigo-900/10'}`}>
              <h2 className={`font-baloo text-2xl font-bold ${chapter.isPremium ? 'text-[#d08df5]' : 'text-white'}`}>
                {chapter.title}
              </h2>
              <p className="font-soleil text-slate-400 mt-2 font-medium">{chapter.description}</p>
            </div>

            {/* Arborescence (Nœuds + Ligne verticale) */}
            <div className="relative flex flex-col items-center gap-12 w-full">
              
              {/* Ligne verticale de fond */}
              <div className={`absolute top-0 bottom-0 w-3 rounded-full left-1/2 -translate-x-1/2 z-0 border ${chapter.isPremium ? 'bg-[#1a1525] border-[#662483]/20' : 'bg-[#0F172A] border-slate-800/50'}`}></div>

              {chapter.lessons.map((lesson) => {
                
                const isCompleted = completedCourses.includes(lesson.id);
                const lessonIndex = allLessonIds.indexOf(lesson.id);
                const previousLessonId = lessonIndex > 0 ? allLessonIds[lessonIndex - 1] : null;
                const isPreviousCompleted = previousLessonId ? completedCourses.includes(previousLessonId) : true;
                
                // 💡 4. NOUVEAU : Logique de blocage Premium
                const requiresPremiumUpgrade = chapter.isPremium && !IS_USER_PREMIUM;
                
                // La leçon est bloquée soit parce qu'on n'est pas arrivé là, soit parce qu'il faut payer
                const isLocked = (!isCompleted && !isPreviousCompleted) || requiresPremiumUpgrade;
                const isActive = !isCompleted && isPreviousCompleted && !requiresPremiumUpgrade;

                // Stylisation conditionnelle
                let nodeStyle = "";
                if (isCompleted) {
                  nodeStyle = "bg-primary text-white border-primary hover:scale-105 shadow-lg shadow-primary/40";
                } else if (isActive) {
                  nodeStyle = "bg-[#1E293B] text-primary border-primary border-[5px] scale-110 animate-pulse-slow shadow-xl shadow-primary/20";
                } else if (requiresPremiumUpgrade) {
                  // Style exclusif pour les nœuds premium verrouillés
                  nodeStyle = "bg-[#1a1525] text-[#d08df5] border-[#662483] border-[3px] opacity-90 hover:scale-105 hover:bg-[#2d1b38] transition-all shadow-lg shadow-[#662483]/20";
                } else {
                  nodeStyle = "bg-[#0F172A] text-slate-600 border-slate-800 opacity-80 cursor-not-allowed";
                }

                return (
                  <div key={lesson.id} className="relative z-10 flex flex-col items-center group">
                    
                    {/* Le Bouton (Rond central) */}
                    <Link 
                      // 💡 5. NOUVEAU : Si on clique sur un cours premium bloqué, on renvoie vers la page Tarifs !
                      href={requiresPremiumUpgrade ? "/tarifs" : isLocked ? "#" : `/dashboard/cours/${lesson.id}`}
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${nodeStyle}`}
                    >
                      {isCompleted ? (
                        <Check className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                      ) : requiresPremiumUpgrade ? (
                        <Crown className="w-8 h-8 md:w-10 md:h-10 mb-0.5" /> // Affiche une couronne au lieu d'un cadenas normal
                      ) : isLocked ? (
                        <Lock className="w-8 h-8 md:w-10 md:h-10" />
                      ) : lesson.type === "VIDEO" ? (
                        <Play className="w-10 h-10 md:w-12 md:h-12 ml-2" fill="currentColor" />
                      ) : (
                        <HelpCircle className="w-10 h-10 md:w-12 md:h-12" />
                      )}
                    </Link>

                    {/* Le Titre sous le rond */}
                    <div className="mt-4 text-center px-4">
                      <h3 className={`font-baloo font-bold text-xl md:text-2xl transition-colors ${isCurrentStatus(isLocked, isActive, requiresPremiumUpgrade)}`}>
                        {lesson.title}
                      </h3>
                      <p className={`font-soleil text-sm font-medium mt-1 uppercase tracking-wider ${requiresPremiumUpgrade ? "text-[#d08df5]" : isLocked ? "text-slate-600" : "text-primary/80"}`}>
                        {requiresPremiumUpgrade ? "Réservé Premium" : lesson.type === "VIDEO" ? "Leçon Vidéo" : "Quiz"}
                      </p>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Petite fonction utilitaire mise à jour
function isCurrentStatus(isLocked: boolean, isActive: boolean, requiresPremiumUpgrade: boolean) {
  if (requiresPremiumUpgrade) return "text-[#d08df5]"; // Violet pour le titre premium
  if (isLocked) return "text-slate-600";
  if (isActive) return "text-white";
  return "text-slate-300"; // Complété
}
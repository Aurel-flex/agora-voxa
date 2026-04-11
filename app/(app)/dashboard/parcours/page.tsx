"use client"; // Obligatoire car on lit la mémoire utilisateur

import Link from "next/link";
import { useUser } from "@/context/UserContext";
// On importe de belles icônes modernes pour remplacer les emojis
import { Check, Lock, Play, HelpCircle } from "lucide-react"; 

const CURRICULUM = [
  {
    chapterId: 1, 
    title: "Chapitre 1 : Les fondations", 
    description: "Asseoir ta crédibilité.", // 👈 Passage au tutoiement
    lessons: [
      { id: "1", title: "L'art de l'Exorde", type: "VIDEO" },
      { id: "2", title: "La posture de l'Orateur", type: "QUIZ" },
    ]
  },
  {
    chapterId: 2, 
    title: "Chapitre 2 : L'arme du Pathos", 
    description: "Touche le cœur de ton auditoire.", // 👈 Passage au tutoiement
    lessons: [
      { id: "4", title: "Maîtriser l'Anaphore", type: "VIDEO" },
      { id: "5", title: "Le Storytelling", type: "QUIZ" },
    ]
  }
];

export default function ParcoursPage() {
  const { completedCourses } = useUser();
  const allLessonIds = CURRICULUM.flatMap(c => c.lessons.map(l => l.id));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      
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
            
            {/* Bannière du Chapitre (Dark Mode) */}
            <div className="w-full bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 md:p-8 text-center relative z-10 mb-12 shadow-lg shadow-indigo-900/10">
              <h2 className="font-baloo text-2xl font-bold text-white">{chapter.title}</h2>
              <p className="font-soleil text-slate-400 mt-2 font-medium">{chapter.description}</p>
            </div>

            {/* Arborescence (Nœuds + Ligne verticale) */}
            <div className="relative flex flex-col items-center gap-12 w-full">
              
              {/* Ligne verticale de fond (Grise) */}
              <div className="absolute top-0 bottom-0 w-3 bg-[#0F172A] rounded-full left-1/2 -translate-x-1/2 z-0 border border-slate-800/50"></div>

              {chapter.lessons.map((lesson) => {
                
                // Ta logique dynamique (inchangée, elle est parfaite)
                const isCompleted = completedCourses.includes(lesson.id);
                const lessonIndex = allLessonIds.indexOf(lesson.id);
                const previousLessonId = lessonIndex > 0 ? allLessonIds[lessonIndex - 1] : null;
                const isPreviousCompleted = previousLessonId ? completedCourses.includes(previousLessonId) : true;
                
                const isActive = !isCompleted && isPreviousCompleted;
                const isLocked = !isCompleted && !isPreviousCompleted;

                // Stylisation conditionnelle ultra-premium
                const nodeStyle = isCompleted 
                  ? "bg-primary text-white border-primary hover:scale-105 shadow-lg shadow-primary/40" 
                  : isActive 
                  ? "bg-[#1E293B] text-primary border-primary border-[5px] scale-110 animate-pulse-slow shadow-xl shadow-primary/20" 
                  : "bg-[#0F172A] text-slate-600 border-slate-800 opacity-80 cursor-not-allowed";

                return (
                  <div key={lesson.id} className="relative z-10 flex flex-col items-center group">
                    
                    {/* Le Bouton (Rond central) */}
                    <Link 
                      href={isLocked ? "#" : `/dashboard/cours/${lesson.id}`}
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${nodeStyle}`}
                    >
                      {/* Icônes dynamiques Lucide React */}
                      {isCompleted ? (
                        <Check className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
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
                      <h3 className={`font-baloo font-bold text-xl md:text-2xl transition-colors ${isCurrentStatus(isLocked, isActive)}`}>
                        {lesson.title}
                      </h3>
                      <p className={`font-soleil text-sm font-medium mt-1 uppercase tracking-wider ${isLocked ? "text-slate-600" : "text-primary/80"}`}>
                        {lesson.type === "VIDEO" ? "Leçon Vidéo" : "Quiz"}
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

// Petite fonction utilitaire pour gérer la couleur du texte du titre
function isCurrentStatus(isLocked: boolean, isActive: boolean) {
  if (isLocked) return "text-slate-600";
  if (isActive) return "text-white";
  return "text-slate-300"; // Complété
}
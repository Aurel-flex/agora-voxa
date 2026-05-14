"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { coursesDatabase } from "@/data/courses";
import { useUser } from "@/context/UserContext";
import { X, PlayCircle, FileText, CheckCircle, RefreshCcw, ArrowRight } from "lucide-react";

export default function CoursPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;
  
  const { markCourseCompleted, addXp, completedCourses } = useUser();
  const isAlreadyCompleted = completedCourses.includes(courseId);

  const LESSON_DATA = coursesDatabase.find(cours => cours.id === courseId);

  const [step, setStep] = useState<"THEORY" | "QUIZ">("THEORY");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!LESSON_DATA) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1120] text-white">
        <div className="text-6xl mb-4">🦉</div>
        <h1 className="font-baloo text-2xl font-bold mb-4">Ce cours n'existe pas encore !</h1>
        <Link href="/dashboard/parcours" className="font-soleil text-primary font-bold hover:underline">
          Retourner au parcours
        </Link>
      </div>
    );
  }

  const currentQuestion = LESSON_DATA.questions[currentQIndex];
  const isLastQuestion = currentQIndex === LESSON_DATA.questions.length - 1;
  const isCorrect = currentQuestion.options.find(o => o.id === selectedOption)?.isCorrect;

  const handleValidate = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
  };

  const handleNextOrFinish = () => {
    if (!isLastQuestion) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      if (!isAlreadyCompleted) {
        markCourseCompleted(courseId);
        addXp(15); 
      }
      router.push("/dashboard/parcours");
    }
  };

  const progressPercentage = step === "THEORY" 
    ? "20%" 
    : `${20 + (80 * (currentQIndex + 1) / LESSON_DATA.questions.length)}%`;

  return (
    <div className="min-h-screen bg-[#0B1120] pb-20 font-soleil text-white">
      
      <header className="bg-[#0F172A] border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/parcours" className="text-slate-400 hover:text-white font-medium flex items-center gap-2 transition-colors">
            <X className="w-5 h-5" /> Quitter
          </Link>
          
          <div className="flex-1 max-w-xs mx-8">
            <div className="h-3 w-full bg-[#1E293B] rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-primary transition-all duration-500 relative"
                style={{ width: progressPercentage }}
              >
                 <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20"></div>
              </div>
            </div>
          </div>
          
          <div className="font-bold text-slate-400 text-xl">🏛️</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        
        {isAlreadyCompleted && (
          <div className="bg-secondary/10 border border-secondary/30 text-secondary-100 p-4 md:p-6 rounded-2xl mb-8 flex items-start md:items-center gap-4 animate-in fade-in shadow-sm">
            <RefreshCcw className="w-6 h-6 text-secondary shrink-0 mt-1 md:mt-0" />
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              <strong className="text-white font-baloo">Mode Révision :</strong> Tu as déjà validé ce module. Tu peux t'entraîner, mais l'XP a déjà été récupéré.
            </p>
          </div>
        )}

        {step === "THEORY" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            
            <div className="text-center space-y-2">
              <span className="text-secondary font-bold uppercase tracking-wider text-sm">{LESSON_DATA.category}</span>
              <h1 className="font-baloo text-3xl md:text-4xl font-extrabold text-white">{LESSON_DATA.title}</h1>
            </div>

            {/* 💡 LECTEUR VIDÉO DYNAMIQUE */}
            <div className="w-full bg-[#0F172A] border border-slate-700/50 rounded-3xl aspect-video flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
              {LESSON_DATA.videoUrl && LESSON_DATA.videoUrl !== "#" ? (
                // Si on a une vidéo, on affiche l'iframe Cloudinary
                <iframe
                  src={LESSON_DATA.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              ) : (
                // Sinon, on garde le placeholder habituel
                <>
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-50"></div>
                  <PlayCircle className="w-20 h-20 text-white/50 group-hover:text-primary transition-all duration-300 group-hover:scale-110 z-10" strokeWidth={1.5} />
                  <p className="text-slate-400 mt-4 z-10 font-medium">Vidéo en cours de préparation par Athéna</p>
                </>
              )}
            </div>

            <div className="bg-[#1E293B] p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <h2 className="font-baloo text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-400" />
                L'essentiel à retenir
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">{LESSON_DATA.content}</p>
            </div>

            <button 
              onClick={() => setStep("QUIZ")}
              className="w-full bg-primary text-white py-4 rounded-2xl font-baloo font-bold text-lg hover:bg-[#433f80] transition-colors shadow-lg hover:scale-[1.02]"
            >
              J'ai compris, passer au Quiz
            </button>
          </div>
        )}

        {step === "QUIZ" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-soleil text-sm font-bold text-slate-400 bg-[#0F172A] px-3 py-1 rounded-full border border-slate-800">
                Question {currentQIndex + 1} / {LESSON_DATA.questions.length}
              </span>
            </div>

            <h2 className="font-baloo text-2xl md:text-3xl font-extrabold text-white text-center mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                let buttonStyle = "bg-[#1E293B] border-slate-700/50 text-slate-300 hover:border-primary/50 hover:bg-[#0F172A]";
                
                if (selectedOption === option.id) {
                  buttonStyle = "bg-primary/20 border-primary text-white font-bold shadow-inner shadow-primary/20";
                }
                
                if (isSubmitted && option.isCorrect) {
                  buttonStyle = "bg-emerald-900/30 border-emerald-500 text-emerald-100 font-bold";
                }
                if (isSubmitted && selectedOption === option.id && !option.isCorrect) {
                  buttonStyle = "bg-rose-900/30 border-rose-500 text-rose-100 font-bold";
                }

                return (
                  <button
                    key={option.id}
                    disabled={isSubmitted}
                    onClick={() => setSelectedOption(option.id)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 text-lg ${buttonStyle}`}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            {isSubmitted && (
              <div className={`p-6 md:p-8 rounded-3xl border animate-in slide-in-from-bottom-4 ${isCorrect ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-rose-950/40 border-rose-500/50'}`}>
                <h3 className={`font-baloo font-bold text-2xl mb-3 flex items-center gap-2 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? <CheckCircle className="w-6 h-6" /> : <X className="w-6 h-6" />}
                  {isCorrect ? "Excellent ! 🎉" : "Presque... 🏛️"}
                </h3>
                <p className={`text-lg leading-relaxed ${isCorrect ? 'text-emerald-200/80' : 'text-rose-200/80'}`}>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="pt-8 border-t border-slate-800">
              {!isSubmitted ? (
                <button 
                  onClick={handleValidate}
                  disabled={!selectedOption}
                  className={`w-full py-4 rounded-2xl font-baloo font-bold text-lg transition-all ${
                    selectedOption 
                      ? "bg-secondary text-white hover:bg-[#253c7a] shadow-lg hover:scale-[1.02]" 
                      : "bg-[#0F172A] border border-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  Valider ma réponse
                </button>
              ) : (
                <button 
                  onClick={handleNextOrFinish}
                  className={`w-full py-4 rounded-2xl font-baloo font-bold text-lg transition-all shadow-lg hover:scale-[1.02] flex justify-center items-center gap-2 ${
                    isLastQuestion && isAlreadyCompleted 
                      ? "bg-slate-700 hover:bg-slate-600 text-white" 
                      : "bg-primary hover:bg-[#433f80] text-white"
                  }`}
                >
                  {!isLastQuestion 
                    ? <>Question suivante <ArrowRight className="w-5 h-5" /></> 
                    : isAlreadyCompleted 
                      ? "Terminer la révision" 
                      : "Terminer le module (+15 XP)"}
                </button>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
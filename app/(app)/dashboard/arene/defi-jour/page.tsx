"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Swords, Timer, Flame, Trophy, ArrowLeft, Zap } from "lucide-react";

// Les questions du mode "Time Attack"
const CHALLENGE_QUESTIONS = [
  { id: 1, text: "Trouvez l'antithèse :", options: ["Il pleut à verse.", "Je vis, je meurs.", "Un silence assourdissant."], correct: 1 },
  { id: 2, text: "Trouvez l'oxymore :", options: ["Une obscure clarté.", "Un grand petit homme.", "Il court vite."], correct: 0 },
  { id: 3, text: "Trouvez l'anaphore :", options: ["Paris outragé, Paris brisé...", "Je suis fatigué.", "Ni l'un ni l'autre."], correct: 0 },
  { id: 4, text: "Le logos fait appel à :", options: ["L'émotion", "La logique", "La crédibilité"], correct: 1 },
];

export default function DefiDuJour() {
  const router = useRouter();
  
  // 💡 C'EST ICI QUE ÇA DOIT ÊTRE ! À l'intérieur de la fonction !
  const { addXp, completeDailyChallenge } = useUser(); 
  
  // États du jeu
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "END">("START");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [combo, setCombo] = useState(0); 

  // Gestion du chronomètre
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "PLAYING" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft <= 0 && gameState === "PLAYING") {
      setGameState("END");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Fonction quand on clique sur une réponse
  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === CHALLENGE_QUESTIONS[currentQIndex].correct;

    if (isCorrect) {
      // +10 pts, plus bonus combo
      setScore(prev => prev + 10 + (combo * 5));
      setCombo(prev => prev + 1);
    } else {
      setCombo(0); 
      setTimeLeft(prev => Math.max(0, prev - 5)); // Pénalité !
    }

    // Passer à la question suivante ou finir
    if (currentQIndex + 1 < CHALLENGE_QUESTIONS.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setGameState("END");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Éclairage d'ambiance en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* ===================================== */}
      {/* ÉCRAN DE DÉMARRAGE                    */}
      {/* ===================================== */}
      {gameState === "START" && (
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500 relative z-10">
          
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 rounded-full animate-pulse-slow"></div>
            <div className="w-32 h-32 bg-[#1E293B] border-4 border-rose-500/50 rounded-full flex items-center justify-center relative z-10 shadow-2xl mx-auto">
              <Swords className="w-16 h-16 text-rose-500" strokeWidth={1.5} />
            </div>
          </div>

          <div>
            <h1 className="font-baloo text-4xl md:text-5xl font-extrabold text-white mb-2">Défi Éclair</h1>
            <p className="font-soleil text-slate-400 text-lg">Réponds juste le plus vite possible. Les mauvaises réponses coûtent du temps !</p>
          </div>
          
          <div className="bg-[#1E293B] p-6 rounded-3xl border border-slate-700/50 text-left space-y-4 font-soleil text-lg shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
              <span className="text-slate-400 flex items-center gap-2"><Timer className="w-5 h-5 text-indigo-400"/> Temps alloué :</span> 
              <span className="font-baloo font-bold text-white">60 secondes</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
              <span className="text-slate-400 flex items-center gap-2"><Zap className="w-5 h-5 text-rose-400"/> Règle :</span> 
              <span className="font-baloo font-bold text-rose-400">-5 sec par erreur</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500"/> Objectif :</span> 
              <span className="font-baloo font-bold text-yellow-500">Max de points</span>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => setGameState("PLAYING")}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:-translate-y-1"
            >
              Lancer le chrono
            </button>
            
            <button onClick={() => router.back()} className="flex items-center justify-center gap-2 w-full text-slate-500 hover:text-white font-soleil font-bold transition-colors py-2">
              <ArrowLeft className="w-4 h-4" /> Fuir l'Arène
            </button>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* ÉCRAN DE JEU                            */}
      {/* ===================================== */}
      {gameState === "PLAYING" && (
        <div className="max-w-2xl w-full space-y-8 relative z-10 animate-in fade-in">
          
          {/* HUD (Heads Up Display) */}
          <div className="bg-[#1E293B] p-5 rounded-3xl border border-slate-700/50 shadow-xl flex flex-col gap-4">
            
            {/* Barre de temps qui se vide */}
            <div className="space-y-1.5">
               <div className="flex justify-between text-sm font-baloo font-bold">
                  <span className={`${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-slate-300'} flex items-center gap-1.5`}>
                    <Timer className="w-4 h-4" /> {timeLeft}s restantes
                  </span>
               </div>
               <div className="h-3 w-full bg-[#0F172A] rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full transition-all duration-1000 linear ${timeLeft <= 10 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                    style={{ width: `${(timeLeft / 60) * 100}%` }}
                  ></div>
               </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
              <div className="h-8">
                {combo >= 2 && (
                  <div className="text-orange-400 font-baloo font-bold animate-in slide-in-from-left flex items-center gap-1.5 text-lg">
                    <Flame className="w-5 h-5 fill-current" /> Combo x{combo}
                  </div>
                )}
              </div>
              <div className="text-2xl font-baloo font-black text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" /> {score} <span className="text-sm text-slate-500 font-soleil">pts</span>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-[#1E293B] p-8 md:p-10 rounded-3xl text-center shadow-2xl border border-slate-700/50">
            <span className="inline-block bg-[#0F172A] text-indigo-400 px-4 py-1.5 rounded-full text-xs font-baloo font-bold uppercase tracking-widest mb-6 border border-slate-700">
              Question {currentQIndex + 1} / {CHALLENGE_QUESTIONS.length}
            </span>
            <h2 className="font-baloo text-3xl md:text-4xl font-extrabold mb-10 leading-tight">
              {CHALLENGE_QUESTIONS[currentQIndex].text}
            </h2>
            
            <div className="space-y-4">
              {CHALLENGE_QUESTIONS[currentQIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-5 rounded-2xl border-2 border-slate-700 bg-[#0F172A]/50 text-slate-300 font-soleil font-bold text-lg hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white transition-all text-left flex items-center justify-between group"
                >
                  <span>{option}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-indigo-400 flex items-center justify-center"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* ÉCRAN DE FIN                          */}
      {/* ===================================== */}
      {gameState === "END" && (
        <div className="max-w-md w-full text-center space-y-8 animate-in slide-in-from-bottom-8 relative z-10">
          
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
            <div className="w-40 h-40 bg-[#1E293B] border-4 border-yellow-500/50 rounded-full flex items-center justify-center relative z-10 shadow-2xl mx-auto">
              <span className="text-7xl drop-shadow-lg">🏆</span>
            </div>
          </div>

          <div>
            <h1 className="font-baloo text-4xl md:text-5xl font-extrabold text-white mb-2">Défi Terminé !</h1>
            <p className="font-soleil text-slate-400 text-lg">
              {timeLeft <= 0 ? "Le temps est écoulé !" : "Tu as répondu à toutes les questions."}
            </p>
          </div>
          
          <div className="bg-[#1E293B] p-8 rounded-3xl border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.15)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-9xl opacity-5">⭐</div>
            <div className="font-soleil text-slate-400 font-bold uppercase tracking-widest mb-2 relative z-10">Score Final</div>
            <div className="font-baloo text-7xl font-black text-yellow-400 relative z-10 drop-shadow-md">{score}</div>
          </div>

          <button 
            onClick={() => {
              addXp(score); 
              completeDailyChallenge(); // 💡 Validation du défi pour la BDD !
              router.push("/dashboard/arene");
            }}
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-4 rounded-2xl font-baloo font-bold text-xl hover:bg-slate-200 transition-all hover:scale-105 shadow-xl"
          >
            Encaisser mes {score} XP <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </button>
        </div>
      )}

    </div>
  );
}
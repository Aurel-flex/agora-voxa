"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

// Les questions du mode "Time Attack"
const CHALLENGE_QUESTIONS = [
  { id: 1, text: "Trouvez l'antithèse :", options: ["Il pleut à verse.", "Je vis, je meurs.", "Un silence assourdissant."], correct: 1 },
  { id: 2, text: "Trouvez l'oxymore :", options: ["Une obscure clarté.", "Un grand petit homme.", "Il court vite."], correct: 0 },
  { id: 3, text: "Trouvez l'anaphore :", options: ["Paris outragé, Paris brisé...", "Je suis fatigué.", "Ni l'un ni l'autre."], correct: 0 },
  { id: 4, text: "Le logos fait appel à :", options: ["L'émotion", "La logique", "La crédibilité"], correct: 1 },
];

export default function DefiDuJour() {
  const router = useRouter();
  const { addXp } = useUser(); // <-- Ajout de la fonction
  // États du jeu
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "END">("START");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 secondes pour le défi
  const [combo, setCombo] = useState(0); // Multiplicateur de points

  // Gestion du chronomètre
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "PLAYING" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === "PLAYING") {
      setGameState("END");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Fonction quand on clique sur une réponse
  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === CHALLENGE_QUESTIONS[currentQIndex].correct;

    if (isCorrect) {
      // +10 pts, plus un bonus de combo, plus un bonus de temps
      setScore(prev => prev + 10 + (combo * 5));
      setCombo(prev => prev + 1);
    } else {
      setCombo(0); // On perd le combo
      setTimeLeft(prev => Math.max(0, prev - 5)); // Pénalité de 5 secondes !
    }

    // Passer à la question suivante ou finir
    if (currentQIndex + 1 < CHALLENGE_QUESTIONS.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setGameState("END");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      
      {/* ÉCRAN DE DÉMARRAGE */}
      {gameState === "START" && (
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-500">
          <div className="text-8xl animate-bounce">⚔️</div>
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Défi Éclair</h1>
            <p className="text-slate-400">Répondez juste le plus vite possible. Les mauvaises réponses coûtent du temps !</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 text-left space-y-4">
            <div className="flex justify-between font-bold"><span>Temps :</span> <span className="text-yellow-400">60 secondes</span></div>
            <div className="flex justify-between font-bold"><span>Règle :</span> <span className="text-red-400">-5 sec par erreur</span></div>
            <div className="flex justify-between font-bold"><span>Objectif :</span> <span className="text-primary">Max de points</span></div>
          </div>

          <button 
            onClick={() => setGameState("PLAYING")}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-xl hover:bg-secondary transition-all shadow-[0_0_40px_-10px_rgba(84,80,158,1)]"
          >
            Lancer le chrono
          </button>
          
          <button onClick={() => router.back()} className="text-slate-500 hover:text-white font-medium">
            Retour à l'Arène
          </button>
        </div>
      )}

      {/* ÉCRAN DE JEU */}
      {gameState === "PLAYING" && (
        <div className="max-w-2xl w-full space-y-8">
          {/* HUD (Heads Up Display) */}
          <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border-2 border-slate-700">
            <div className="text-2xl font-black text-yellow-400 flex items-center gap-2">
              ⏱️ {timeLeft}s
            </div>
            {combo >= 2 && <div className="text-accent font-bold animate-pulse text-lg">🔥 Combo x{combo}</div>}
            <div className="text-2xl font-black text-white">Score: {score}</div>
          </div>

          {/* Question */}
          <div className="bg-white text-slate-900 p-8 rounded-3xl text-center shadow-xl">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block">
              Question {currentQIndex + 1} / {CHALLENGE_QUESTIONS.length}
            </span>
            <h2 className="text-3xl font-extrabold mb-8">{CHALLENGE_QUESTIONS[currentQIndex].text}</h2>
            
            <div className="space-y-4">
              {CHALLENGE_QUESTIONS[currentQIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 text-lg font-bold hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ÉCRAN DE FIN */}
      {gameState === "END" && (
        <div className="max-w-md w-full text-center space-y-8 animate-in slide-in-from-bottom-8">
          <div className="text-8xl">🏆</div>
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Défi Terminé !</h1>
            <p className="text-slate-400">Le temps est écoulé ou vous avez tout complété.</p>
          </div>
          
          <div className="bg-slate-800 p-8 rounded-3xl border-2 border-primary shadow-[0_0_40px_-10px_rgba(84,80,158,0.5)]">
            <div className="text-slate-400 font-bold uppercase tracking-widest mb-2">Score Final</div>
            <div className="text-6xl font-black text-yellow-400">{score}</div>
          </div>

        <button 
            onClick={() => {
              addXp(score); // On ajoute le score gagné à la mémoire globale !
              router.push("/dashboard/arene");
            }}
            className="w-full bg-white text-primary py-4 rounded-2xl font-bold text-xl hover:bg-slate-200 transition-all"
          >
            Encaisser mes {score} XP
          </button>
        </div>
      )}

    </div>
  );
}
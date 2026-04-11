"use client";

import { useUser } from "@/context/UserContext";

export default function ProfilPage() {
  const { xp, completedCourses, user, level, league, updateProfile } = useUser();

  // Logique de gamification : 1 Niveau = 500 XP
  const XP_PER_LEVEL = 500;
  const currentLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpForNextLevel = currentLevel * XP_PER_LEVEL;
  const currentLevelXp = xp % XP_PER_LEVEL; // L'XP accumulé dans le niveau actuel
  const progressPercentage = Math.round((currentLevelXp / XP_PER_LEVEL) * 100);
  const AVATARS = ["👤", "🦉", "🦁", "👑", "🏛️", "⚡"];
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      
     {/* Remplacer la div de l'avatar par celle-ci : */}
      <div className="flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* ... garde le background ... */}
        
        <div className="flex flex-col items-center gap-4 z-10">
          <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-6xl border-4 border-primary shrink-0 shadow-lg">
            {user?.avatar || "👤"}
          </div>
          {/* SÉLECTEUR D'AVATARS */}
          <div className="flex gap-2 bg-white p-2 rounded-full shadow-sm border border-slate-200">
            {AVATARS.map(av => (
              <button 
                key={av}
                onClick={() => updateProfile(user?.name || "", av)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-slate-100 transition-colors ${user?.avatar === av ? 'bg-primary/20 border border-primary' : ''}`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left z-10">
        <h1 className="...">{user?.name || "Orateur"}</h1>
         <p className="text-lg text-slate-500 font-medium mb-6">
            Membre depuis aujourd'hui • Ligue {league.name} {league.icon}
          </p>
          
          {/* Barre d'XP globale */}
          <div className="space-y-2 max-w-md mx-auto md:mx-0">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-primary">Niveau {currentLevel}</span>
              <span className="text-slate-500">{currentLevelXp} / {XP_PER_LEVEL} XP</span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des Statistiques */}
      <h2 className="text-2xl font-bold text-slate-800 px-2">Statistiques</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 text-center shadow-sm">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl font-black text-slate-800">{xp}</div>
          <div className="text-sm font-bold text-slate-400 uppercase">XP Total</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 text-center shadow-sm">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-black text-slate-800">1</div>
          <div className="text-sm font-bold text-slate-400 uppercase">Série (Jours)</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 text-center shadow-sm">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-black text-slate-800">{completedCourses.length}</div>
          <div className="text-sm font-bold text-slate-400 uppercase">Cours finis</div>
        </div>
      {/* 👇 Le bloc Ligue dynamique 👇 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 text-center shadow-sm">
          <div className="text-3xl mb-2">{league.icon}</div>
          <div className={`text-xl font-black mt-1 ${league.color}`}>{league.name}</div>
          <div className="text-sm font-bold text-slate-400 uppercase mt-1">Ligue actuelle</div>
        </div>
      </div>

      {/* Les Badges (Gamification) */}
      <h2 className="text-2xl font-bold text-slate-800 px-2 pt-4">Badges & Hauts Faits</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Badge Débloqué */}
        <div className="bg-white p-6 rounded-3xl border-2 border-yellow-400 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-4xl mb-4">
            👶
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Premier pas</h3>
          <p className="text-sm text-slate-500 mt-2">Vous avez rejoint l'Agora et commencé votre apprentissage.</p>
        </div>

        {/* Badge Dynamique (Lié au nombre de cours finis) */}
        <div className={`p-6 rounded-3xl border-2 flex flex-col items-center text-center transition-all ${completedCourses.length >= 3 ? 'bg-white border-primary shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 ${completedCourses.length >= 3 ? 'bg-primary/10' : 'bg-slate-200 grayscale'}`}>
            🎓
          </div>
          <h3 className={`font-bold text-lg ${completedCourses.length >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>Érudit</h3>
          <p className="text-sm text-slate-500 mt-2">Terminez 3 cours pour débloquer ce badge de sagesse.</p>
          {!completedCourses.includes("3") && completedCourses.length < 3 && (
            <div className="mt-4 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
               <div className="bg-primary h-full" style={{ width: `${(completedCourses.length / 3) * 100}%` }}></div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
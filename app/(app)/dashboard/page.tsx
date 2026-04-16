"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { Map, Trophy, User, PlayCircle, Crown, Swords, Home } from "lucide-react";

export default function DashboardPage() {
  const { xp, completedCourses, user, level, league, isFirstVisit,isFirstSession, completeFirstVisit } = useUser();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      setShowWelcomeModal(true);
    }
  }, [isFirstVisit]); 

  const XP_PER_LEVEL = 500;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const xpPercentage = Math.round((currentLevelXp / XP_PER_LEVEL) * 100);

  const courseSequence = [
    { id: "1", title: "L'art de l'Exorde", category: "Ethos", duration: "Vidéo • 3 min" },
    { id: "2", title: "La posture de l'Orateur", category: "Ethos", duration: "Quiz de validation" },
    { id: "4", title: "Maîtriser l'Anaphore", category: "Pathos", duration: "Vidéo • 4 min" },
    { id: "6", title: "Le Syllogisme parfait", category: "Logos", duration: "Vidéo • 5 min" }
  ];
  
  const nextCourse = courseSequence.find(c => !completedCourses.includes(c.id));
  const isAllCompleted = !nextCourse;

  function handleCloseModal(): void {
    setShowWelcomeModal(false);
    completeFirstVisit();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12 animate-fade-in">
      
      {/* 🔴 MODALE DE BIENVENUE 🔴 */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
             
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>

             <div className="flex justify-center mb-6 relative w-24 h-24 mx-auto">
               <Image src="/mascotte-athena-pouce.webp" alt="Athéna valide" fill className="object-contain" />
             </div>
             
             <h2 className="font-baloo text-3xl font-bold text-center text-white mb-2">Bienvenue dans l'Agora !</h2>
             <p className="font-soleil text-slate-400 mb-8 text-center text-lg font-medium">Voici comment maîtriser l'art oratoire :</p>
             
             <ul className="space-y-6 mb-8 relative z-10">
               <li className="flex gap-4 items-start">
                 <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                   <Map className="w-6 h-6" />
                 </div>
                 <div>
                   <strong className="font-baloo text-white text-lg">Le Parcours</strong>
                   <p className="font-soleil font-medium text-sm text-slate-400 mt-1">Suis les leçons et valide les quiz pour progresser.</p>
                 </div>
               </li>
               <li className="flex gap-4 items-start">
                 <div className="w-12 h-12 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl flex items-center justify-center shrink-0">
                   <Swords className="w-6 h-6" />
                 </div>
                 <div>
                   <strong className="font-baloo text-white text-lg">L'Arène</strong>
                   <p className="font-soleil font-medium text-sm text-slate-400 mt-1">Relève les défis quotidiens d'Athéna pour gagner de l'XP.</p>
                 </div>
               </li>
               <li className="flex gap-4 items-start">
                 <div className="w-12 h-12 bg-accent text-white border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                   <Crown className="w-6 h-6" />
                 </div>
                 <div>
                   <strong className="font-baloo text-white text-lg">Les Ligues</strong>
                   <p className="font-soleil font-medium text-sm text-slate-400 mt-1">Accumule de l'XP pour monter en grade, de Bronze à Diamant !</p>
                 </div>
               </li>
             </ul>

             <button 
               onClick={handleCloseModal} 
               className="w-full bg-primary text-white py-4 rounded-2xl font-baloo font-bold text-lg hover:bg-[#433f80] transition-colors shadow-lg shadow-primary/20 relative z-10 hover:scale-[1.02]"
             >
               Je suis prêt !
             </button>
          </div>
        </div>
      )}

     {/* 1. En-tête Dynamique avec Mascotte Professeur */}
<div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 md:gap-8 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>

  {/* L'image de ta Mascotte Athéna */}
  <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300">
    <Image 
      src="/mascotte-athena-simple.webp" 
      alt="Mascotte Athéna"
      fill
      className="object-contain"
    />
  </div>

  <div className="text-center md:text-left z-10 flex-1">
    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
       <Home className="w-5 h-5 text-primary" />
       <span className="font-baloo font-bold text-primary uppercase tracking-wider text-sm">Accueil</span>
    </div>
    
 <h1 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-2">
      {isFirstSession ? "Bienvenue" : "Bon retour"}, <span className="text-primary">{user?.name || "Orateur"}</span> !
    </h1>
    
    <p className="font-soleil text-slate-400 text-lg mb-6">
      Que souhaites-tu travailler aujourd'hui ?
    </p>
    
    {/* Encart XP */}
    <div className="inline-flex bg-[#0F172A] rounded-2xl p-3 items-center gap-4 border border-slate-700 shadow-inner">
      <div className="text-4xl">{league?.icon || "🥉"}</div>
      <div className="text-left pr-4">
        <div className="font-baloo font-bold text-slate-400 text-xs uppercase tracking-wider">Niveau {level || 1}</div>
        <div className="font-baloo font-bold text-amber-400 text-xl">{xp || 0} <span className="text-sm text-amber-400/80">XP</span></div>
      </div>
    </div>
  </div>
</div>

      {/* 2. La Grille des Piliers (Avec icônes Lucide) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link href="/dashboard/parcours" className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center text-center group shadow-sm">
          <Map className="w-10 h-10 mb-4 text-primary group-hover:scale-110 transition-transform" />
          <h2 className="font-baloo font-bold text-white text-xl mb-2">Parcours</h2>
          <p className="font-soleil font-medium text-slate-400 text-sm">Vidéos de cours et Quiz de validation.</p>
        </Link>

        <Link href="/dashboard/arene" className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800 hover:border-rose-500/50 transition-all cursor-pointer flex flex-col items-center text-center group shadow-sm">
          
          <Swords className="w-10 h-10 md:w-12 md:h-12 text-rose-400 group-hover:scale-110 transition-transform" />
          <h2 className="font-baloo font-bold text-white text-xl mb-2">L'Arène</h2>
          <p className="font-soleil font-medium text-slate-400 text-sm">Défis du jour et interactions Mascotte.</p>
        </Link>

        <Link href="/dashboard/compte" className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800 hover:border-secondary/50 transition-all cursor-pointer flex flex-col items-center text-center group shadow-sm">
          <User className="w-10 h-10 mb-4 text-secondary group-hover:scale-110 transition-transform" />
          <h2 className="font-baloo font-bold text-white text-xl mb-2">Mon Compte</h2>
          <p className="font-soleil font-medium text-slate-400 text-sm">Tes statistiques, abonnement et réglages.</p>
        </Link>

      </div>

      {/* 3. Section dynamique : Le prochain cours */}
      {!isAllCompleted ? (
        <div className="bg-[#1E293B] border border-slate-700/50 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-sm">
          
          <div className="absolute bottom-0 left-0 h-1.5 bg-[#0F172A] w-full">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${xpPercentage}%` }}></div>
          </div>

          <div className="z-10">
            <span className="font-baloo font-bold text-primary text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" /> PROCHAINE ÉTAPE
            </span>
            <h3 className="font-baloo font-bold text-white text-2xl md:text-3xl mb-1">{nextCourse.title}</h3>
            <p className="font-soleil font-medium text-slate-400">{nextCourse.category} • {nextCourse.duration}</p>
          </div>
          
          <Link href={`/dashboard/cours/${nextCourse.id}`} className="w-full md:w-auto text-center bg-primary hover:bg-[#433f80] text-white px-8 py-4 rounded-2xl font-baloo font-bold text-lg transition-all shadow-lg hover:shadow-primary/20 hover:scale-105 z-10 whitespace-nowrap">
            Lancer le module
          </Link>
        </div>
      ) : (
        // Encart Parcours terminé avec Athéna joyeuse
        <div className="bg-emerald-950/30 border border-emerald-500/30 p-8 rounded-3xl text-center shadow-sm flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <Image src="/mascotte-athena-youpi.webp" alt="Athéna célèbre" fill className="object-contain" />
          </div>
          <h3 className="font-baloo font-bold text-emerald-400 text-2xl mt-1">Parcours terminé !</h3>
          <p className="font-soleil font-medium text-emerald-200/70 mt-2">Tu as complété tous les modules disponibles.</p>
        </div>
      )}

    </div>
  );
}
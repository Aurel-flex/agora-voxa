"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Crown, Lock, Star, Swords, Target, Flame, Gift, Check } from "lucide-react"; 

export default function ArenePage() {
  // 💡 On récupère dailyXp en plus !
const { user, xp, dailyXp, league, claimedQuests, claimQuestReward, dailyChallengeCompleted } = useUser();  
  // On limite l'affichage à 50 max, même si le joueur a gagné 70 XP
  const quest1Progress = Math.min(dailyXp, 50);

  // 💡 Les quêtes sont calculées dynamiquement
  const quests = [
    // La progression est maintenant connectée à ton vrai XP gagné aujourd'hui !
    { id: 1, title: "Gagner 50 XP", progress: quest1Progress, total: 50, reward: "Coffre 🎁", xpReward: 0, gemsReward: 20 },
    
    // Pour la quête de connexion, elle est toujours valide quand on est là
    { id: 3, title: "Se connecter aujourd'hui", progress: 1, total: 1, reward: "5 Gemmes 💎", xpReward: 0, gemsReward: 5 },
  ].map(q => {
    if (claimedQuests.includes(q.id)) return { ...q, state: "claimed" };
    if (q.progress >= q.total) return { ...q, state: "ready" };
    return { ...q, state: "progress" };
  });

  const handleClaimReward = (id: number, xpReward: number, gemsReward: number) => {
    claimQuestReward(id, xpReward, gemsReward);
  };
  
  
  const LEADERBOARD = [
    { rank: 1, name: "Cicéron99", xp: 4500, isMe: false },
    { rank: 2, name: "Démosthène_Pro", xp: 4230, isMe: false },
    { rank: 3, name: user?.name || "Toi", xp: xp, isMe: true }, 
    { rank: 4, name: "Sophiste_du_75", xp: 1100, isMe: false },
    { rank: 5, name: "Le boss de l'oral", xp: 30, isMe: false },
  ].sort((a, b) => b.xp - a.xp).map((u, index) => ({ ...u, rank: index + 1 })); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in pb-24">
      
      {/* En-tête de l'Arène */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-rose-500/10 rounded-2xl mb-4 border border-rose-500/20">
            <Swords className="w-8 h-8 text-rose-500" strokeWidth={1.5} />
        </div>
        <h1 className="font-baloo text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Bienvenue dans <span className="text-rose-500">l'Arène</span>
        </h1>
        <p className="font-soleil text-lg text-slate-400 max-w-2xl mx-auto">
          Prouve ta valeur, affronte les autres orateurs et grimpe dans le classement.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* COLONNE PRINCIPALE (Prend 2/3 sur grand écran) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* 🌟 LE DÉFI DU JOUR */}
          <section className="relative bg-[#1E293B] rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl group">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 via-[#1E293B] to-rose-600/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-28 h-28 md:w-40 md:h-40 shrink-0 bg-[#0F172A] rounded-full border-4 border-indigo-500/30 flex items-center justify-center text-6xl md:text-7xl shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                🦉
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-baloo font-bold uppercase tracking-wider border border-indigo-500/30">
                  <Target className="w-4 h-4" /> Défi Quotidien
                </div>
                <h2 className="font-baloo text-3xl md:text-4xl font-bold text-white">Le duel des Antithèses</h2>
                <p className="font-soleil text-slate-300 text-base md:text-lg leading-relaxed">
                  Repère 5 antithèses cachées en moins de 2 minutes pour prouver ton agilité mentale.
                </p>
           <div className="pt-4">
                  {/* 💡 CONDITION : Si c'est fini, on grise le bouton. Sinon on affiche le lien ! */}
                  {dailyChallengeCompleted ? (
                    <button disabled className="inline-flex items-center justify-center w-full md:w-auto gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-8 py-4 rounded-2xl font-baloo font-bold text-lg cursor-not-allowed shadow-inner shadow-emerald-900/20">
                      <Check className="w-6 h-6" /> Défi accompli !
                    </button>
                  ) : (
                    <Link href="/dashboard/arene/defi-jour" className="inline-flex items-center justify-center w-full md:w-auto gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-2xl font-baloo font-bold text-lg transition-all shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-1">
                      <Swords className="w-5 h-5" /> Accepter le défi
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 🎯 QUÊTES QUOTIDIENNES INTERACTIVES */}
          <section className="space-y-4">
            <h2 className="font-baloo text-2xl font-bold text-white flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" fill="currentColor" /> 
              Quêtes Quotidiennes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {quests.map((quest) => (
                <div key={quest.id} className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between h-full gap-4 transition-all duration-300 ${quest.state === 'claimed' ? 'bg-[#0F172A]/80 border-slate-800' : quest.state === 'ready' ? 'bg-indigo-900/20 border-indigo-500/50' : 'bg-[#1E293B] border-slate-700/50'}`}>
                  
                  <div className="flex justify-between items-start gap-4">
                    <h3 className={`font-baloo font-bold text-lg leading-tight ${quest.state === 'claimed' ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {quest.title}
                    </h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${quest.state === 'claimed' ? 'bg-emerald-500/20 text-emerald-500' : quest.state === 'ready' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[#0F172A] text-slate-500 border border-slate-700'}`}>
                      {quest.state === 'claimed' ? <Check className="w-5 h-5" /> : quest.state === 'ready' ? <Gift className="w-4 h-4 animate-bounce" /> : "🎯"}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Logique d'affichage selon l'état */}
                    {quest.state === 'progress' && (
                      <div>
                        <div className="flex justify-between text-xs font-soleil text-slate-400 mb-2">
                          <span>Progression</span>
                          <span className="font-bold">{quest.progress} / {quest.total}</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#0F172A] rounded-full overflow-hidden border border-slate-800">
                          <div className="h-full bg-yellow-500 transition-all duration-1000" style={{ width: `${(quest.progress / quest.total) * 100}%` }}></div>
                        </div>
                        <div className="mt-3 text-xs font-bold text-slate-400 flex items-center gap-1">
                          🎁 Récompense: {quest.reward}
                        </div>
                      </div>
                    )}

                    {quest.state === 'ready' && (
                      <button 
                        // 💡 Appel de la fonction de sauvegarde via le Context
                        onClick={() => handleClaimReward(quest.id, quest.xpReward, quest.gemsReward)}
                        className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-baloo font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 animate-pulse"
                      >
                        Récupérer {quest.reward} !
                      </button>
                    )}

                    {quest.state === 'claimed' && (
                      <div className="text-emerald-500 text-sm font-bold flex items-center gap-2 bg-emerald-500/10 py-2 px-3 rounded-xl w-fit">
                        Récompense récupérée 🎉
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 💎 MODES D'ENTRAÎNEMENT PREMIUM */}
          <section className="space-y-4 pt-4">
             <h2 className="font-baloo text-2xl font-bold text-white flex items-center gap-3">
              <Crown className="w-6 h-6 text-[#d08df5]" /> 
              Exclusivités Premium
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="relative bg-[#1a1525] p-6 rounded-2xl border border-[#662483]/40 flex flex-col items-center text-center gap-4 group overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href="/dashboard/studio" className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-baloo font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-400 transition-colors">
                    Tester (1 essai)
                  </Link>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#2d1b38] flex items-center justify-center text-3xl shrink-0 opacity-60">🎙️</div>
                <div className="opacity-60 space-y-1">
                  <h3 className="font-baloo font-bold text-lg text-[#d08df5]">Studio Oratoire</h3>
                  <p className="font-soleil text-sm text-slate-400">Analyse IA de ta prosodie en temps réel.</p>
                </div>
                <Lock className="absolute top-4 right-4 w-5 h-5 text-slate-600" />
              </div>

               <div className="relative bg-[#1a1525] p-6 rounded-2xl border border-[#662483]/40 flex flex-col items-center text-center gap-4 group overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href="/tarifs" className="bg-[#662483] text-white px-5 py-2.5 rounded-xl font-baloo font-bold shadow-lg flex items-center gap-2 hover:bg-[#8631ab] transition-colors">
                    <Crown className="w-4 h-4" /> Débloquer
                  </Link>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#2d1b38] flex items-center justify-center text-3xl shrink-0 opacity-60"><Flame className="w-8 h-8 text-orange-500" /></div>
                <div className="opacity-60 space-y-1">
                  <h3 className="font-baloo font-bold text-lg text-[#d08df5]">Mode Survie</h3>
                  <p className="font-soleil text-sm text-slate-400">Questions infinies. L'erreur est fatale.</p>
                </div>
                <Lock className="absolute top-4 right-4 w-5 h-5 text-slate-600" />
              </div>

            </div>
          </section>

        </div>

        {/* COLONNE DROITE : LE CLASSEMENT (CORRIGÉ RESPONSIVE) */}
        <aside className="xl:col-span-1">
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700/50 shadow-xl lg:sticky lg:top-24 overflow-hidden flex flex-col max-h-[80vh]">
            
            {/* Header du classement */}
            <div className="bg-[#0F172A]/50 p-6 text-center border-b border-slate-700/50 relative shrink-0">
              <div className="absolute top-2 left-4 text-2xl opacity-20">✨</div>
              <div className="absolute bottom-2 right-4 text-xl opacity-20">🏆</div>
              
              <div className="text-5xl mb-3 drop-shadow-md">{league.icon || "🥉"}</div>
              <h2 className={`font-baloo text-2xl font-bold uppercase tracking-wider ${league.color || "text-orange-400"}`}>
                Ligue {league.name || "Bronze"}
              </h2>
              <p className="font-soleil text-slate-400 text-xs mt-1 uppercase font-bold tracking-widest">
                Zone de promotion
              </p>
            </div>

            {/* 💡 Liste scrollable + Flexbox ultra-robuste */}
            <div className="p-4 space-y-2 overflow-y-auto flex-1 custom-scrollbar">
              {LEADERBOARD.map((u) => (
                <div 
                  key={u.rank} 
                  className={`flex items-center gap-2 p-3 rounded-2xl transition-all w-full ${
                    u.isMe 
                    ? "bg-indigo-500/20 border border-indigo-500/50" 
                    : "hover:bg-[#0F172A] border border-transparent"
                  }`}
                >
                  {/* Container pour le Rang, l'Avatar et le Nom (Prend tout l'espace dispo sans déborder) */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`font-baloo font-bold text-lg w-5 text-center shrink-0 ${
                      u.rank === 1 ? "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" :
                      u.rank === 2 ? "text-slate-300" :
                      u.rank === 3 ? "text-amber-600" : "text-slate-500"
                    }`}>
                      {u.rank}
                    </span>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-baloo font-bold shrink-0 ${u.isMe ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-[#0F172A] text-slate-400 border border-slate-700'}`}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    
                    {/* Le texte se coupe proprement avec des points de suspension s'il est trop long */}
                    <span className={`font-soleil font-bold truncate flex-1 ${u.isMe ? "text-white" : "text-slate-300"}`}>
                      {u.name}
                    </span>
                  </div>

                  {/* Container pour l'XP (Ne se rétrécit jamais) */}
                  <span className="font-baloo font-bold text-slate-300 bg-[#0F172A] px-2.5 py-1 rounded-lg border border-slate-800 shrink-0 text-sm md:text-base">
                    {u.xp} <span className="text-[10px] md:text-xs text-slate-500">XP</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Footer / Timer */}
            <div className="bg-indigo-950/30 p-4 text-center border-t border-slate-700/50 shrink-0">
              <p className="font-soleil text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Fin de la saison dans
              </p>
              <p className="font-baloo text-xl font-black text-indigo-400">
                2j 14h 30m
              </p>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
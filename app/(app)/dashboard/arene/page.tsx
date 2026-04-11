"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Crown, Lock, Star, Swords } from "lucide-react"; // On ajoute quelques belles icônes

// Fausses données pour simuler la gamification
const DAILY_QUESTS = [
  { id: 1, title: "Gagner 50 XP", progress: 15, total: 50, reward: "Coffre 🎁" },
  { id: 2, title: "Terminer 1 leçon parfaite", progress: 0, total: 1, reward: "10 Gemmes 💎" },
  { id: 3, title: "Se connecter avant midi", progress: 1, total: 1, reward: "5 Gemmes 💎", completed: true },
];

export default function ArenePage() {
  const { user, xp, league } = useUser();
  
  // On intègre l'utilisateur réel dans le classement fictif
  const LEADERBOARD = [
    { rank: 1, name: "Cicéron99", xp: 4500, isMe: false },
    { rank: 2, name: "Démosthène_Pro", xp: 4230, isMe: false },
    { rank: 3, name: user?.name || "Toi", xp: xp, isMe: true }, // Le vrai utilisateur !
    { rank: 4, name: "Sophiste_du_75", xp: 1100, isMe: false },
    { rank: 5, name: "VoxPopuli", xp: 950, isMe: false },
  ].sort((a, b) => b.xp - a.xp).map((u, index) => ({ ...u, rank: index + 1 })); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      
      {/* En-tête de l'Arène */}
      <div className="text-center mb-12">
        <h1 className="font-baloo text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight flex items-center justify-center gap-4">
          <Swords className="w-10 h-10 md:w-12 md:h-12 text-primary" /> L'Arène
        </h1>
        <p className="font-soleil text-lg text-slate-400 max-w-2xl mx-auto">
          Affronte d'autres orateurs, complète tes quêtes et hisse-toi au sommet de la Ligue.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* COLONNE GAUCHE : Défis et Quêtes (Prend 2/3) */}
        <div className="flex-1 space-y-8">
          
          {/* Le Défi d'Athéna (Mise en avant massive) */}
          <div className="bg-linear-to-br from-primary to-[#3a3775] p-8 md:p-10 rounded-3xl shadow-2xl shadow-primary/20 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border border-primary/50">
            {/* Lueur de fond */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            
            <div className="text-8xl md:text-9xl drop-shadow-2xl animate-bounce-slow z-10">🦉</div>
            
            <div className="flex-1 text-center md:text-left relative z-10">
              <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-baloo font-bold uppercase tracking-widest shadow-md">
                Défi du jour
              </span>
              <h2 className="font-baloo text-3xl md:text-4xl font-bold mt-4 mb-3">Le duel des Antithèses</h2>
              <p className="font-soleil text-white/80 text-lg mb-8 leading-relaxed">
                Athéna te met au défi de repérer 5 antithèses en moins de 2 minutes. Prêt à prouver ta valeur ?
              </p>
              <Link href="/dashboard/arene/defi-jour" className="inline-flex bg-white text-primary px-8 py-4 rounded-2xl font-baloo font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl">
                Accepter le défi (⚔️ +25 XP)
              </Link>
            </div>
          </div>

          {/* Les Quêtes Quotidiennes */}
          <div>
            <h2 className="font-baloo text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" fill="currentColor" /> 
              Quêtes Quotidiennes
            </h2>
            <div className="space-y-4">
              {DAILY_QUESTS.map((quest) => (
                <div key={quest.id} className="bg-[#1E293B] p-5 md:p-6 rounded-3xl border border-slate-700/50 shadow-sm flex items-center gap-4 md:gap-6">
                  
                  {/* Icône de statut */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl border-2 shrink-0 transition-colors ${quest.completed ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-400' : 'bg-[#0F172A] border-slate-700 text-slate-400'}`}>
                    {quest.completed ? "✓" : "🎯"}
                  </div>
                  
                  {/* Infos de la quête */}
                  <div className="flex-1">
                    <h3 className={`font-baloo font-bold text-lg ${quest.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {quest.title}
                    </h3>
                    
                    {!quest.completed && (
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex-1 h-2.5 bg-[#0F172A] rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="h-full bg-yellow-500 transition-all duration-1000 ease-out"
                            style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-soleil font-bold text-slate-400 text-xs md:text-sm whitespace-nowrap">
                          {quest.progress} / {quest.total}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Récompense */}
                  <div className="hidden sm:flex flex-col items-end shrink-0">
                    <span className="font-soleil text-xs font-bold text-slate-500 uppercase tracking-wider">Récompense</span>
                    <span className="font-baloo font-bold text-secondary text-lg">{quest.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modes de jeu spéciaux */}
          <div>
            <h2 className="font-baloo text-2xl font-bold text-white mb-6 flex items-center gap-2 mt-10">
              🎮 Modes d'entraînement
            </h2>
            <div className="space-y-4">
              
              {/* Mode Premium 1 */}
              <div className="bg-[#1E293B] p-6 rounded-3xl border border-slate-700/50 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                   <Link href="/tarifs" className="bg-accent hover:bg-[#4d1b63] text-white px-6 py-3 rounded-xl font-baloo font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all">
                    <Crown className="w-5 h-5" /> Débloquer l'accès Premium
                   </Link>
                </div>
                
                <div className="w-14 h-14 rounded-full bg-[#0F172A] flex items-center justify-center text-2xl shrink-0 opacity-50 border border-slate-700">🔥</div>
                <div className="flex-1 opacity-50 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2 justify-center sm:justify-start">
                    <h3 className="font-baloo font-bold text-lg text-slate-300">Mode Survie Illimité</h3>
                    <span className="bg-accent text-white text-[10px] font-baloo font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-500/20">PRO</span>
                  </div>
                  <p className="font-soleil text-sm text-slate-500 mt-1">Enchaîne les questions jusqu'à l'erreur fatale. Classement exclusif.</p>
                </div>
                <div className="text-slate-600 opacity-50 shrink-0"><Lock className="w-6 h-6" /></div>
              </div>

              {/* Mode Premium 2 (Studio) */}
              <div className="bg-[#1E293B] p-6 rounded-3xl border border-slate-700/50 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href="/dashboard/studio" className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-baloo font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform hover:bg-emerald-400">
                    🎙️ Tester le Studio (1 essai)
                  </Link>
                </div>

                <div className="w-14 h-14 rounded-full bg-[#0F172A] flex items-center justify-center text-2xl shrink-0 opacity-50 border border-slate-700">🎙️</div>
                <div className="flex-1 opacity-50 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2 justify-center sm:justify-start">
                    <h3 className="font-baloo font-bold text-lg text-slate-300">Studio : Clash d'Éloquence</h3>
                    <span className="bg-amber-500/10 text-amber-500 text-[10px] font-baloo font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-500/20">PRO</span>
                  </div>
                  <p className="font-soleil text-sm text-slate-500 mt-1">Déclame un texte au micro, l'IA note ta prosodie en direct.</p>
                </div>
                <div className="text-slate-600 opacity-50 shrink-0"><Lock className="w-6 h-6" /></div>
              </div>

            </div>
          </div>

        </div>

        {/* COLONNE DROITE : Le Classement (Ligues) (Prend 1/3) */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-[#1E293B] p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-xl sticky top-8">
            
            <div className="text-center mb-8 pb-8 border-b border-slate-800">
              {/* Icône et nom de la Ligue Dynamiques */}
              <div className="text-6xl mb-4">{league.icon || "🥉"}</div>
              <h2 className={`font-baloo text-2xl font-bold ${league.color || "text-orange-400"}`}>Ligue {league.name || "Bronze"}</h2>
              <p className="font-soleil text-slate-400 text-sm mt-2">Le top 3 est promu au rang supérieur</p>
            </div>

            <div className="space-y-2">
              {LEADERBOARD.map((u) => (
                <div 
                  key={u.rank} 
                  className={`flex items-center justify-between p-3 md:p-4 rounded-2xl transition-all ${
                    u.isMe 
                    ? "bg-primary/20 border border-primary shadow-inner shadow-primary/10" 
                    : "hover:bg-[#0F172A] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className={`font-baloo font-bold text-lg w-6 text-center ${
                      u.rank === 1 ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" :
                      u.rank === 2 ? "text-slate-300" :
                      u.rank === 3 ? "text-amber-600" : "text-slate-600"
                    }`}>
                      {u.rank}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-baloo font-bold ${u.isMe ? 'bg-primary text-white' : 'bg-[#0F172A] text-slate-400 border border-slate-700'}`}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`font-soleil font-bold truncate max-w-25 md:max-w-30 ${u.isMe ? "text-white" : "text-slate-300"}`}>
                      {u.name}
                    </span>
                  </div>
                  <span className="font-baloo font-bold text-slate-400">{u.xp} <span className="text-xs text-slate-500">XP</span></span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-center bg-[#0F172A]/50 rounded-2xl p-4">
              <p className="font-soleil text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Fin de la ligue dans</p>
              <p className="font-baloo text-2xl font-black text-secondary">2j 14h 30m</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
"use client";

import { useUser } from "@/context/UserContext";
import { User, Lock, Star, BellRing, ShieldCheck, LogOut } from "lucide-react";
import PushNotification from "@/components/PushNotification"; 

export default function ComptePage() {
  const { xp, completedCourses, user, level, league, updateProfile, logout } = useUser();

  const XP_PER_LEVEL = 500;
  const currentLevel = level || Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const progressPercentage = Math.round((currentLevelXp / XP_PER_LEVEL) * 100);
  const AVATARS = ["👤", "🦉", "🦁", "👑", "🏛️", "⚡"];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-10">
      
      <div>
        <h1 className="font-baloo text-3xl md:text-4xl font-bold text-white mb-2">Mon Compte</h1>
        <p className="font-soleil text-slate-400 text-lg">Gère ton profil, tes statistiques et ton abonnement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLONNE GAUCHE : PROFIL & STATS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-indigo-500/20 to-transparent"></div>
            <div className="w-24 h-24 bg-[#0F172A] rounded-full flex items-center justify-center text-5xl border-4 border-indigo-500 shrink-0 shadow-lg z-10 mb-4">
              {user?.avatar || "👤"}
            </div>
            <div className="flex flex-wrap justify-center gap-2 bg-[#0F172A] p-2 rounded-2xl border border-slate-800 z-10 mb-4">
              {AVATARS.map(av => (
                <button 
                  key={av}
                  onClick={() => updateProfile(user?.name || "", av)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-slate-800 transition-colors ${user?.avatar === av ? 'bg-indigo-500/20 border border-indigo-500' : 'border border-transparent'}`}
                >
                  {av}
                </button>
              ))}
            </div>
            <h2 className="font-baloo text-2xl font-bold text-white z-10">{user?.name || "Orateur"}</h2>
            <p className="font-soleil text-slate-400 text-sm mb-6 z-10">Ligue {league?.name || "Bronze"}</p>
            <div className="w-full space-y-2 z-10">
              <div className="flex justify-between text-sm font-baloo font-bold">
                <span className="text-indigo-400">Niveau {currentLevel}</span>
                <span className="text-slate-400">{currentLevelXp} / {XP_PER_LEVEL} XP</span>
              </div>
              <div className="h-3 w-full bg-[#0F172A] rounded-full overflow-hidden border border-slate-700">
                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/50 text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="font-baloo text-xl font-bold text-white">{xp || 0}</div>
                <div className="font-soleil text-xs text-slate-400 uppercase tracking-wider">XP Total</div>
            </div>
            <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/50 text-center">
                <div className="text-2xl mb-1">{league?.icon || "🥉"}</div>
                <div className="font-baloo text-xl font-bold text-white">{league?.name}</div>
                <div className="font-soleil text-xs text-slate-400 uppercase tracking-wider">Ligue</div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : RÉGLAGES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* INFOS PERSO */}
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-baloo text-xl font-bold text-white mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-indigo-400" />
              Informations personnelles
            </h3>
            <div className="space-y-5">
              <input type="text" defaultValue={user?.name || ""} placeholder="Pseudo" className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
              <input type="email" defaultValue={user?.email || ""} placeholder="Email" className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-baloo font-bold transition-colors">
                Sauvegarder
              </button>
            </div>
          </div>

          {/* PRÉFÉRENCES & PUSH */}
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-700/50 bg-[#0F172A]/50 flex items-center gap-3">
              <BellRing className="w-5 h-5 text-indigo-400" />
              <h2 className="font-baloo text-xl font-bold text-white">Préférences et Notifications</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-2xl border border-slate-700/50">
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Alertes Mobiles</h3>
                  <p className="text-sm text-slate-400">Active les notifications Push pour ne rater aucun défi.</p>
                </div>
                <div className="ml-4 shrink-0">
                  <PushNotification />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4" />
                <span>Nous respectons ta vie privée.</span>
              </div>
            </div>
          </div>

          {/* DÉCONNEXION */}
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl font-baloo font-bold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter de l'appareil
          </button>
        </div>
      </div>
    </div>
  );
}
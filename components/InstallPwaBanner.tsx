"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare } from "lucide-react";

export default function InstallPwaBanner() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 1. Détecter si on est sur un appareil iOS (iPhone/iPad)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // 2. Détecter si l'application est déjà installée (Standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone);

    // 3. Si on est sur iOS ET que ce n'est pas installé, on affiche la bannière
    if (isIOS && !isStandalone) {
      // Petite astuce : on peut vérifier si on l'a déjà fermé pour ne pas spammer
      const hasDismissed = localStorage.getItem("agora_dismiss_install");
      if (!hasDismissed) {
        setShowPrompt(true);
      }
    }
  }, []);

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem("agora_dismiss_install", "true"); // On mémorise qu'il a fermé
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 animate-in slide-in-from-bottom-5">
      <div className="bg-[#1E293B] border-2 border-[#662483] rounded-3xl p-5 shadow-[0_0_30px_rgba(102,36,131,0.3)] relative">
        
        <button 
          onClick={dismissPrompt}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center border border-slate-700 shrink-0 shadow-inner">
            {/* L'icône de ta panthère fera fureur ici */}
            <span className="text-2xl">🐆</span> 
          </div>
          
          <div className="font-soleil">
            <h3 className="font-baloo text-lg font-bold text-white mb-1">
              Installe l'Agora sur ton iPhone
            </h3>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Pour recevoir les notifications de la Panthère et accéder au Studio IA, ajoute l'application à ton écran d'accueil.
            </p>
            
            <div className="bg-[#0F172A] p-3 rounded-xl border border-slate-700/50 flex flex-col gap-2 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="bg-[#1E293B] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <span>Appuie sur le bouton <Share className="w-4 h-4 inline mx-1 text-blue-400" /> dans Safari</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[#1E293B] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <span>Choisis <PlusSquare className="w-4 h-4 inline mx-1 text-slate-400" /> <strong>Sur l'écran d'accueil</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
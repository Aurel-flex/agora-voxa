"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TarifsPage() {
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà connecté
    const sessionEmail = localStorage.getItem("agora_session");
    if (sessionEmail) {
      setIsConnected(true);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 animate-in fade-in duration-500">
      
      {/* En-tête de la page */}
      <div className="text-center mb-16">
        <h1 className="font-baloo text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Investis dans ton <span className="text-secondary">Éloquence.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Commence gratuitement pour découvrir notre méthode, et passe à la vitesse supérieure quand tu es prêt à affronter l'arène.
        </p>
      </div>   

      {/* Grille des tarifs */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* CARTE 1 : FREEMIUM (Gratuit) */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col h-full">
          <div className="mb-8">
            <h2 className="font-baloo text-2xl font-bold text-slate-800 mb-2">Initié</h2>
            <p className="text-slate-500">L'essentiel pour découvrir la rhétorique.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-slate-900">0€</span>
              <span className="text-slate-500 font-medium">/ à vie</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1 text-slate-700 font-medium">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              Accès aux 3 premiers modules
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              1 défi quotidien dans l'Arène
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              Suivi de progression de base
            </li>
            <li className="flex items-start gap-3 text-slate-400">
              <span className="text-slate-300 text-xl">✗</span>
              Studio IA et retours personnalisés
            </li>
          </ul>

          <Link 
            href={isConnected ? "/dashboard" : "/inscription"} 
            className="w-full block text-center bg-slate-100 text-slate-800 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-colors"
          >
            {isConnected ? "Aller à l'entraînement" : "Commencer gratuitement"}
          </Link>
        </div>

        {/* CARTE 2 : PREMIUM (Mise en avant) */}
        <div className="bg-primary p-8 md:p-10 rounded-3xl shadow-2xl relative transform md:-translate-y-4 flex flex-col h-full border-4 border-primary/50">
          
          {/* Badge Populaire */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
            L'Élite de l'Agora
          </div>

          <div className="mb-8">
            <h2 className="font-baloo text-2xl font-bold text-white mb-2">Orateur Pro</h2>
            <p className="text-primary-foreground/80">Pour ceux qui veulent convaincre au quotidien.</p>
            <div className="mt-6 flex items-baseline gap-2 text-white">
              <span className="text-5xl font-extrabold">4,99€</span>
              <span className="text-primary-foreground/80 font-medium">/ mois</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1 text-white font-medium">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✦</span>
              <strong>Enregistrements vidéo et audio</strong> dans le Studio
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✦</span>
              Analyse détaillée de la <strong>prosodie</strong> et de la posture
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✦</span>
              Détection des tics de langages par la <strong>Panthère IA</strong>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✦</span>
              Badges exclusifs et ligues privées
            </li>
          </ul>

          <button 
            onClick={() => {
              if (isConnected) {
                router.push("/paiement");
              } else {
                router.push("/inscription");
              }
            }}
            className="w-full block text-center bg-white text-primary py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg"
          >
            {isConnected ? "Débloquer le mode Pro" : "S'inscrire pour débloquer"}
          </button>
        </div>

      </div>

      <div className="text-center mt-16 text-slate-500 font-medium">
        <p>Sans engagement. Annulable à tout moment en un seul clic.</p>
      </div>

    </div>
  );
}
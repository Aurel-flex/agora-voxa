"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, Hammer } from "lucide-react";

export default function PaiementPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 flex flex-col items-center justify-center p-4 py-10 font-soleil relative overflow-hidden">
      
      {/* Éclairage d'ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#662483]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-4xl relative z-10">
        {/* En-tête du checkout */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux offres
        </button>

        <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* COLONNE GAUCHE : Récapitulatif de commande (inchangée) */}
          <div className="w-full md:w-5/12 bg-[#0F172A] p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-700/50 flex flex-col justify-between">
            <div>
              <div className="font-baloo text-2xl font-bold text-[#d08df5] tracking-wider mb-8 flex items-center gap-2">
                AGORA-VOXA
              </div>
              
              <p className="text-slate-400 font-medium mb-2">Abonnement</p>
              <h2 className="font-baloo text-3xl font-bold text-white mb-6">Orateur Pro</h2>
              
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex justify-between border-b border-slate-700/50 pb-4">
                  <span>Accès Studio IA (Panthère)</span>
                  <span className="font-bold text-white">Inclus</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/50 pb-4">
                  <span>Analyse Prosodie & Posture</span>
                  <span className="font-bold text-white">Inclus</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span>Facturation mensuelle</span>
                  <span>4,99 €</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-700/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium">Total à payer</span>
                <span className="font-baloo text-3xl font-extrabold text-white">4,99 €</span>
              </div>
              <p className="text-xs text-slate-500">TVA incluse. Renouvellement automatique.</p>
            </div>
          </div>

          {/* COLONNE DROITE : Le "Fake Door" (Bientôt disponible) */}
          <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col items-center justify-center text-center">
            
            {/* Badge "Bientôt disponible" */}
            <div className="inline-flex items-center gap-2 bg-[#662483]/20 text-[#d08df5] px-4 py-2 rounded-full text-sm font-baloo font-bold uppercase tracking-widest border border-[#662483]/30 mb-6 shadow-inner shadow-[#662483]/20">
              <Sparkles className="w-4 h-4" /> Bientôt disponible
            </div>

            {/* Mascotte Athéna */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image 
                src="/mascotte-athena-reflexion.webp" 
                alt="Athéna prépare le Premium" 
                fill 
                className="object-contain drop-shadow-2xl animate-pulse"
              />
            </div>

            <h3 className="font-baloo text-3xl font-bold text-white mb-4">
              La forge est en cours...
            </h3>
            
            <p className="font-soleil text-slate-300 text-base mb-8 leading-relaxed">
              Athéna travaille d'arrache-pied pour finaliser l'expérience <strong className="text-[#d08df5] font-bold">Premium</strong>. L'analyse IA de ta voix sera ouverte très prochainement !
            </p>

            {/* Bloc d'avertissement */}
            <div className="w-full bg-[#0F172A] p-4 rounded-2xl border border-slate-800 mb-8 flex items-start gap-4 text-left shadow-inner">
              <div className="w-10 h-10 bg-[#662483]/20 rounded-full flex items-center justify-center shrink-0 border border-[#662483]/30">
                <Hammer className="w-5 h-5 text-[#d08df5]" />
              </div>
              <div>
                <h4 className="font-baloo font-bold text-white text-md">Paiements suspendus</h4>
                <p className="font-soleil text-xs text-slate-400 mt-1 leading-relaxed">
                  Garde tes XP au chaud en attendant l'ouverture officielle. La carte bancaire n'est pas encore requise.
                </p>
              </div>
            </div>

            {/* Call to Action de sortie */}
            <Link 
              href="/dashboard"
              className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-baloo font-bold text-lg transition-all shadow-lg border border-slate-700 hover:border-slate-600"
            >
               Retourner à l'Agora
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
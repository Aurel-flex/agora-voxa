"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, ShieldCheck, CreditCard, Loader2, CheckCircle2 } from "lucide-react";

export default function PaiementPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulation d'un appel à l'API de paiement (ex: Stripe)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirection vers le dashboard après le succès
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2500); // Faux chargement de 2.5 secondes
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 flex flex-col items-center justify-center p-4 py-10 font-soleil">
      
      <div className="w-full max-w-4xl">
        {/* En-tête du checkout */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux offres
        </button>

        <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* COLONNE GAUCHE : Récapitulatif de commande */}
          <div className="w-full md:w-5/12 bg-[#0F172A] p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-700/50 flex flex-col justify-between">
            <div>
              <div className="font-baloo text-2xl font-bold text-primary tracking-wider mb-8 flex items-center gap-2">
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

          {/* COLONNE DROITE : Formulaire de paiement */}
          <div className="w-full md:w-7/12 p-8 md:p-10 relative">
            
            {/* Overlay de succès */}
            {isSuccess && (
              <div className="absolute inset-0 bg-[#1E293B] z-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-24 h-24 text-emerald-400 mb-6 animate-bounce" />
                <h3 className="font-baloo text-3xl font-bold text-white mb-2">Paiement validé !</h3>
                <p className="text-slate-400 text-center px-6">
                  Bienvenue dans l'élite de l'Agora. La Panthère vous attend dans le Studio.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <h3 className="font-baloo text-2xl font-bold text-white flex items-center gap-2">
                Paiement sécurisé
              </h3>
              <div className="flex gap-2 opacity-60">
                <div className="w-10 h-6 bg-slate-100 rounded flex items-center justify-center"><span className="text-blue-600 font-bold text-xs italic">VISA</span></div>
                <div className="w-10 h-6 bg-slate-100 rounded flex items-center justify-center"><span className="text-red-500 font-bold text-xs">MC</span></div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              
              {/* Nom sur la carte */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nom sur la carte</label>
                <input 
                  type="text" 
                  required
                  placeholder="Jean Dupont"
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#662483] transition-colors"
                />
              </div>

              {/* Numéro de carte */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Numéro de carte</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    required
                    maxLength={19}
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-[#662483] transition-colors font-mono tracking-widest"
                  />
                </div>
              </div>

              {/* Expiration & CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Expiration</label>
                  <input 
                    type="text" 
                    required
                    maxLength={5}
                    placeholder="MM/AA"
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#662483] transition-colors font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">CVC</label>
                  <input 
                    type="text" 
                    required
                    maxLength={3}
                    placeholder="123"
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#662483] transition-colors font-mono text-center"
                  />
                </div>
              </div>

              {/* Bouton de paiement */}
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-[#662483] hover:bg-[#4d1b63] disabled:bg-slate-700 text-white py-4 rounded-xl font-baloo font-bold text-lg transition-all shadow-lg shadow-[#662483]/20 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Payer 4,99 €
                  </>
                )}
              </button>

              <div className="flex justify-center items-center gap-2 mt-4 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Vos données sont chiffrées de bout en bout.
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
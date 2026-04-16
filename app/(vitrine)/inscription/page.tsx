"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function InscriptionPage() {
  const router = useRouter();
  const { register } = useUser();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return; // Sécurité supplémentaire
    register(name, email);
    router.push("/dashboard"); 
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden bg-[#F8F9FA]">
      
      {/* Formes d'arrière-plan (Blobs) */}
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-[#B5B2C6] rounded-full opacity-60"></div>
      <div className="absolute top-10 -right-40 w-[35rem] h-[35rem] bg-[#7882B4] rounded-full opacity-60"></div>

      {/* Conteneur principal (Carte + Mascotte) */}
      <div className="relative z-10 w-full max-w-md mt-10">
        
        {/* Carte du formulaire */}
        <div className="bg-[#B5B2C6] p-8 md:p-10 rounded-[2rem] shadow-xl text-center relative z-20 border border-white/20">
          
          <h2 className="font-baloo text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Rejoindre l'Agora
          </h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <input 
              type="text" 
              placeholder="Ton pseudo" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400 rounded-xl border-none focus:ring-2 focus:ring-[#55518b] outline-none text-slate-800 transition-all"
            />
            
            <input 
              type="email" 
              placeholder="Ton adresse mail" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400 rounded-xl border-none focus:ring-2 focus:ring-[#55518b] outline-none text-slate-800 transition-all"
            />
            
            <div className="text-left">
              <input 
                type="password" 
                placeholder="Ton mot de passe" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400 rounded-xl border-none focus:ring-2 focus:ring-[#55518b] outline-none text-slate-800 transition-all mb-2"
              />
              <p className="text-[10px] text-slate-700 leading-tight pr-4">
                Ton mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.
              </p>
            </div>

            {/* Checkbox RGPD */}
            <div className="flex items-start gap-3 mt-4 text-left">
              <input 
                type="checkbox" 
                id="terms"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-400 text-[#55518b] focus:ring-[#55518b] cursor-pointer"
              />
              <label htmlFor="terms" className="text-[10px] text-slate-800 leading-tight cursor-pointer">
                J'accepte que mes données personnelles soient traitées pour la création et la gestion de mon compte, conformément à la <Link href="/confidentialite" className="underline hover:text-white">Politique de confidentialité</Link>.
              </label>
            </div>
            
            <button 
              type="submit" 
              disabled={!acceptedTerms}
              className="w-full mt-6 bg-[#55518b] hover:bg-[#433f80] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-baloo font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              S'inscrire
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-700 font-medium">
            Déjà membre ? <Link href="/connexion" className="text-slate-900 font-bold hover:underline">Se connecter</Link>
          </p>

        </div>

        {/* Mascotte (Panthère) positionnée par-dessus */}
        <div className="absolute -bottom-12 -right-16 z-30 w-48 h-48 pointer-events-none drop-shadow-2xl hidden md:block">
          <Image 
            src="/mascotte-athena-pouce.webp" // 👈 Remplace par le nom exact de ton image (avec fond transparent)
            alt="Mascotte"
            fill
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}
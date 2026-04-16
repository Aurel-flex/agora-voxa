"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useUser();
  
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false); 

    const success = login(identifier); 
    
    if (success) {
      router.push("/dashboard"); 
    } else {
      setError(true); 
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden bg-[#F8F9FA]">
      
      {/* Formes d'arrière-plan (Blobs) */}
      <div className="absolute -bottom-32 -left-20 w-[24rem] h-[24rem] bg-[#7882B4] rounded-full opacity-80"></div>
      <div className="absolute top-20 -right-20 w-[20rem] h-[20rem] bg-[#B5B2C6] rounded-full opacity-80"></div>

      {/* Conteneur principal (Carte + Mascotte) */}
      <div className="relative z-10 w-full max-w-md mt-10">
        
        {/* Carte du formulaire */}
        <div className="bg-[#B5B2C6] p-8 md:p-10 rounded-[2rem] shadow-xl text-center relative z-20 border border-white/20">
          
          <h2 className="font-baloo text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Connexion
          </h2>
          
          {error && (
            <div className="bg-rose-100 text-rose-600 p-3 rounded-xl mb-6 text-sm font-bold border border-rose-200 animate-shake">
              Identifiants introuvables. Vérifie ton pseudo/email.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <input 
              type="text" 
              inputMode="text"
              placeholder="Ton pseudo/email" 
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400/80 rounded-xl border-none focus:ring-2 focus:ring-[#55518b] outline-none text-slate-800 transition-all font-soleil text-sm md:text-base"
            />
            
            <input 
              type="password" 
              placeholder="Ton mot de passe" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400/80 rounded-xl border-none focus:ring-2 focus:ring-[#55518b] outline-none text-slate-800 transition-all font-soleil text-sm md:text-base"
            />
            
            <button 
              type="submit" 
              className="w-full mt-6 bg-[#55518b] hover:bg-[#433f80] text-white px-8 py-3.5 rounded-xl font-baloo font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-700 font-medium font-soleil">
            Pas encore de compte ? <Link href="/inscription" className="text-slate-900 font-bold hover:underline">S'inscrire</Link>
          </p>

        </div>

        {/* Mascotte (Panthère) positionnée par-dessus */}
        <div className="absolute -bottom-16 -right-24 z-30 w-56 h-56 pointer-events-none drop-shadow-2xl hidden md:block">
          <Image 
            src="/mascotte-athena-applause.webp" // 👈 N'oublie pas de mettre le vrai nom de ton image de panthère ici !
            alt="Mascotte Panthère"
            fill
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { Eye, EyeOff, Loader2 } from "lucide-react"; 

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useUser();
  
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false); 
    setIsLoading(true); 

    const success = await login(identifier, password); 
    
    if (success) {
      router.push("/dashboard"); 
    } else {
      setError(true); 
      setIsLoading(false); 
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden bg-[#F8F9FA]">
      
      {/* 💡 Formes d'arrière-plan (Blobs) - RETOUR À LA CHARTE (Violet et Bleu profond) */}
      <div className="absolute -bottom-32 -left-20 w-[24rem] h-[24rem] bg-[#662483] rounded-full opacity-20"></div>
      <div className="absolute top-20 -right-20 w-[20rem] h-[20rem] bg-[#253c7a] rounded-full opacity-15"></div>

      {/* Conteneur principal */}
      <div className="relative z-10 w-full max-w-md mt-10">
        
        {/* 💡 Carte du formulaire - Dégradé subtil vers un mauve très très clair */}
        <div className="bg-gradient-to-bl from-white/90 via-[#F8F9FA]/90 to-[#F3E8FF]/60 p-8 md:p-10 rounded-[2rem] shadow-xl text-center relative z-20 border border-white/60">
          
          <h2 className="font-baloo text-3xl md:text-4xl font-extrabold text-[#662483] mb-8 tracking-tight">
            Connexion
          </h2>
          
          {error && (
            <div className="bg-rose-100 text-rose-600 p-3 rounded-xl mb-6 text-sm font-bold border border-rose-200 animate-shake">
              Identifiants incorrects. Vérifie ton adresse email et ton mot de passe.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              inputMode="email"
              placeholder="Ton adresse email" 
              required
              disabled={isLoading}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              // 💡 Focus ring Violet Agora
              className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400/80 rounded-xl border-none focus:ring-2 focus:ring-[#662483] outline-none text-slate-800 transition-all font-soleil text-sm md:text-base disabled:opacity-50"
            />
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Ton mot de passe" 
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // 💡 Focus ring Violet Agora
                className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400/80 rounded-xl border-none focus:ring-2 focus:ring-[#662483] outline-none text-slate-800 transition-all font-soleil text-sm md:text-base pr-12 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors p-1 disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* 💡 Bouton Violet Agora dynamique */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-[#662483] hover:bg-[#8631ab] focus:ring-2 focus:ring-[#662483] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-baloo font-bold text-lg transition-all shadow-lg shadow-[#662483]/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {/* 💡 Lien de redirection violet */}
          <p className="mt-6 text-sm text-slate-700 font-medium font-soleil">
            Pas encore de compte ? <Link href="/inscription" className="text-[#662483] font-bold hover:underline">S'inscrire</Link>
          </p>

        </div>

        <div className="absolute -bottom-16 -right-24 z-30 w-56 h-56 pointer-events-none drop-shadow-2xl hidden md:block">
          <Image 
            src="/mascotte-athena-applause.webp" 
            alt="Mascotte Panthère"
            fill
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}
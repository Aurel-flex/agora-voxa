"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // 👈 Ajout de Loader2 pour l'animation

export default function InscriptionPage() {
  const router = useRouter();
  const { register } = useUser();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(""); 
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 💡 NOUVEAU : L'état de chargement

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    
    if (!acceptedTerms) return; 
    
    if (password.length < 6) {
      setError("Ton mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // 💡 NOUVEAU : On bloque le formulaire le temps que Firebase réponde
    setIsLoading(true);

    try {
      await register(name, email, password); 
      router.push("/dashboard"); 
    } catch (err: any) {
      console.error("Échec de l'inscription :", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Ce compte existe déjà. Connecte-toi !");
      } else {
        setError("Oups, une erreur est survenue lors de l'inscription.");
      }
      // 💡 NOUVEAU : On débloque le bouton seulement s'il y a une erreur
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden bg-[#F8F9FA]">
      
      {/* 💡 Formes d'arrière-plan (Blobs) - COULEURS PLUS RICHES ET SATURÉES */}
      <div className="absolute -bottom-32 -left-20 w-112 h-112 bg-[#AAA5C9] rounded-full opacity-60"></div>
      <div className="absolute top-10 -right-40 w-160 h-160 bg-[#8595D3] rounded-full opacity-60"></div>

      {/* Conteneur principal (Carte + Mascotte) */}
      <div className="relative z-10 w-full max-w-md mt-10">
        
        {/* 💡 Carte du formulaire - DÉGRADÉ PLUS CLAIR ET DYNAMIQUE */}
        <div className="bg-gradient-to-br from-white/90 via-[#F8F9FA]/80 to-[#EBE9F3] p-8 md:p-10 rounded-4xl shadow-xl text-center relative z-20 border border-white/20">
          
          <h2 className="font-baloo text-3xl md:text-4xl font-extrabold text-[#253c7a] mb-8 tracking-tight">
            Rejoindre l'Agora
          </h2>
          {error && (
            <div className="bg-rose-100 text-rose-600 p-3 rounded-xl mb-6 text-sm font-bold border border-rose-200 animate-shake">
              {error}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <input 
              type="text" 
              placeholder="Ton pseudo" 
              required
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              // 💡 Focus ring indigo plus clair
              className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400 rounded-xl border-none focus:ring-2 focus:ring-[#6366F1] outline-none text-slate-800 transition-all disabled:opacity-50"
            />
            
            <input 
              type="email" 
              placeholder="Ton adresse mail" 
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // 💡 Focus ring indigo plus clair
              className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400 rounded-xl border-none focus:ring-2 focus:ring-[#6366F1] outline-none text-slate-800 transition-all disabled:opacity-50"
            />
            
            <div className="text-left">
              <div className="relative mb-2">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Ton mot de passe" 
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // 💡 Focus ring indigo plus clair
                  className="w-full p-3.5 bg-[#E2E4E9]/80 placeholder-slate-400 rounded-xl border-none focus:ring-2 focus:ring-[#6366F1] outline-none text-slate-800 transition-all pr-12 disabled:opacity-50"
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
                disabled={isLoading}
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                // 💡 Checkbox indigo plus clair
                className="mt-1 w-4 h-4 rounded border-slate-400 text-[#6366F1] focus:ring-[#6366F1] cursor-pointer disabled:opacity-50"
              />
              {/* 💡 Lien de confidentialité indigo plus clair */}
              <label htmlFor="terms" className="text-[10px] text-slate-800 leading-tight cursor-pointer">
                J'accepte que mes données personnelles soient traitées pour la création et la gestion de mon compte, conformément à la <Link href="/confidentialite" className="underline text-[#6366F1] hover:text-[#5B67D8]">Politique de confidentialité</Link>.
              </label>
            </div>
            
            {/* 💡 NOUVEAU : Le bouton gère le chargement et se désactive - INDIGO PLUS RICHE ET NET */}
            <button 
              type="submit" 
              disabled={!acceptedTerms || isLoading}
              // 💡 Indigo plus riche et focus ring indigo clair
              className="w-full flex items-center justify-center gap-2 mt-6 bg-[#5B67D8] hover:bg-[#6366F1] focus:ring-2 focus:ring-[#6366F1] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-baloo font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Création en cours...
                </>
              ) : (
                "S'inscrire"
              )}
            </button>
          </form>

          {/* 💡 Lien de connexion indigo plus clair */}
          <p className="mt-6 text-sm text-slate-700 font-medium">
            Déjà membre ? <Link href="/connexion" className="text-[#6366F1] font-bold hover:underline">Se connecter</Link>
          </p>

        </div>

        {/* Mascotte (Panthère) positionnée par-dessus */}
        <div className="absolute -bottom-12 -right-16 z-30 w-48 h-48 pointer-events-none drop-shadow-2xl hidden md:block">
          <Image 
            src="/mascotte-athena-pouce.webp" 
            alt="Mascotte"
            fill
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}
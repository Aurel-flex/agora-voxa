"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Image from "next/image"; // Import pour gérer l'image proprement

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useUser();
  
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState(""); // Ajout du state pour le mot de passe
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false); // Reset l'erreur à chaque tentative

    // On passe l'identifiant au login. 
    // Rappel : vérifie que dans UserContext, login accepte bien le pseudo !
    const success = login(identifier); 
    
    if (success) {
      router.push("/dashboard"); 
    } else {
      setError(true); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fade-in">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl text-center relative overflow-hidden">
        
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        
    <div className="relative w-32 h-32 mx-auto animate-bounce">
                <Image 
                  src="/mascotte-athena-simple.png" 
                  alt="Mascotte Panthère" 
                  fill 
                  className="object-contain"
                />
              </div>
        <h2 className="font-baloo text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 relative z-10">Connexion</h2>
        <p className="font-soleil text-slate-500 mb-8 relative z-10">Heureux de te revoir dans l'Agora !</p>
        
        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl mb-6 font-soleil font-bold border border-rose-200 relative z-10 animate-shake">
            Ce compte n'existe pas. Vérifie tes identifiants ou inscris-toi.
          </div>
        )}

        {/* noValidate empêche le navigateur de forcer le format email */}
        <form onSubmit={handleLogin} className="space-y-5 relative z-10" noValidate>
          
          <div className="text-left">
            <label htmlFor="identifier" className="font-baloo font-bold text-slate-700 ml-2 mb-1 block">
              Email ou Pseudo
            </label>
            <input 
              id="identifier"
              type="text" 
              inputMode="text" // Aide les mobiles à ne pas forcer le clavier email
              placeholder="Ex: ciceron99 ou jean@mail.com" 
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full p-4 font-soleil bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-slate-900"
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="font-baloo font-bold text-slate-700 ml-2 mb-1 block">
              Mot de passe
            </label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 font-soleil bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-slate-900"
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 bg-primary hover:bg-[#433f80] text-white px-8 py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-95"
          >
            Se connecter
          </button>
        </form>
        
        <p className="mt-8 text-slate-500 font-soleil font-medium relative z-10">
          Pas encore de compte ? <Link href="/inscription" className="text-secondary hover:text-[#253c7a] font-bold transition-colors">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
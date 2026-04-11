"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function InscriptionPage() {
  const router = useRouter();
  const { register } = useUser(); // On récupère notre fonction de création de compte
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email); // Crée le compte et connecte l'utilisateur
    router.push("/dashboard"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-sm text-center">
        <div className="text-5xl mb-4 animate-bounce">🏛️</div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Rejoins l'Agora</h2>
        
        <form onSubmit={handleRegister} className="space-y-4 mt-8">
          <input 
            type="text" 
            placeholder="Ton pseudo d'orateur" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none"
          />
          <input 
            type="email" 
            placeholder="Ton adresse email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none"
          />
          <input 
            type="password" 
            placeholder="Ton mot de passe" 
            required
            className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none"
          />
          
          <button type="submit" className="w-full bg-primary hover:bg-[#433f80] text-white px-8 py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-lg hover:scale-105">
            Créer mon compte
          </button>
        </form>
        <p className="mt-6 text-slate-500 font-medium">
          Déjà un compte ? <Link href="/connexion" className="text-accent font-bold">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/UserContext"; // 👈 1. On importe notre contexte !

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 
  const router = useRouter();
  
  // 👈 2. On récupère directement l'utilisateur et la fonction de déconnexion
  const { user, logout } = useUser(); 
  
  const closeMenu = () => setIsOpen(false);
  const isAppMode = pathname.startsWith("/dashboard") || pathname.startsWith("/cours");
  const isActive = (path: string) => pathname === path;

// Fonction pour gérer la déconnexion proprement
  const handleLogout = async () => {
    try {
      await logout(); // 👈 Le UserContext va gérer la redirection tout seul
      closeMenu();
      // On supprime la ligne router.push("/") qui causait le conflit !
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  if (pathname.startsWith("/cours")) return null;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto w-full relative">
        
        {/* LOGO & NOM DE LA MARQUE */}
        <Link href={isAppMode ? "/dashboard" : "/"} onClick={closeMenu} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Image 
            src="/logo-agoravoxa.webp" 
            alt="Logo Agora-Voxa" 
            width={40}
            height={40} 
            className="object-contain"
            priority 
          />
          <span className="font-baloo text-2xl font-bold text-primary tracking-wider mt-1">
            AGORA-VOXA
          </span>
        </Link>
        
        {/* --- LIENS DESKTOP --- */}
        <div className="hidden md:flex items-center gap-6 font-soleil font-medium text-base">
          {isAppMode ? (
            /* Menu Application (Si tu utilises encore cette barre dans l'app) */
            <>
              <Link href="/dashboard" className={`transition-colors ${isActive("/dashboard") ? "text-primary font-bold" : "text-slate-600 hover:text-primary"}`}>Parcours</Link>
              <Link href="/dashboard/arene" className={`transition-colors flex items-center gap-1 ${isActive("/dashboard/arene") ? "text-primary font-bold" : "text-slate-600 hover:text-primary"}`}>Arène 🛡️</Link>
              <Link href="/dashboard/profil" className={`transition-colors ${isActive("/dashboard/profil") ? "text-primary font-bold" : "text-slate-600 hover:text-primary"}`}>Profil</Link>
              <Link href="/dashboard/compte" className="font-baloo bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition-all font-bold flex items-center gap-2">
                ⚙️ Compte
              </Link>
              <button onClick={handleLogout} className="text-slate-400 hover:text-rose-500 transition-colors font-bold ml-2">
                Déconnexion
              </button>
            </>
          ) : (
            /* Menu Vitrine */
            <>
              <Link href="/concept" className={`transition-colors ${isActive("/concept") ? "text-accent font-bold" : "text-slate-600 hover:text-primary"}`}>Concept</Link>
              <Link href="/pedagogie" className={`transition-colors ${isActive("/pedagogie") ? "text-accent font-bold" : "text-slate-600 hover:text-primary"}`}>Pédagogie</Link>
              <Link href="/tarifs" className={`transition-colors ${isActive("/tarifs") ? "text-accent font-bold" : "text-slate-600 hover:text-primary"}`}>Tarifs</Link>
              <Link href="/blog" className={`transition-colors ${isActive("/blog") || pathname.startsWith("/blog/") ? "text-accent font-bold" : "text-slate-600 hover:text-primary"}`}>Blog</Link>
              
              <div className="flex items-center gap-4 ml-2 pl-6 border-l border-slate-200">
                {/* 💡 CONDITION : On utilise 'user' au lieu de l'ancien 'isConnected' */}
                {user ? (
                  <>
                    <button 
                      onClick={handleLogout} 
                      className="text-slate-400 hover:text-rose-500 font-bold transition-colors text-sm"
                    >
                      Déconnexion
                    </button>
                    <Link 
                      href="/dashboard" 
                      className="bg-accent hover:bg-[#433f80] text-white px-6 py-3 rounded-2xl font-baloo font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2"
                    >
                      Retour à l'Agora ➔
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/inscription" className={`transition-colors ${isActive("/inscription") || pathname.startsWith("/inscription/") ? "text-accent font-bold" : "text-slate-900 hover:text-primary"}`}>
                      Inscription
                    </Link>
                    <Link href="/connexion" className="bg-accent hover:bg-[#433f80] text-white px-8 py-3 rounded-2xl font-baloo font-bold transition-all shadow-lg hover:scale-105">
                     Connexion
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* --- BOUTON BURGER (MOBILE) --- */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600 hover:text-primary focus:outline-none">
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </nav>

      {/* --- MENU MOBILE DÉROULANT --- */}
      {isOpen && (
        <div className="md:hidden absolute top-[73px] left-0 w-full bg-white border-b border-slate-200 shadow-xl flex flex-col px-4 py-6 gap-6 z-40 font-soleil">
          {isAppMode ? (
            <>
              <Link href="/dashboard/parcours" onClick={closeMenu} className={`text-lg ${isActive("/dashboard/parcours") ? "text-primary font-bold" : "text-slate-700 font-medium"}`}>Parcours</Link>
              <Link href="/dashboard/arene" onClick={closeMenu} className={`text-lg ${isActive("/dashboard/arene") ? "text-primary font-bold" : "text-slate-700 font-medium"}`}>Arène & Défis</Link>
              <Link href="/dashboard/profil" onClick={closeMenu} className={`text-lg ${isActive("/dashboard/profil") ? "text-primary font-bold" : "text-slate-700 font-medium"}`}>Mon Profil</Link>
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Link href="/dashboard/compte" onClick={closeMenu} className="font-baloo flex justify-center bg-slate-100 text-slate-700 px-5 py-3 rounded-xl font-bold text-lg">
                  ⚙️ Réglages
                </Link>
                <button onClick={handleLogout} className="font-baloo flex justify-center bg-rose-50 text-rose-500 px-5 py-3 rounded-xl font-bold text-lg border border-rose-100">
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/concept" onClick={closeMenu} className={`text-lg ${isActive("/concept") ? "text-primary font-bold" : "text-slate-700 font-medium"}`}>Concept</Link>
              <Link href="/pedagogie" onClick={closeMenu} className={`text-lg ${isActive("/pedagogie") ? "text-primary font-bold" : "text-slate-700 font-medium"}`}>Pédagogie</Link>
              <Link href="/tarifs" onClick={closeMenu} className={`text-lg ${isActive("/tarifs") ? "text-primary font-bold" : "text-slate-700 font-medium"}`}>Tarifs</Link>
              <Link href="/blog" onClick={closeMenu} className={`text-lg ${isActive("/blog") || pathname.startsWith("/blog/") ? "text-primary font-bold" : "text-slate-700 font-medium"}`}>Blog</Link>
              
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                {/* 💡 CONDITION MOBILE : On utilise 'user' */}
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={closeMenu} className="font-baloo flex justify-center bg-accent text-white px-5 py-3 rounded-xl font-bold text-lg">
                      Retour à l'Agora ➔
                    </Link>
                    <button onClick={handleLogout} className="font-baloo flex justify-center bg-rose-50 text-rose-500 px-5 py-3 rounded-xl font-bold text-lg border border-rose-100">
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/inscription" onClick={closeMenu} className="font-baloo flex justify-center bg-slate-50 text-slate-700 px-5 py-3 rounded-xl font-bold text-lg border border-slate-200">
                      Inscription
                    </Link>
                    <Link href="/connexion" onClick={closeMenu} className="font-baloo flex justify-center bg-accent text-white px-5 py-3 rounded-xl font-bold text-lg">
                      Connexion
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
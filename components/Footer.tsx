"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Ici, tu pourras relier ça à Mailchimp, Brevo ou ton backend plus tard
    setIsSubscribed(true);
    setEmail("");
    
    // Remet le formulaire à zéro après 3 secondes
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#0B1120] border-t border-slate-800 text-slate-300 font-soleil pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* COLONNE 1 : Marque & Newsletter (Prend plus de place) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="font-baloo text-3xl font-bold text-white tracking-wider flex items-center gap-2">
              AGORA-VOXA
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              L'arène de la prise de parole. Maîtrisez l'art de convaincre grâce à notre IA d'analyse et nos parcours inspirés des plus grands orateurs.
            </p>
            
            {/* Zone Newsletter */}
            <div className="mt-8 bg-[#0F172A] p-6 rounded-2xl border border-slate-800 shadow-lg">
              <h3 className="font-baloo text-lg font-bold text-white mb-2">Notre Newsletter</h3>
              <p className="text-sm text-slate-400 mb-4">Reçois un conseil d'éloquence par semaine. Pas de spam, promis.</p>
              
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-3 rounded-xl border border-emerald-400/20 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold text-sm">Bienvenue dans l'arène !</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton-email@exemple.com" 
                    required
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white text-sm focus:outline-none focus:border-[#662483] transition-colors"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 p-1.5 bg-[#662483] hover:bg-[#4d1b63] text-white rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* COLONNE 2 : Liens Rapides */}
          <div className="md:col-span-2 md:col-start-7 space-y-4">
            <h4 className="font-baloo text-white font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/concept" className="hover:text-[#d08df5] transition-colors">Le Concept</Link></li>
              <li><Link href="/pedagogie" className="hover:text-[#d08df5] transition-colors">Pédagogie</Link></li>
              <li><Link href="/tarifs" className="hover:text-[#d08df5] transition-colors">Tarifs</Link></li>
              <li><Link href="/blog" className="hover:text-[#d08df5] transition-colors">Blog & Ressources</Link></li>
            </ul>
          </div>

          {/* COLONNE 3 : Support & Légal */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-baloo text-white font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">CGV & CGU</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
            </ul>
          </div>

        </div>

        {/* LIGNE DU BAS : Copyright & Réseaux Sociaux */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Agora-Voxa. Tous droits réservés.
          </p>
          
       <div className="flex items-center gap-4">
            {/* INSTAGRAM */}
            <a href="https://www.instagram.com/agoravoxa/" target="_blank" className="w-10 h-10 rounded-full bg-[#0F172A] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#662483] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
                  {/* TIKTOK */}
            <a href="#" className="w-10 h-10 rounded-full bg-[#0F172A] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#662483] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
              </svg>
            </a> 
            {/* LINKEDIN */}
            <a href="#" className="w-10 h-10 rounded-full bg-[#0F172A] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#662483] transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            

          </div>
        </div>

      </div>
    </footer>
  );
}
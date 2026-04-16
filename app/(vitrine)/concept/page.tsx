import Link from "next/link";
import Image from 'next/image';
import { Trophy, Flame } from "lucide-react"; // 👈 N'oublie pas cet import !

export default function ConceptPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 font-soleil">
      
      {/* En-tête */}
      <div className="text-center mb-16 md:mb-24">
        <h1 className="font-baloo text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          L'arène <span className="text-secondary">Gamifiée.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Apprendre l'art oratoire demande de la pratique. Nous avons transformé cet apprentissage en un jeu captivant pour que tu ne perdes jamais ta motivation.
        </p>
      </div>

      {/* Grille des fonctionnalités (1 colonne sur mobile, 3 sur PC) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* CARTE 1 : Ligues */}
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm text-center hover:border-primary/50 transition-all group">
          {/* Bloc Icône stylisé */}
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-baloo text-2xl font-bold text-slate-800 mb-3">Niveaux & Ligues</h2>
          <p className="text-slate-600">Monte en grade. Commence comme Apprenti et deviens un Maître du Logos en affrontant des défis quotidiens.</p>
        </div>

        {/* CARTE 2 : Athéna */}
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm text-center hover:border-secondary/50 transition-all group">
          {/* Bloc Image de même taille que les icônes (w-20 h-20) */}
          <div className="w-20 h-20 mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
            <Image 
              src="/mascotte-athena-pouce.webp"  
              alt="Mascotte Agora-Voxa"     
              fill // Permet à l'image de s'adapter parfaitement à son bloc parent
              className="object-contain drop-shadow-md" 
            />
          </div>
          <h2 className="font-baloo text-2xl font-bold text-slate-800 mb-3">Athéna</h2>
          <p className="text-slate-600">Notre mascotte t'accompagne, te corrige avec bienveillance et célèbre tes victoires à chaque étape.</p>
        </div>

        {/* CARTE 3 : Séries */}
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm text-center hover:border-amber-500/50 transition-all group">
          {/* Bloc Icône stylisé */}
          <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Flame className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="font-baloo text-2xl font-bold text-slate-800 mb-3">Séries</h2>
          <p className="text-slate-600">5 minutes par jour suffisent. Maintiens ta flamme d'apprentissage allumée pour débloquer des récompenses.</p>
        </div>

      </div>

      <div className="text-center">
        <Link 
          href="/inscription"
          className="inline-block bg-primary hover:bg-[#433f80] text-white px-8 py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-lg hover:scale-105"
        >
          Relever le défi
        </Link>
      </div>
      
    </div>
  );
}
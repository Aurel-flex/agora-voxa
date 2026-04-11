import Link from "next/link";
import Image from 'next/image';
export default function ConceptPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      {/* En-tête */}
      <div className="text-center mb-16 md:mb-24">
        <h1 className="font-baloo text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          L'arène <span className="text-secondary">Gamifiée.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Apprendre l'art oratoire demande de la pratique. Nous avons transformé cet apprentissage en un jeu captivant pour que vous ne perdiez jamais votre motivation.
        </p>
      </div>

      {/* Grille des fonctionnalités (1 colonne sur mobile, 3 sur PC) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm text-center hover:border-accent transition-colors">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="font-baloo text-2xl font-bold text-secondary mb-3">Niveaux & Ligues</h2>
          <p className="text-slate-600">Montez en grade. Commencez comme Apprenti et devenez un Maître du Logos en affrontant des défis quotidiens.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm text-center hover:border-accent transition-colors">
          <Image 
                  src="/mascotte-athena-pouce.png"  // Le nom exact de ton fichier dans 'public'
                  alt="Mascotte Agora-Voxa"     // Texte alternatif (super important pour le SEO et l'accessibilité)
                  width={50}                   // Largeur en pixels
                  height={50}                  // Hauteur en pixels
                  className="mx-auto mb-4 drop-shadow-lg hover:scale-105 transition-transform" // Tu peux utiliser Tailwind dessus !
                />
          <h2 className="font-baloo text-2xl font-bold text-secondary mb-3">Votre Mentor</h2>
          <p className="text-slate-600">Notre mascotte vous accompagne, vous corrige avec bienveillance et célèbre vos victoires à chaque étape.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm text-center hover:border-accent transition-colors">
          <div className="text-6xl mb-4">🔥</div>
          <h2 className="font-baloo text-2xl font-bold text-secondary mb-3">Séries (Streaks)</h2>
          <p className="text-slate-600">5 minutes par jour suffisent. Maintenez votre flamme d'apprentissage allumée pour débloquer des récompenses.</p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/inscription"className="bg-primary hover:bg-[#433f80] text-white px-8 py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-lg hover:scale-105">
          Relever le défi
        </Link>
      </div>
    </div>
  );
}
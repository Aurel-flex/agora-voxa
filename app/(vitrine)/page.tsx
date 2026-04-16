import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
<Image 
        src="/mascotte-athena-pouce.webp"  // Le nom exact de ton fichier dans 'public'
        alt="Mascotte Agora-Voxa"     // Texte alternatif (super important pour le SEO et l'accessibilité)
        width={150}                   // Largeur en pixels
        height={150}                  // Hauteur en pixels
        className="drop-shadow-lg hover:scale-105 transition-transform" // Tu peux utiliser Tailwind dessus !
      />
      <h1 className="font-baloo text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight max-w-4xl">
        {/* On utilise ton violet en accentuation ici */}
        Deviens un maître de la <span className="text-secondary">rhétorique.</span>
      </h1>
      
      <p className="text-xl text-slate-600 max-w-2xl mb-10">
        Agora.Voxa combine la rigueur d'OpenClassrooms et le côté addictif de Duolingo pour t'apprendre l'art de convaincre.
      </p>
      
      {/* Ton bouton principal utilise maintenant ta couleur primaire, et la secondaire au survol ! */}
      <Link 
        href="/inscription" 
        className="bg-primary hover:bg-[#433f80] text-white px-8 py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-lg hover:scale-105"
      >
        Commencer l'entraînement gratuit
      </Link>
    </div>
  );
}
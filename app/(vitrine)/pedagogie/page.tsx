import Link from "next/link";

export default function PedagogiePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="font-baloo text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          L'excellence <span className="text-secondary">Académique.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Derrière le jeu se cache une méthode rigoureuse, inspirée des plus grandes écoles de rhétorique, structurée étape par étape.
        </p>
      </div>

      <div className="space-y-24">
        {/* Bloc 1 : Vidéos (Texte à gauche, Visuel à droite) */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary">Des cours en vidéo clairs et concis</h2>
            <p className="text-lg text-slate-600">
              Nos experts décomposent les figures de style, de l'anaphore au syllogisme. Regardez des analyses de discours célèbres pour comprendre comment la théorie s'applique dans la réalité.
            </p>
            <ul className="space-y-3 text-slate-700 font-medium">
              <li className="flex items-center gap-2">✅ Format court (1 à 5 minutes)</li>
              <li className="flex items-center gap-2">✅ Exemples historiques concrets</li>
              <li className="flex items-center gap-2">✅ Transcriptions incluses</li>
            </ul>
          </div>
          
          {/* 💡 LECTEUR CLOUDINARY INTÉGRÉ ICI */}
          <div className="flex-1 w-full bg-slate-900 rounded-3xl aspect-video shadow-xl relative overflow-hidden border border-slate-200">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dz8g1qhyj&public_id=Agora-Voxa_1_m9l3o9"
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        </div>

        {/* Bloc 2 : Quiz (Visuel à gauche, Texte à droite - inversion responsive) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="font-baloo text-3xl md:text-4xl font-bold text-secondary">Pratique immédiate via nos Quiz</h2>
            <p className="text-lg text-slate-600">
              Ne soyez pas passif. Après chaque notion abordée, validez vos acquis grâce à nos quiz interactifs. Identifiez les failles dans un argumentaire et choisissez la bonne répartie.
            </p>
          </div>
          {/* Faux Quiz pour illustrer */}
          <div className="flex-1 w-full bg-slate-50 border-2 border-slate-200 p-8 rounded-3xl shadow-lg">
            <p className="font-bold text-slate-800 mb-4">Identifiez la figure de style :</p>
            <p className="italic text-slate-600 mb-6">"Je me meurs, je suis mort, je suis enterré."</p>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border-2 border-slate-200 text-slate-500">Une anaphore</div>
              <div className="p-4 rounded-xl border-2 border-[#662483] bg-[#662483]/5 text-[#662483] font-bold flex justify-between">
                Une gradation <span>✅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-baloo text-center mt-24">
        {/* 💡 Bouton mis à jour avec le style unifié de ton UI Kit */}
        <Link 
          href="/inscription" 
          className="inline-flex items-center justify-center gap-2 bg-[#662483] hover:bg-[#8631ab] text-white px-8 py-4 rounded-xl font-baloo font-bold text-xl transition-all shadow-lg shadow-[#662483]/20 hover:shadow-xl hover:-translate-y-0.5 focus:ring-2 focus:ring-[#662483] focus:ring-offset-2"
        >
          Commencer la formation
        </Link>
      </div>
    </div>
  );
}
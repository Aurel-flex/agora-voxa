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
              <li className="flex items-center gap-2">✅ Format court (3 à 5 minutes)</li>
              <li className="flex items-center gap-2">✅ Exemples historiques concrets</li>
              <li className="flex items-center gap-2">✅ Transcriptions incluses</li>
            </ul>
          </div>
          {/* Fausse vidéo pour illustrer */}
          <div className="flex-1 w-full bg-slate-800 rounded-3xl aspect-video flex items-center justify-center shadow-xl relative overflow-hidden">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
            </div>
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
              <div className="p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary font-bold flex justify-between">
                Une gradation <span>✅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-baloo text-center mt-24">
        <Link href="/inscription" className="bg-primary hover:bg-[#433f80] text-white px-8 py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-lg hover:scale-105">
          Commencer la formation
        </Link>
      </div>
    </div>
  );
}
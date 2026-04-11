import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Simulation de l'article avec un teasing sur tes futures fonctionnalités premium (Audio/Vidéo)
  const article = {
    title: "Maîtriser sa voix : L'impact de la prosodie et du choix des mots",
    category: "Éloquence",
    date: "18 Mars 2026",
    readTime: "6 min",
    author: "L'équipe Agora-Voxa",
    content: `
      <p>Le fond d'un discours ne suffit pas. L'histoire politique et littéraire nous montre que la forme est souvent reine. Apprenez comment le rythme, les silences et un vocabulaire chirurgical transforment une prise de parole banale en un moment mémorable.</p>
      
      <h2>1. La prosodie : La musique de vos mots</h2>
      <p>La prosodie englobe le rythme, l'intonation et l'accentuation de votre voix. Une voix monotone endort l'auditoire en moins de trois minutes, peu importe la fulgurance de vos idées. Varier son débit de parole, savoir ralentir sur les mots-clés et marquer des pauses dramatiques sont les armes secrètes des grands orateurs.</p>
      
      <h2>2. Le poids du vocabulaire</h2>
      <p>Utiliser le mot juste, c'est comme utiliser un scalpel plutôt qu'un marteau. Les tics de langage ("du coup", "en fait", "voilà") diluent votre message et affaiblissent votre <em>Ethos</em> (votre crédibilité). Remplacer ces hésitations par des silences assumés demande de l'entraînement, mais le résultat est sans appel : votre charisme explose.</p>
      
      <h2>3. L'ultime secret : S'auto-analyser</h2>
      <p>Comment progresser concrètement ? La seule méthode qui fonctionne réellement est la confrontation avec sa propre image. L'enregistrement vidéo et audio est incontournable pour repérer ses défauts de posture et ses tics verbaux.</p>
      <p>C'est pourquoi s'entraîner en conditions réelles, en se filmant face caméra lors de discours structurés, permet de faire des pas de géant. Imaginer un retour analytique précis sur la variation de sa voix et les mots employés change complètement la donne. Nous préparons d'ailleurs des défis spécifiques de ce calibre pour les membres Premium de l'Agora, où une intelligence artificielle de pointe décortiquera chaque nuance de votre prestation pour vous offrir un feedback chirurgical sur votre prosodie.</p>
      
      <h2>Conclusion</h2>
      <p>L'art oratoire est un muscle. Il demande de la théorie, mais surtout une pratique ciblée et mesurable. Prenez l'habitude de vous écouter, et le monde vous écoutera.</p>
    `
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
      
      {/* HEADER DE L'ARTICLE */}
      <header className="relative pt-32 pb-20 px-4 md:px-8 border-b border-slate-200 bg-white overflow-hidden">
        {/* Légère lueur d'arrière-plan claire */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-indigo-50 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-soleil font-bold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour aux articles
          </Link>
          
          <div className="flex items-center gap-4 text-xs font-soleil text-slate-500 mb-6">
            <span className="bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-700 font-bold border border-indigo-200">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
          </div>

          <h1 className="font-baloo text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200 rounded-full flex items-center justify-center text-xl shadow-sm">
                🏛️
              </div>
              <span className="font-soleil font-medium text-slate-700">{article.author}</span>
            </div>
            
            <button className="text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 p-2.5 rounded-full transition-colors border border-slate-200">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* CORPS DE L'ARTICLE */}
      <main className="max-w-3xl mx-auto px-4 md:px-8 pt-16">
        {/* On enlève 'prose-invert' et on ajuste les couleurs pour le fond clair */}
        <article 
          className="prose prose-lg md:prose-xl font-soleil text-slate-600 
            prose-headings:font-baloo prose-headings:font-bold prose-headings:text-slate-900 prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-3xl
            prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-em:text-slate-500"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* BANNIÈRE D'APPEL À L'ACTION (CTA) EN BAS DE L'ARTICLE */}
        <div className="mt-20 bg-white border border-indigo-100 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-indigo-900/5">
          <h3 className="font-baloo text-3xl font-bold text-slate-900 mb-4">Prêt à dompter votre trac ?</h3>
          <p className="font-soleil text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Rejoignez l'Agora dès aujourd'hui. Profitez de nos cours interactifs et préparez-vous pour l'Arène.
          </p>
          <Link href="/inscription" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-md hover:scale-105">
            Créer mon compte gratuit
          </Link>
        </div>
      </main>

    </div>
  );
}
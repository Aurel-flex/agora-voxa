import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | Agora-Voxa - Maîtrisez l'Art Oratoire",
  description: "Découvrez nos articles, astuces et techniques sur l'éloquence, la rhétorique et la prise de parole en public.",
};

export default function BlogPage() {
  const articles = [
    {
      slug: "les-3-secrets-dun-exorde-captivant",
      title: "Les 3 secrets d'un Exorde captivant",
      excerpt: "La première impression est décisive. Découvrez les techniques des plus grands orateurs pour structurer l'introduction de votre discours.",
      category: "Rhétorique",
      date: "25 Mars 2026",
      readTime: "4 min",
      imageColor: "from-indigo-100 to-purple-100",
      icon: "🎣"
    },
    {
      slug: "importance-prosodie-choix-des-mots",
      title: "L'impact de la prosodie et du choix des mots",
      excerpt: "Apprenez comment le rythme, les silences et un vocabulaire chirurgical transforment une prise de parole banale en un moment mémorable.",
      category: "Éloquence",
      date: "18 Mars 2026",
      readTime: "6 min",
      imageColor: "from-rose-100 to-orange-100",
      icon: "🎙️"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* HEADER DU BLOG */}
      <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-block bg-indigo-50 border border-accent rounded-full px-4 py-1.5 mb-6">
          <span className="font-soleil font-bold text-accent text-sm tracking-wide uppercase">Le Journal de l'Agora</span>
        </div>
        <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-slate-900">
          Maîtrise <span className="text-secondary">l'Art Oratoire</span>
        </h1>
        <p className="font-soleil text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          Plongez dans nos ressources gratuites pour sublimer vos prises de parole.
        </p>
      </section>

      {/* GRILLE DES ARTICLES */}
      <section className="px-4 md:px-8 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`}
              className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 flex flex-col"
            >
              <div className={`h-48 w-full bg-linear-to-br ${article.imageColor} relative flex items-center justify-center overflow-hidden`}>
                <div className="text-7xl z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">
                  {article.icon}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-soleil text-slate-500 mb-4">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-accent font-bold border border-slate-200">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                </div>

                <h2 className="font-baloo text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                
                <p className="font-soleil text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {article.excerpt}
                </p>

                <div className="font-baloo font-bold text-accent flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  Lire l'article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
import Navigation from '@/components/Navigation';
import Footer from "@/components/Footer";
export default function VitrineLayout({ children }: { children: React.ReactNode }) {
  return (
    // 👇 Remarque bien : juste une div, PAS de <html> ni de <body> ici !
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      
      {/* Ton menu public (qu'on a créé tout à l'heure) */}
      <Navigation />

      {/* Le contenu de tes pages (Accueil, Concept, Tarifs...) */}
      <main className="flex-1">
        {children}
      </main>

<>
    {/* Le contenu de ta page */}
    <Footer />
  </>

    </div>
  );
}
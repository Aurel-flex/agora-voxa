import Navigation from '@/components/Navigation';

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

      {/* Ton Footer (optionnel) */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8 text-center text-slate-500 font-soleil text-sm mt-auto">
        <p>© 2026 Agora-Voxa. Tous droits réservés.</p>
      </footer>

    </div>
  );
}
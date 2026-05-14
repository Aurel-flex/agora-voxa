import type { Metadata } from 'next';

// 💡 Cette instruction interdit formellement l'indexation de cette page
export const metadata: Metadata = {
  title: 'Mentions Légales',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 font-soleil text-slate-700">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
        
        <h1 className="font-baloo text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Politique de Confidentialité</h1>
        <p className="text-slate-400 mb-10 text-sm font-medium">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="space-y-8">
          <section>
            <h2 className="font-baloo text-xl font-bold text-primary mb-3">1. Collecte des données</h2>
            <p className="leading-relaxed">Nous collectons ton nom et email pour la gestion de ton compte et de ta progression sur l'application.</p>
          </section>

          <section>
            <h2 className="font-baloo text-xl font-bold text-primary mb-3">2. Vidéo et Audio (Studio IA)</h2>
            <p className="leading-relaxed"><strong>Tes vidéos ne sont jamais vendues.</strong> Elles sont traitées de manière sécurisée uniquement pour générer ton analyse d'éloquence.</p>
          </section>

          <section>
            <h2 className="font-baloo text-xl font-bold text-primary mb-3">3. Intelligence Artificielle</h2>
            <p className="leading-relaxed">Notre IA traite tes données de manière éphémère pour produire tes scores de performance. Les données utilisées sont anonymisées et ne servent pas à entraîner des modèles publics.</p>
          </section>

          <section>
            <h2 className="font-baloo text-xl font-bold text-primary mb-3">4. Tes Droits</h2>
            <p className="leading-relaxed">Tu disposes d'un droit d'accès, de modification et de suppression totale de tes données depuis les paramètres de ton profil.</p>
          </section>
        </div>

      </div>
    </div>
  );
}
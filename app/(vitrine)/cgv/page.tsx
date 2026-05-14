import type { Metadata } from 'next';

// 💡 Cette instruction interdit formellement l'indexation de cette page
export const metadata: Metadata = {
  title: 'Mentions Légales',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 font-soleil text-slate-700">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
        
        <h1 className="font-baloo text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Conditions Générales de Vente</h1>
        <p className="text-slate-400 mb-10 text-sm font-medium">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="space-y-8">
          <section>
            <h2 className="font-baloo text-xl font-bold text-slate-800 mb-3">1. Objet</h2>
            <p className="leading-relaxed">Les présentes CGV régissent l'utilisation de l'application Agora-Voxa et la vente de l'abonnement "Orateur Pro". En souscrivant à nos services, tu acceptes ces conditions dans leur intégralité.</p>
          </section>

          <section>
            <h2 className="font-baloo text-xl font-bold text-slate-800 mb-3">2. L'Offre Premium</h2>
            <p className="leading-relaxed">L'abonnement "Orateur Pro" est facturé 4,99 € par mois (TTC). Il te donne accès au Studio IA et à l'analyse avancée de la prosodie et du langage corporel par notre intelligence artificielle.</p>
          </section>

          <section>
            <h2 className="font-baloo text-xl font-bold text-slate-800 mb-3">3. Paiement</h2>
            <p className="leading-relaxed">Le paiement est exigible immédiatement. L'abonnement est renouvelé automatiquement chaque mois à la date anniversaire de la souscription.</p>
          </section>

          <section>
            <h2 className="font-baloo text-xl font-bold text-slate-800 mb-3">4. Résiliation</h2>
            <p className="leading-relaxed">Tu peux résilier à tout moment depuis ton espace "Compte". L'annulation prendra effet à la fin de la période de facturation en cours.</p>
          </section>

          <section>
            <h2 className="font-baloo text-xl font-bold text-slate-800 mb-3">5. Droit de rétractation</h2>
            <p className="leading-relaxed">Conformément au Code de la consommation sur les contenus numériques, tu renonces expressément à ton droit de rétractation dès lors que le contenu Premium a été consommé (accès au Studio IA).</p>
          </section>
        </div>

      </div>
    </div>
  );
}
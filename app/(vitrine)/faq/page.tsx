"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Comment fonctionne l'analyse par l'IA ?",
    answer: "Notre intelligence artificielle analyse tes enregistrements vidéo et audio dans le Studio. Elle évalue ta prosodie (rythme, silences, intonations), détecte tes tics de langage et observe ta posture pour te donner un score et des conseils personnalisés."
  },
  {
    question: "L'offre Initié (gratuite) est-elle vraiment gratuite à vie ?",
    answer: "Oui ! L'offre Initié te donne accès aux 3 premiers modules et à un défi quotidien dans l'Arène de manière totalement gratuite et illimitée dans le temps."
  },
  {
    question: "Puis-je annuler mon abonnement Orateur Pro facilement ?",
    answer: "Absolument. Ton abonnement est sans engagement. Tu peux l'annuler à tout moment depuis les réglages de ton compte, en un seul clic."
  },
  {
    question: "Mes vidéos sont-elles conservées ?",
    answer: "Tes vidéos sont traitées de manière sécurisée pour l'analyse IA. Tu peux choisir dans tes paramètres de profil si tu souhaites les sauvegarder dans ton historique ou les supprimer immédiatement après l'analyse."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 font-soleil">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-baloo text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Foire Aux <span className="text-secondary">Questions</span>
          </h1>
          <p className="text-slate-600 text-lg">Tout ce que tu dois savoir sur l'Agora-Voxa.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-baloo text-lg font-bold text-slate-800">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === index ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
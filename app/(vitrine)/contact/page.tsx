"use client";

import { useState } from "react";
import { Send, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 font-soleil">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="font-baloo text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Contacte <span className="text-secondary">nous</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Une question sur la pédagogie ou un souci technique ? L'équipe est à ton écoute pour t'aider.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Email direct</p>
                <p className="text-slate-600">contact@agora-voxa.fr</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Réseaux Sociaux</p>
                <p className="text-slate-600">@AgoraVoxa sur Instagram & TikTok</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          {isSent ? (
            <div className="text-center py-12 animate-in fade-in zoom-in">
              <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
              <h3 className="font-baloo text-2xl font-bold text-slate-900 mb-2">Message envoyé !</h3>
              <p className="text-slate-600">Nous te répondrons d'ici 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Ton nom</label>
                <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary transition-colors" placeholder="Jean Dupont" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Adresse email</label>
                <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary transition-colors" placeholder="nom@exemple.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Message</label>
                <textarea required rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Comment puis-je..."></textarea>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-[#433f80] text-white py-4 rounded-xl font-baloo font-bold text-lg transition-all shadow-lg hover:scale-[1.02] flex justify-center items-center gap-2">
                Envoyer le message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
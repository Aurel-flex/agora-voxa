"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Mic, Activity, Trophy, User, LogOut, Map, X, Crown, Globe, Bell } from 'lucide-react'; 
import { useUser } from '@/context/UserContext'; 

// 1. LE COMPOSANT ENFANT (Navigation)
function AppNavigation({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); 
  const { logout, user } = useUser(); 
  
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  // 💡 NOUVEAU : État pour le panneau de notifications
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/connexion');
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    if (logout) logout();
    router.push('/'); 
  };

  const navItems = [
    { name: 'Accueil', href: '/dashboard', icon: Home, isPremium: false, trial: false, locked: false },
    { name: 'Parcours', href: '/dashboard/parcours', icon: Map, isPremium: false, trial: false, locked: false },
    { name: 'Défis & Arène', href: '/dashboard/arene', icon: Trophy, isPremium: false, trial: false, locked: false },
    { name: 'Studio', href: '/dashboard/studio', icon: Mic, isPremium: true, trial: true, locked: false },
    { name: 'Analyse IA', href: '#', icon: Activity, isPremium: true, trial: false, locked: true },
  ];

  return (
    <div className="flex h-screen bg-[#0B1120] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col w-72 border-r border-slate-800 bg-[#0F172A] px-4 py-6 z-10">
        <div className="mb-10 px-4 text-2xl font-baloo font-bold text-primary tracking-wider">
          AGORA-VOXA
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : (item.href !== '#' && pathname.startsWith(item.href));
            
            const itemContent = (
              <>
                <item.icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1 text-left">{item.name}</span>
                
                {item.isPremium && (
                  <span className="bg-[#662483] text-white text-[10px] font-baloo font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Pro
                  </span>
                )}
                
                {item.trial && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm transform rotate-3">
                    1 essai gratuit
                  </span>
                )}
              </>
            );

            if (item.locked) {
              return (
                <button 
                  key={item.name}
                  onClick={() => setShowPremiumModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-soleil font-medium relative group text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                >
                  {itemContent}
                </button>
              );
            }

            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-soleil font-medium relative group
                  ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                `}
              >
                {itemContent}
              </Link>
            );
          })}
        </nav>
        
        {/* BAS DE LA SIDEBAR */}
        <div className="mt-auto pt-4 border-t border-slate-800 space-y-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-soleil font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <Globe className="w-6 h-6" />
              Retour au site
            </Link>
            
            <Link 
              href="/dashboard/compte" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-soleil font-medium
                ${pathname.startsWith('/dashboard/compte') ? 'bg-secondary/10 text-secondary' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <User className="w-6 h-6" />
              Mon Compte
            </Link>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 transition-colors text-rose-400 hover:text-rose-300 font-soleil font-medium cursor-pointer"
            >
              <LogOut className="w-6 h-6" />
              Déconnexion
            </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0 relative">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
               
            {/* 🌟 TOP BAR : NOTIFICATIONS + PROFIL 🌟 */}
            <div className="flex justify-end mb-6 md:mb-8 items-center gap-4">
                {/* Pastille Profil */}
              <Link 
                href="/dashboard/compte" 
                className="inline-flex items-center gap-3 bg-[#1E293B] border border-slate-700/50 pl-4 pr-1.5 py-1.5 rounded-full hover:bg-slate-800 transition-all cursor-pointer group shadow-sm"
              >
                <span className="font-soleil font-bold text-slate-300 text-sm group-hover:text-white transition-colors">
                  {user?.name || "Orateur"}
                </span>
                
                <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-lg shadow-inner border border-slate-700 group-hover:scale-105 transition-transform">
                  {user?.avatar || "🦉"}
                </div>
              </Link>
              {/* 💡 Cloche de notification (Mise à jour avec le onClick) */}
              <button 
                onClick={() => setIsNotifPanelOpen(true)}
                className="relative p-2 text-slate-400 hover:text-white transition-colors group"
              >
                <Bell className="w-6 h-6 transition-transform group-hover:rotate-12" />
                <span className="absolute top-2 right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                </span>
              </button>

         
            </div>

            {children}
        </div>
      </main>

      {/* BOTTOM BAR MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-slate-800 flex justify-around items-center h-20 px-2 pb-safe z-50">
        {navItems.map((item) => {
          const isActive = item.href === '/dashboard' 
            ? pathname === '/dashboard' 
            : (item.href !== '#' && pathname.startsWith(item.href));
          
          const mobileContent = (
            <>
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : 'text-slate-500'}`} />
              <span className={`text-[10px] text-center leading-tight font-soleil font-medium ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                {item.name.replace(' & ', '\n& ')}
              </span>
              {item.isPremium && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#662483] rounded-full shadow-[0_0_8px_rgba(102,36,131,0.6)]"></span>
              )}
            </>
          );

          if (item.locked) {
            return (
              <button 
                key={item.name} 
                onClick={() => setShowPremiumModal(true)}
                className="relative flex flex-col items-center justify-center w-full h-full"
              >
                {mobileContent}
              </button>
            );
          }

          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center w-full h-full">
              {mobileContent}
            </Link>
          );
        })}
        <Link href="/dashboard/compte" className="relative flex flex-col items-center justify-center w-full h-full">
            <User className={`w-6 h-6 mb-1 ${pathname.startsWith('/dashboard/compte') ? 'text-secondary' : 'text-slate-500'}`} />
            <span className={`text-[10px] font-soleil font-medium ${pathname.startsWith('/dashboard/compte') ? 'text-secondary' : 'text-slate-500'}`}>
              Profil
            </span>
        </Link>
      </nav>

      {/* 💡 PANNEAU DE NOTIFICATIONS (SLIDE-OVER) */}
      {isNotifPanelOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Arrière-plan flou (cliquer dessus ferme le panneau) */}
          <div 
            className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsNotifPanelOpen(false)}
          ></div>
          
          {/* Panneau principal */}
          <div className="relative w-full max-w-sm h-full bg-[#1E293B] border-l border-slate-700 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header du panneau */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h3 className="font-baloo text-2xl font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-400" />
                Notifications
              </h3>
              <button 
                onClick={() => setIsNotifPanelOpen(false)}
                className="p-2 bg-[#0F172A] hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Contenu (Liste des notifications) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              <Link 
              href="/dashboard/studio" 
              className="block bg-[#0F172A] border border-slate-700/50 rounded-2xl p-4 relative hover:bg-slate-800 transition-colors"
              onClick={() => setIsNotifPanelOpen(false)}
            >
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 relative">
                <span className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full"></span>
                <p className="font-baloo font-bold text-indigo-400 mb-1">Athéna 🦉</p>
                <p className="font-soleil text-sm text-slate-300">
                  Coucou {user?.name || "l'Orateur"} ! Prêt(e) à chauffer ta voix ? Le Studio t'attend pour un exercice.
                </p>
                <span className="text-xs text-slate-500 mt-3 block">À l'instant</span>
              </div>
              </Link>
              <div className="bg-[#0F172A] border border-slate-700/50 rounded-2xl p-4">
                <p className="font-baloo font-bold text-slate-300 mb-1">Sécurité</p>
                <p className="font-soleil text-sm text-slate-400">
                  Nouvelle connexion détectée sur ce téléphone.
                </p>
                <span className="text-xs text-slate-500 mt-3 block">Il y a 2 heures</span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODALE PREMIUM */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-sm">
          <div className="bg-[#1E293B] border border-[#662483]/50 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setShowPremiumModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-20 h-20 bg-[#662483]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#662483]/40">
              <Crown className="w-10 h-10 text-[#d08df5]" strokeWidth={1.5} />
            </div>
            
            <h2 className="font-baloo text-3xl font-bold text-white text-center mb-4">
              Passe au niveau supérieur
            </h2>
            
            <p className="font-soleil text-slate-300 text-center mb-8 leading-relaxed">
              L'Analyse IA détaillée de ta prosodie, de tes mots et de ta posture est réservée aux membres de l'<strong className="text-white">Agora Premium</strong>.
            </p>
            
            <button 
              onClick={() => {
                setShowPremiumModal(false);
                router.push('/tarifs');
              }} 
              className="w-full bg-[#662483] hover:bg-[#4d1b63] text-white py-4 rounded-2xl font-baloo font-bold text-xl transition-all shadow-lg hover:scale-105"
            >
              Découvrir l'offre Premium
            </button>
            
            <button 
              onClick={() => setShowPremiumModal(false)} 
              className="w-full mt-4 py-3 text-slate-400 hover:text-white font-soleil font-medium transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// 2. LE COMPOSANT PARENT
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppNavigation>
      {children}
    </AppNavigation>
  );
}
import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import { UserProvider } from '@/context/UserContext'; 
import './globals.css';

const baloo = Baloo_2({ 
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-baloo',
});

export const metadata: Metadata = {
  title: {
    default: "Agora-Voxa | L'art de la rhétorique gamifié",
    template: "%s | Agora-Voxa" // Permet d'avoir des onglets propres comme "Connexion | Agora-Voxa"
  },
  description: "Apprenez l'éloquence et la prise de parole en public de manière ludique. Relevez des défis, gagnez de l'XP et maîtrisez l'art de la rhétorique avec Agora-Voxa.",
  keywords: ["éloquence", "rhétorique", "gamification", "apprendre à parler en public", "application ludique", "prise de parole", "soft skills"],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png", 
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Agora-Voxa | Apprendre l'éloquence en s'amusant",
    description: "Relevez des défis oratoires, progressez à votre rythme et devenez un maître de la rhétorique grâce à notre plateforme gamifiée.",
    siteName: "Agora-Voxa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agora-Voxa | L'art de la rhétorique gamifié",
    description: "Relevez des défis oratoires et gagnez de l'XP en apprenant la rhétorique.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${baloo.variable}`}>
      <body className="antialiased font-soleil" suppressHydrationWarning>
        {/* On englobe TOUTE l'application avec le Provider */}
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
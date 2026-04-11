import { Baloo_2 } from 'next/font/google';
import { UserProvider } from '@/context/UserContext'; // 👈 On importe le Provider ici
import './globals.css';

const baloo = Baloo_2({ 
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-baloo',
});

export const metadata = {
  title: 'Agora-Voxa',
  description: "L'arène de la prise de parole",
  manifest: "/manifest.json",
icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${baloo.variable}`}>
      <body className="antialiased font-soleil" suppressHydrationWarning>
        {/* 👇 On englobe TOUTE l'application avec le Provider 👇 */}
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
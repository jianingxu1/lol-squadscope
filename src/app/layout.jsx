import Header from '@/components/Header';
import './globals.css';
import './normalize.css';
import './swipper.css';
import { Inter } from 'next/font/google';
import { FavTeamProvider } from '@/context/FavTeam';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LoL SquadScope',
  template: 'Lol SquadScope - | %s',
  description: 'Follow your favourite League of Legends eSport team!',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/svg+xml' href='/lol_favicon.ico' />
      </head>
      <FavTeamProvider>
        <body className='bg-slate-950'>
          <Header />
          {children}
        </body>
      </FavTeamProvider>
    </html>
  );
}

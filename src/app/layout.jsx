
import Header from '@/components/Header'
import './globals.css'
import './normalize.css'
import "./swipper.css"
import { Inter } from 'next/font/google'
import { FavTeamProvider } from '@/context/FavTeam'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'League of legends API',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
       <FavTeamProvider>
        <body className=' bg-gray-800 font-sans '>
            <Header/>
          {children}
        </body>
      </FavTeamProvider>
    </html>
  )
}

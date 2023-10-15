"use client"
import ListOfMatches from '@/components/ListOfMatches'
import FavTeamContext from '@/context/FavTeam';
import React, { useContext } from 'react'
import RecentMatches from './MatchRecent';
import NextGames from '@/components/NextGames';

function App() {
  return (
    <div className='relative h-screen'>
     
        <ListOfMatches/>
        <NextGames/>
        <RecentMatches/>
  
    </div>
  )
}

export default App
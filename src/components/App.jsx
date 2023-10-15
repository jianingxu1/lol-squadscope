"use client"
import ListOfMatches from '@/components/ListOfMatches'
import FavTeamContext from '@/context/FavTeam';
import React, { useContext } from 'react'
import RecentMatches from './RecentMatches';
import NextGames from './NextGames';

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
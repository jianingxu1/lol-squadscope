"use client"
import ListOfMatches from '@/components/ListOfMatches'
import FavTeamContext from '@/context/FavTeam';
import React, { useContext } from 'react'
import RecentMatches from './recentMatches';
import Modal from './Modal';

function App() {
    const {modal} = useContext(FavTeamContext);
  return (
    <div className='relative h-screen'>
      {modal ?
      (
        <div className=" bg-hexadecimal absolute top-0 right-0 bottom-0 left-0 z-10">
        <Modal/>
        </div>
      )
    :(
      <>
        <ListOfMatches/>
        <RecentMatches/>
      </>
    )
    }
      
    </div>
  )
}

export default App
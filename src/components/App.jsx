import ListOfMatches from '@/components/ListOfMatches';
import FavTeamContext from '@/context/FavTeam';
import React, { useContext } from 'react';
import RecentMatches from './RecentMatches';
import UpcomingMatches from '@/components/UpcomingMatches';

function App() {
  return (
    <div className='relative flex flex-col gap-10 bg-slate-950'>
      <ListOfMatches />
      <div className='flex flex-col items-center gap-10 px-4 pb-8'>
        <UpcomingMatches />
        <RecentMatches />
      </div>
    </div>
  );
}

export default App;

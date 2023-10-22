import ListOfMatches from '@/components/ListOfMatches';
import FavTeamContext from '@/context/FavTeam';
import React, { useContext } from 'react';
import RecentMatches from './MatchRecent';
import NextGames from '@/components/NextGames';

function App() {
  return (
    <div className="relative  flex flex-col gap-10 bg-slate-950">
      <ListOfMatches />
      <div className="flex flex-col items-center gap-10 px-12">
        <NextGames />
        <RecentMatches />
      </div>
    </div>
  );
}

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState } from 'react';
import RecentMatch from './RecentMatch';
import { LoadingMatches } from './Loading';
import { useRecent } from '@/hooks/useRecentMatches';
import '../app/swipper.css';
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import FilaRecentMatch from './FilaRecentMatch';
function RecentMatches() {
  let { favTeam, cargando, favTeamGames } = useRecent();
  const [currentIndex, setCurrentIndex] = useState(0);

  favTeamGames = favTeamGames.filter(match => match.state != "unstarted");
  const disableNext = currentIndex === favTeamGames.length - 1;


  const disablePrev = currentIndex >= 1;
  const showNextElement = (index) => {
    if (disableNext) return;
    setCurrentIndex(currentIndex + 1);
    /**console.log(favTeamGames.length)
        console.log(index); */
  };
  const showPrevElement = () => {
    if (currentIndex >= 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const swiper = useSwiper();
  return (
    <section className='container flex-col flex items-center'>
      <h3 className='text-center text-gold-100 mb-4'>Recent Matches</h3>
      <div className='text-white max-w-screen-md flex items-center'>
        {cargando ? (
          <LoadingMatches>Loading recent matches...</LoadingMatches>
        ) : !favTeam?.name ? (
          <div className="bg-hexablack h-48 border-4 border-gray-900">
            <div className="flex h-full flex-col w-full px-8 items-center justify-center text-center text-5xl text-grey-100">
              <p>You don&apos;t have a favourite team.</p>
              <p>Click the &quot;Select your team&quot; button to choose one!</p>
            </div>
          </div>
        ) : favTeamGames.length > 1 ? (
          <div className='flex flex-col gap-5 mx-auto'>
            {favTeamGames.map((element) => (
              <FilaRecentMatch match={element} key={Math.random()} />
            ))}
          </div>
        ) : (
          <div className="bg-hexablack h-48 w-full border-4 border-gray-900">
            <div className="flex h-full flex-col items-center justify-center text-center text-5xl text-grey-100">
              <p>There are no recent matches for your team!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentMatches;

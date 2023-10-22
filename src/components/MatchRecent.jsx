/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState } from 'react';
import RecentMatch from './RecentMatch';
import CargandoMatches from './Loading';
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
  const { favTeam, cargando, favTeamGames } = useRecent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const disableNext = currentIndex === favTeamGames.length - 1;
  //console.log(favTeamGames)
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
    <section className=' container mx-auto mt-10'>
      <h2 className='text-center text-5xl text-white'>Recent Matches</h2>
      <div className='text-white '>
        {cargando ? (
          <CargandoMatches>Loading recent matches of your favourite team </CargandoMatches>
        ) : !favTeam?.name ? (
          <div className='bg-hexablack mt-10 h-64 w-full border-8 border-gray-900'>
            <div className='my-10 text-center text-5xl'>
              <p>You dont have favourite team. Choose one </p>
            </div>
          </div>
        ) : favTeamGames.length > 1 ? (
          <>
            <div className='flex flex-col gap-5 md:hidden'>
              {/**<button className={`text-white ${disablePrev ?"bg-blue-500 hover:bg-blue-600" :"bg-red-500"} transition-all duration-500 h-max px-10 text-black py-5 font-bold uppercase`} onClick={showPrevElement}> Previous Game</button> */}
              {favTeamGames.map((element) => (
                <FilaRecentMatch match={element} key={Math.random()} />
              ))}
              {/**  <button disabled={disableNext} className={`text-white ${disableNext?"bg-red-500":"bg-blue-500 hover:bg-blue-600"} transition-all duration-500  px-10 py-5 font-bold uppercase`} onClick={()=>showNextElement(favTeamGames.length)} > Next Game</button> */}
            </div>

            {/**<div className='hidden md:flex justify-center items-center'></div></div></div></div></div></div></div></div>
              <button className={`text-white ${disablePrev ?"bg-blue-500 hover:bg-blue-600" :"bg-red-500"} transition-all duration-500 h-max px-10 text-black py-5 font-bold uppercase`} onClick={showPrevElement}> Previous Game</button> */}

            <div className='hidden md:block'>
              <Swiper navigation={true} modules={[Navigation]}>
                {favTeamGames.map((element) => (
                  <SwiperSlide key={Math.random()}>
                    <RecentMatch match={element} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/** <button  disabled={disableNext} className={`text-white ${disableNext?"bg-red-500":"bg-blue-500 hover:bg-blue-600"} transition-all duration-500  px-10 py-5 font-bold uppercase`} onClick={()=>showNextElement(favTeamGames.length)} > Next Game</button>
              </div> */}
          </>
        ) : (
          <div className='bg-hexablack mt-10 h-64 w-full border-8 border-gray-900'>
            <div className='my-10 text-center text-5xl'>
              <p>Not recent games</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentMatches;

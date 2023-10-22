/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import SepararFechaYHora, { isToday, esManana } from '@/helpers/date';
import Image from 'next/image';
import { useMatches } from '@/hooks/useMatches';

function Match({ match }) {
  const { fecha, hora } = SepararFechaYHora(match.startTime);
  const teamOne = match?.match?.teams[0];
  const teamTwo = match?.match?.teams[1];
  const horaFormateada = hora.replace(/[^0-9]+$/, '');

  return (
    <div className='flex h-52 w-60 shrink-0 flex-col items-center justify-center gap-2 border-l border-t border-grey-300 bg-blue-700 py-1'>
      <div>
        <div className=' text-lg font-bold text-grey-100'>
          {match.state === 'inProgress' ? (
            <p className='font-bold text-red-600 '>NOW </p>
          ) : isToday(match?.startTime) ? (
            <p>Today</p>
          ) : esManana(match.startTime) ? (
            <p>TOMORROW</p>
          ) : (
            <p>{fecha}</p>
          )}
        </div>
        {match.state === 'inProgress' ? (
          <div className='text-white'>
            <div className='flex items-center'>
              <img
                src={match?.match?.teams[0].image}
                className=' object-cover'
                alt={`Image team ${match?.match?.teams[0].code}`}
                width={40}
                height={40}
              ></img>

              <p>{match?.match?.teams[0].code}</p>
            </div>
            <div className='flex items-center'>
              <img
                src={match?.match?.teams[1].image}
                className=' object-cover'
                alt={`Image team ${match?.match?.teams[1].code}`}
                width={40}
                height={40}
              ></img>
              <p>{match?.match?.teams[1].code}</p>
            </div>
          </div>
        ) : (
          <>
            <div className=' font-bold text-white'>
              <div className=' flex w-full items-center gap-2 '>
                <img
                  src={teamOne?.image}
                  className=' object-cover'
                  alt={`Image team ${teamOne}`}
                  width={40}
                  height={40}
                />
                <div>
                  <p>{teamOne?.code} </p>
                </div>
              </div>
              <div className='flex w-full items-center gap-2'>
                <img
                  src={teamTwo?.image}
                  className=' object-cover'
                  alt={`Image team ${teamTwo}`}
                  width={40}
                  height={40}
                />
                <div>
                  <p>{teamTwo?.code}</p>
                </div>
              </div>
            </div>
            <div className='text-white'>
              <p>{horaFormateada}</p>
            </div>
          </>
        )}
        <div className='mt-5 font-bold text-white'>
          <p>{match?.league.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Match;

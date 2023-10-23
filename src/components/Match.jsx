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
  const horaSinCero = (hora) => {
    let number = hora.toString();
    if (number.charAt(0) === '0') {
      number = number.slice(1);
    }
    return number;
  };
  return (
    <div className="flex h-48 w-52 shrink-0 flex-col items-center justify-center gap-2 border-l border-t border-grey-500 bg-blue-700 py-1">
      {match.state == 'inProgress' ? (
        <span className="absolute left-0 top-0 h-full w-1.5 bg-red-800 content-none"></span>
      ) : (
        <span></span>
      )}
      <div className="flex flex-col gap-1">
        <div className="font-spiegel uppercase tracking-wider text-grey-100">
          {match.state === 'inProgress' ? (
            <div className="flex items-center justify-center gap-1">
              <span className="text-red-500">•</span>
              <span className="text-white">LIVE</span>
            </div>
          ) : isToday(match?.startTime) ? (
            <span>Today</span>
          ) : esManana(match.startTime) ? (
            <span>Tomorrow</span>
          ) : (
            <span>{fecha}</span>
          )}
        </div>
        {match.state === 'inProgress' ? (
          <div className="text-white">
            <div className="flex items-center">
              <img
                src={match?.match?.teams[0].image}
                className="h-10 w-10 object-cover"
                alt={`Image team ${match?.match?.teams[0].code}`}
                width={40}
                height={40}
              ></img>

              <p>{match?.match?.teams[0].code}</p>
            </div>
            <div className="flex items-center">
              <img
                src={match?.match?.teams[1].image}
                className="h-10 w-10 object-cover"
                alt={`Image team ${match?.match?.teams[1].code}`}
                width={40}
                height={40}
              ></img>
              <p>{match?.match?.teams[1].code}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="font-bold text-white">
              <div className="flex w-full items-center gap-2 ">
                <img
                  src={teamOne?.image}
                  className="h-10 w-10 object-cover"
                  alt={`Image team ${teamOne}`}
                  width={40}
                  height={40}
                />
                <div>
                  <p>{teamOne?.code} </p>
                </div>
              </div>
              <div className="flex w-full items-center gap-2">
                <img
                  src={teamTwo?.image}
                  className=" object-cover"
                  alt={`Image team ${teamTwo}`}
                  width={40}
                  height={40}
                />
                <div>
                  <p>{teamTwo?.code}</p>
                </div>
              </div>
            </div>
            <div className="text-white">
              <p>{horaSinCero(hora)}</p>
            </div>
          </>
        )}
        <div className="text-md font-spiegel text-grey-100">
          {match?.league.name}
        </div>
      </div>
    </div>
  );
}

export default Match;

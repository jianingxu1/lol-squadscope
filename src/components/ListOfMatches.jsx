'use client';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import Match from './Match';
import {
  filterMatchStatus,
  useMatches,
  filterLolMatches,
} from '@/hooks/useMatches';
import FavTeamContext from '@/context/FavTeam';
import CargandoMatches from './Loading';

function ListOfMatches() {
  const { matches: games, cargando } = useMatches();
  const [position, setPosition] = useState(0);
  //Games que aun no se han completado de TODAS las ligas. TODO -> Filtrar por LIGA
  const matchs = filterLolMatches(filterMatchStatus(games));

  return (
    <section
      className={`relative flex overflow-hidden border-b border-grey-500 `}
    >
      <div className="w-full ">
        <div
          className={`flex text-center transition-transform  duration-500`}
          style={{ transform: `translateX(${-position}px)` }}
        >
          {cargando ? (
            <CargandoMatches type="Matches">Loading Games...</CargandoMatches>
          ) : (
            matchs &&
            matchs.map((element) => (
              <Match match={element} key={Math.random()} />
            ))
          )}
        </div>
      </div>
      {
        <div className="">
          <button
            onClick={() => setPosition(position + 350)}
            className="absolute right-0 top-0 h-full w-12 border-l border-grey-500 bg-hexblack text-blue-300 opacity-80"
          >
            {' '}
            {'>'}
          </button>
          {position > 0 && (
            <button
              onClick={() => setPosition(position - 350)}
              className="absolute left-0 top-0 h-full w-12 border-r border-grey-500 bg-hexblack text-blue-300 opacity-80"
            >
              {' '}
              {'<'}
            </button>
          )}
        </div>
      }
    </section>
  );
}

export default ListOfMatches;

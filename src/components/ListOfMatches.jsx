"use client"
import React, { Suspense, useContext, useEffect, useState } from 'react'
import Match from './Match';
import { filterMatchStatus, useMatches } from '@/hooks/useMatches';
import FavTeamContext from '@/context/FavTeam';
import CargandoMatches from './Loading';

function ListOfMatches() {
  const {matches:games,cargando} = useMatches();
  const [position,setPosition] = useState(0);
  //Games que aun no se han completado de TODAS las ligas. TODO -> Filtrar por LIGA 
  const matchs = filterMatchStatus(games);
  
  return (
    <section className={`flex overflow-hidden border-b border-grey-300 relative `}>
      <div className="w-full ">
        <div className={`flex text-center transition-transform  duration-500`} 
        style={{transform: `translateX(${-position}px)`}}>
        {cargando? <CargandoMatches type="Matches">Loading Games...</CargandoMatches> : matchs && matchs.map(element=> <Match match={element} key={Math.random()}/>)}
        </div>
      </div>
      {
      <div className=''>
      <button onClick={()=>setPosition(position+350)} className='absolute top-0 opacity-50 bg-slate-500 w-12 h-full right-0'> {">"}</button>
      {position > 0 && <button onClick={()=>setPosition(position-350)} className='absolute top-0 opacity-50 bg-slate-500 w-12 h-full left-0'> {"<"}</button>}
      </div>
      }
    </section>
   
  )
}

export default ListOfMatches
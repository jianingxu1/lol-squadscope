/* eslint-disable @next/next/no-img-element */
"use client"
import FavTeamContext from '@/context/FavTeam'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {IoIosAddCircleOutline} from "react-icons/io"
import {AiOutlineMinusCircle} from "react-icons/ai"
import { useMatches } from '@/hooks/useMatches'
import { useTeams } from '@/hooks/useTeams'
function Header() {
  const {changeModal,modal,favTeam,setAnimarCerrar} = useContext(FavTeamContext);
  const {cargando} =  useTeams();

  return (
    <header className='container mx-auto '>
     <nav className='flex justify-between items-center'>
     <Link href="/"> <Image src="/img/lol_logo.png" alt="Imagen logo League of legends" width={100} height={100}></Image> </Link>
      <h1 className='font-beaufort text-5xl font-bold uppercase'>LOL SQUADSCOPE</h1>
      {
      cargando  ?
      <div className='text-white h-24 text-center bg-slate-700 px-5 py-2 mb-2 cursor-pointer flex items-center gap-2' >
       <h3 className='text-center font-extrabold '>Loading</h3> 
      </div>
      :
      favTeam.name? 
      <Link href={`/teams/${favTeam.name}`}>
      <div className='text-white h-24 bg-slate-700 px-5 py-2 mb-2 cursor-pointer flex items-center gap-2' >
        <p className='text-center font-extrabold'>{favTeam?.name}</p>
        <img src={favTeam?.image} alt={`Image team ${favTeam?.name}`} width={50} height={50}/>
      </div>
      </Link>
      :
      <button className='text-white text-4xl'>
       {modal ? <AiOutlineMinusCircle onClick={()=>{changeModal(true); setAnimarCerrar(false)}}/> 
       : 
       <IoIosAddCircleOutline onClick={()=>{changeModal(false); setAnimarCerrar(true)}}/>}
       </button>
       }
     </nav>
    </header>
  )
}

export default Header
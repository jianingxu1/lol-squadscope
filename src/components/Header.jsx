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
    <header className='container mx-auto pt-10 px-2 '>
       <h1 className='font-beaufort md:text-5xl font-bold uppercase text-center text-3xl block md:hidden'>LOL SQUADSCOPE</h1>
      <nav className='flex justify-between items-center'>
      <Link href="/" > <Image src="/img/lol_logo.png" alt="Imagen logo League of legends" width={100} height={100}></Image> </Link>
        <h1 className='font-beaufort md:text-5xl font-bold uppercase hidden md:block'>LOL SQUADSCOPE</h1>
        <div className='flex gap-5'>
        <button className='text-white text-4xl'>
        <Link href="/search">  <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          
        >
      <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
    </svg></Link>
    
        </button>
        {
        cargando  ?
        <div className='text-white w-32 relative h-32  px-5 border-blue-400 border-4  py-2 mb-2 cursor-pointer flex justify-center items-center flex-col gap-2 rounded-full' >
          <h3 className='text-center font-extrabold '>Loading</h3> 
        </div>
        :
        favTeam.name? 
        <Link href={`/teams/${favTeam.name}`} >
          <div className='text-white md:w-32 relative md:h-32 bg-hexablack shadow-2xl border-blue-400 border-4 rounded-full px-5 py-2 mb-2 cursor-pointer flex items-center justify-center flex-col gap-2 ' >
            <p className='text-center hidden md:block font-extrabold'>{favTeam?.name}</p>
            <img src={favTeam?.image} alt={`Image team ${favTeam?.name}`} width={50} height={50}/>
            <div className='absolute -top-2  -right-2 md:rigth-10 md:top-5'>
               <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="1.5em"
                            width="1.5em"
                            color='red'
                            >
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                            </svg>
                          
              </div>
          </div>
        </Link>
        :    <Link href="/search">
        <div className='text-white w-32 relative h-32  px-5 py-2 border-blue-400 border-4  mb-2 cursor-pointer flex justify-center items-center flex-col gap-2 rounded-full' >
          <p className='text-center font-extrabold'>SELECT YOUR TEAM!</p>
          <div className='absolute top-0 right-0'>    
                              <svg
                              fill="red"
                              viewBox="0 0 16 16"
                              height="1.5em"
                              width="1.5em"
                              >
                              <path d="M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 01-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 01.596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                              </svg></div>
        </div>   
        </Link>   
        }
        </div>
      </nav>
    </header>
  )
}

export default Header
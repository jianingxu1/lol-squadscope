/* eslint-disable @next/next/no-img-element */
'use client';
import FavTeamContext from '@/context/FavTeam';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { useMatches } from '@/hooks/useMatches';
import { useTeams } from '@/hooks/useTeams';
function Header() {
  const { changeModal, modal, favTeam, setAnimarCerrar } = useContext(FavTeamContext);
  const { cargando } = useTeams();

  return (
    <header className='flex w-screen items-center justify-center border-b-2 border-grey-700 bg-hexblack'>
      <nav className='flex w-full items-center justify-between gap-4 px-8 py-2 md:container'>
        <Link href='/' className='shrink-0'>
          {' '}
          <Image
            src='/img/lol_logo.png'
            alt='Imagen logo League of legends'
            className='h-auto w-14 md:w-16'
            width={100}
            height={100}
          ></Image>{' '}
        </Link>
        <h3 className='text-center text-gold-100'>LoL SquadScope</h3>
        <div className='flex gap-5'>
          <button className='text-3xl text-white'>
            <Link href='/search'>
              {' '}
              <svg fill='currentColor' viewBox='0 0 16 16' height='1em' width='1em'>
                <path d='M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z' />
              </svg>
            </Link>
          </button>
          {cargando ? (
            <div className='relative flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-grey-500 px-5 py-2 text-white sm:h-16 sm:w-16'>
              <p className='text-center font-spiegel text-sm leading-tight text-white'>Loading</p>
            </div>
          ) : favTeam.name ? (
            <Link href={`/teams/${favTeam.name}`}>
              <div className=' relative flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-grey-500 text-white shadow-2xl sm:h-16 sm:w-16'>
                <img
                  src={favTeam?.image}
                  alt={`Image team ${favTeam?.name}`}
                  className='h-13 w-13 sm:h-15 sm:w-15'
                  width={50}
                  height={50}
                />
                <div className='absolute -right-1.5 -top-0'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#C21807'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='h-6 w-6'
                    color='#C21807'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ) : (
            <Link href='/search'>
              <div className='relative flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-grey-500 px-5 py-2 text-white sm:h-16 sm:w-16'>
                <p className='text-center font-spiegel text-xs leading-none md:text-sm md:leading-none'>
                  Select your team!
                </p>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

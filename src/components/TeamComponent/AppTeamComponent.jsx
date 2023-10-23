'use client';
import FavTeamContext from '@/context/FavTeam';
import { useTeams } from '@/hooks/useTeams';
import { useRouter } from 'next/navigation';
import { AiFillDelete } from 'react-icons/ai';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import RecentMatches from '@/components/RecentMatches';
import { useRecent } from '@/hooks/useRecentMatches';
import FilaRecentMatch from '@/components/FilaRecentMatch';
import { useUpcomingMatches } from '@/components/UpcomingMatches';
import UpcomingMatch from '@/components/UpcomingMatch';

function AppTeamComponent({ params }) {
  const router = useRouter();
  const name = params.id.replace(/%20/g, ' ');
  const { teams, cargando: loadingTeams } = useTeams();
  const { setFavTeam } = useContext(FavTeamContext);
  const [team, setTeam] = useState({});
  const [deleteTeam, setDelete] = useState(false);
  const [show, setShow] = useState();
  const { favTeam, cargando, favTeamGames } = useRecent();
  //console.log(favTeam)

  const handleTeams = async () => {
    const res = await fetch(
      `https://esports-api.lolesports.com/persisted/gw/getTeams?hl=en-US&id=${favTeam.slug}`,
      {
        headers: {
          'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
        },
      },
    );

    const data = await res.json();
    console.log(data);
  };
  // console.log(team)
  const { partidos, cargando: loadingNext } = useUpcomingMatches(favTeam);
  const deleteFav = () => {
    setFavTeam({});
    router.push('/');
    localStorage.setItem('favTeam', JSON.stringify({}));
  };
  const handleMenu = (e) => {
    setShow(e.target.value);
  };
  useEffect(() => {
    if (!teams) return;
    const team = teams.find((element) => element.name === name);
    setTeam(team);
  }, [teams]);

  return (
    <div className='container mx-auto h-screen bg-slate-950'>
      <button className=' text-white' onClick={() => setDelete(!deleteTeam)}>
        <AiFillDelete className='text-4xl' />
      </button>
      {deleteTeam && (
        <div className='absolute flex flex-col gap-10 bg-slate-100 px-5 py-5 text-2xl font-bold text-red-700'>
          <p>YOU ARE GOING TO DELETE YOUR FAVOURITE TEAM!</p>
          <div className='flex justify-between'>
            <button
              className='rounded-lg bg-red-500 px-2 py-5 text-white hover:bg-red-700'
              onClick={() => deleteFav()}
            >
              Delete Team
            </button>
            <button
              className=' rounded-lg bg-hexblack px-2 py-5 text-white hover:bg-gray-800'
              onClick={() => setDelete(!deleteTeam)}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {loadingTeams ? (
        <h1 className='mt-10 text-center text-4xl'> Loading Team page...</h1>
      ) : (
        <main className='text-white'>
          <h2 className='text-center text-3xl text-white '>{team?.name} </h2>
          <div className=' flex justify-center '>
            {' '}
            <img
              src={team?.alternativeImage}
              width={100}
              height={100}
              alt={`Imagen equipo ${team?.name}`}
            ></img>
          </div>
          <p className='mb-10 text-center text-3xl'>
            {team?.homeLeague?.name} -{' '}
            <span className='text-3xl font-bold'>{team?.homeLeague?.region}</span>
          </p>
          <nav className='mb-5'>
            <ul className='flex flex-col text-center md:mb-10 md:flex-row md:gap-5'>
              <li>
                <input
                  type='button'
                  className={`${
                    show === 'Show last matches' ? 'font-bold text-black' : 'text-white'
                  } cursor-pointer rounded-xl bg-blue-800 px-2 py-2 font-bold uppercase hover:bg-blue-900 md:text-2xl`}
                  onClick={(e) => handleMenu(e)}
                  value='Show last matches'
                ></input>
              </li>
              <li>
                {' '}
                <input
                  type='button'
                  className={`${
                    show === 'Show players' ? 'font-bold text-black' : 'text-white'
                  } cursor-pointer rounded-xl bg-blue-800 px-2 py-2 font-bold uppercase hover:bg-blue-900 md:text-2xl`}
                  onClick={(e) => handleMenu(e)}
                  value='Show players'
                ></input>
              </li>
              <li>
                {' '}
                <input
                  type='button'
                  className={`${
                    show === 'Show future matches' ? 'font-bold text-black' : 'text-white'
                  } cursor-pointer rounded-xl bg-blue-800 px-2 py-2 font-bold uppercase hover:bg-blue-900 md:text-2xl`}
                  onClick={(e) => handleMenu(e)}
                  value='Show future matches'
                ></input>
              </li>
            </ul>
          </nav>
          {show === 'Show last matches' ? (
            favTeamGames.length ? (
              favTeamGames.map((element) => <FilaRecentMatch key={Math.random()} match={element} />)
            ) : (
              <h2 className='text-center text-3xl '>This team has not recent games </h2>
            )
          ) : (
            show === 'Show players' && (
              <ul className='grid grid-cols-1 gap-5 text-3xl md:grid-cols-3 xl:grid-cols-4'>
                {team?.players?.map((element) => (
                  <li key={element.id}>
                    <div className='rounded-xl bg-cyan-900 px-5 py-2 text-center'>
                      <p>
                        Name :{' '}
                        <span className='font-bold'>
                          {element.firstName} {element.lastName}
                        </span>{' '}
                      </p>
                      <p>
                        Role: <span className='font-bold'> {element.role}</span>
                      </p>
                      <div className='flex justify-center'>
                        <img className='imagen-responsive' src={element.image} />
                      </div>
                      <p>
                        Summoner Name: <span className='font-bold'>{element.summonerName}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
          {show === 'Show future matches' && (
            <div className='flex justify-center'>
              {partidos.length ? (
                partidos.map((element) => <UpcomingMatch key={Math.random()} match={element} />)
              ) : (
                <h2 className='text-center text-4xl'> This team has not future matches</h2>
              )}
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default AppTeamComponent;

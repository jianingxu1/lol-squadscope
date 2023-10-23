/* eslint-disable @next/next/no-img-element */
'use client';
import FavTeamContext from '@/context/FavTeam';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Formulario from '@/components/SearchComponents/Formulario';
function SearchPage() {
  const { setFavTeam, changeModal, animarCerrar, setAnimarCerrar, leagues, teams, favTeam } =
    useContext(FavTeamContext);
  const [team, setTeam] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [selectLeague, setSelectLeague] = useState('');
  const [filterLeague, setFilterLeague] = useState({});
  const [emptyTeams, setEmptyTeams] = useState(false);
  const router = useRouter();

  //Busqueda mientras escribe [No es muy eficiente, se recarga la pagina todo el rato]
  useEffect(() => {
    if (team === '') {
      return;
    }
    setSelectLeague('');
    setFilterLeague('');
    const teamsS = teams.filter((element) =>
      element.name.toLowerCase().includes(`${team.toLowerCase()}`),
    );
    //console.log(teamsS)
    const elementosAgrupados = teamsS.reduce((acumulador, elemento) => {
      const region = elemento.homeLeague.name;

      // Verificamos si ya existe un objeto de región en el acumulador
      const regionExistente = acumulador.find((item) => item.region === region);

      if (regionExistente) {
        // Si existe, agregamos el elemento al array de elementos de la región existente
        regionExistente.elementos.push(elemento);
      } else {
        // Si no existe, creamos un nuevo objeto de región y un array de elementos con el elemento actual
        acumulador.push({
          region,
          elementos: [elemento],
        });
      }

      return acumulador;
    }, []);
    //console.log(elementosAgrupados)
    setResults(elementosAgrupados);
    // console.log(teamsS);
  }, [team]);
  const handleFavTeam = (element) => {
    setFavTeam(element);
    if (element != null) localStorage.setItem('favTeam', JSON.stringify(element));
  };

  //Busqueda seleccionando en el select
  useEffect(() => {
    setTeam('');
    if (!selectLeague) return;
    const teamsS = teams.filter((element) => element.homeLeague.name === selectLeague);
    setFilterLeague(leagues.find((element) => element.name === selectLeague));
    // console.log(teamsS);
    setResults(teamsS);
    setTeam('');
    setError('');
  }, [selectLeague]);
  return (
    <section className={`container mx-auto flex h-screen w-full flex-col items-center px-4 py-8`}>
      <div className='flex max-w-md flex-col items-center justify-center gap-10'>
        <h2 className='text-center text-2xl font-bold text-gold-200'>
          Choose your favorite team to follow them!
        </h2>
        <Formulario
          setSelectLeague={setSelectLeague}
          selectLeague={selectLeague}
          setTeam={setTeam}
          error={error}
        />
        {filterLeague.id && (
          <div className='flex flex-col items-center gap-1 rounded-sm border-2 border-blue-500 bg-blue-500 px-10 py-2 font-spiegel text-3xl tracking-wider text-white shadow-xl'>
            <span className='font-beaufort text-base font-bold text-white'>
              {filterLeague.name}
            </span>
            <img
              src={filterLeague.image}
              alt={`${filterLeague.name} league's icon`}
              width={60}
              height={60}
            />
          </div>
        )}
        <div className='flex w-full flex-col gap-10'>
          {results.length > 0 ? (
            selectLeague && filterLeague ? (
              <div className={`flex flex-col justify-center gap-5`}>
                {results.map((element) => (
                  <div
                    key={element.id}
                    className='flex items-center justify-center rounded-sm bg-cyan-900'
                  >
                    <div className='ml-8 flex h-max w-full items-center'>
                      <img
                        src={element.image}
                        alt={`Imagen equipo ${element.name}`}
                        width={50}
                        height={50}
                        className='h-10 w-10'
                      ></img>
                      <span className='ml-5 font-beaufort text-lg font-bold tracking-wider text-white'>
                        {' '}
                        {element.name}{' '}
                      </span>
                      {/** <p className='text-white '>League: <span className='font-bold'>{element?.homeLeague?.name}</span></p>
                                  <p className='text-white'>Region: <span className='font-bold'>{element?.homeLeague?.region}</span></p> */}
                    </div>
                    <button
                      onClick={() => {
                        handleFavTeam(element);
                        router.push(`/teams/${element.name}`);
                      }}
                      value={element.name}
                      key={element.id}
                      className='flex justify-end rounded-sm bg-blue-500 p-5 '
                    >
                      {' '}
                      {element.name === favTeam.name ? (
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
                      ) : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
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
                      )}{' '}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {results.map((element) => (
                  <div
                    className='flex flex-col justify-center gap-5 font-beaufort font-bold text-white'
                    key={element.region}
                  >
                    <h2 className='text-center text-2xl font-bold'>{element.region}</h2>
                    {element.elementos.map((element) => (
                      <div
                        key={element.id}
                        className='flex items-center justify-center rounded-sm bg-cyan-900'
                      >
                        <div className='ml-8 flex h-max w-full items-center'>
                          <img
                            src={element.image}
                            alt={`Imagen equipo ${element.name}`}
                            width={50}
                            height={50}
                            className='h-10 w-10'
                          ></img>
                          <span className='ml-5 font-beaufort text-lg font-bold tracking-wider text-white'>
                            {' '}
                            {element.name}{' '}
                          </span>
                          {/**   <p className='text-white '>League: <span className='font-bold'>{element?.homeLeague?.name}</span></p>
                       <p className='text-white'>Region: <span className='font-bold'>{element?.homeLeague?.region}</span></p> */}
                        </div>
                        <button
                          onClick={() => {
                            handleFavTeam(element);
                            router.push(`/teams/${element.name}`);
                          }}
                          value={element.name}
                          key={element.id}
                          className='rounded-sm flex justify-end bg-blue-500 p-5'
                        >
                          {' '}
                          {element.name === favTeam.name ? (
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
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
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
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )
          ) : (
            emptyTeams && <p className='text-white'>There are no results</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchPage;

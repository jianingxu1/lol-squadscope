'use client';
import FavTeamContext from '@/context/FavTeam';
import { filterMatchStatus } from '@/hooks/useMatches';
import { useState, useEffect, useContext } from 'react';
import '../app/swipper.css';
// Import Swiper React components
import NextMatch from './NextMatch';
import CargandoMatches from './Loading';
export const useNextGames = (favTeam) => {
  const [cargando, setCargando] = useState(true);

  const [partidos, setPartidos] = useState([]);
  useEffect(() => {
    const getnextMatches = async () => {
      if (favTeam.name) {
        try {
          //Fetch al calendario general. En el futuro -> Buscar el calendario de la liga del equipo? Ya que cuando empiecen las ligas habran muchos partidos y quizá no sale el del equipo favorito
          const url = 'https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US';
          const res2 = await fetch(url, {
            headers: {
              'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
            },
            next: {
              revalidate: 300,
            },
          });
          //SE BUSCAN LOS EQUIPOS -> TODOS LOS EQUIPOS
          const { data: data2 } = await res2.json();

          //Filtro por games aun no acabados
          const filterByCompleted = filterMatchStatus(data2.schedule.events);

          //Filtro por  games de mi equipo
          const games = filterByCompleted.filter(
            (element) =>
              element.match.teams[0].name === `${favTeam.name}` ||
              element.match.teams[1].name === `${favTeam.name}`,
          );
          setPartidos(games);
          // console.log(games)
        } catch (error) {
          console.log(error);
        } finally {
          setCargando(false);
        }
      } else {
        setCargando(false);
      }
    };
    getnextMatches();
  }, [favTeam]);

  return { partidos, cargando };
};

function NextGames() {
  const { favTeam } = useContext(FavTeamContext);
  const { partidos, cargando } = useNextGames(favTeam);
  return (
    <section className=' container mx-auto mt-10'>
      <h2 className='text-center text-white'>Upcoming Match</h2>
      <div className='flex items-center justify-center text-white'>
        {cargando ? (
          <CargandoMatches>Loading upcoming match</CargandoMatches>
        ) : !favTeam?.name ? (
          <div className='bg-hexablack mt-10 h-64 w-full border-8 border-gray-900'>
            <div className='my-10 text-center text-5xl'>
              <p>You dont have favourite team. Choose one</p>
            </div>
          </div>
        ) : partidos?.length > 0 ? (
          <NextMatch key={partidos[0].id} match={partidos[0]} />
        ) : (
          <div className='bg-hexablack mt-10 h-64 w-full border-8 border-gray-900'>
            <div className='my-10 text-center text-5xl'>
              <p>No upcoming match</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NextGames;

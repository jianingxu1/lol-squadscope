'use client';
import FavTeamContext from '@/context/FavTeam';
import { filterMatchStatus } from '@/hooks/useMatches';
import { useState, useEffect, useContext } from 'react';
import '../app/swipper.css';
// Import Swiper React components
import UpcomingMatch from './UpcomingMatch';
import { LoadingMatches } from './Loading';
export const useUpcomingMatches = (favTeam) => {
  const [cargando, setCargando] = useState(true);

  const [partidos, setPartidos] = useState([]);
  useEffect(() => {
    const getUpcomingMatches = async () => {
      if (favTeam.name) {
        try {
          //Fetch al calendario general. En el futuro -> Buscar el calendario de la liga del equipo? Ya que cuando empiecen las ligas habran muchos partidos y quizá no sale el del equipo favorito
          const url =
            'https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US';
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
    getUpcomingMatches();
  }, [favTeam]);

  return { partidos, cargando };
};

function UpcomingMatches() {
  const { favTeam } = useContext(FavTeamContext);
  const { partidos, cargando } = useUpcomingMatches(favTeam);
  return (
    <section className="container">
      <h3 className="mb-4 text-center text-gold-100">Upcoming match</h3>
      <div className="mx-auto max-w-screen-md flex items-center justify-center text-white">
        {cargando ? (
          <LoadingMatches>Loading upcoming match...</LoadingMatches>
        ) : !favTeam?.name ? (
          <div className="bg-hexablack h-72 w-full border-4 border-gray-900">
            <div className="flex h-full flex-col items-center justify-center text-center text-5xl text-grey-100">
              <p>You don't have a favourite team.</p>
              <p>Click the "Select your team" button to choose one!</p>
            </div>
          </div>
        ) : partidos?.length > 0 ? (
          <UpcomingMatch key={partidos[0].id} match={partidos[0]} />
        ) : (
          <div className="bg-hexablack h-72 w-full border-4 border-gray-900">
            <div className="flex h-full flex-col items-center justify-center text-center text-5xl text-grey-100">
              <p>There is no upcoming match for your team!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default UpcomingMatches;

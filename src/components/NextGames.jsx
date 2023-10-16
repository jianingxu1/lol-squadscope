import FavTeamContext from '@/context/FavTeam';
import { filterMatchStatus } from '@/hooks/useMatches';
import { useState, useEffect,useContext } from 'react';
import "../app/swipper.css"
// Import Swiper React components
import NextMatch from './NextMatch';
import CargandoMatches from './Loading';
export const useNextGames=(favTeam)=>{
  const [cargando,setCargando] = useState(true);

  const [partidos,setPartidos] = useState([])
  useEffect(()=>{
    const getnextMatches=async()=>{
      if(favTeam.name){
      try{
        //Fetch al calendario general. En el futuro -> Buscar el calendario de la liga del equipo? Ya que cuando empiecen las ligas habran muchos partidos y quizá no sale el del equipo favorito
        const url ="https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US";
      const res2 = await fetch(url,{
        headers:{
          "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
        }
      });
      //SE BUSCAN LOS EQUIPOS -> TODOS LOS EQUIPOS
      const {data:data2} = await res2.json();

      //Filtro por games aun no acabados
      const filterByCompleted = filterMatchStatus(data2.schedule.events)

      //Filtro por  games de mi equipo
       const games = filterByCompleted.filter(element=>element.match.teams[0].name === `${favTeam.name}`  || element.match.teams[1].name ===`${favTeam.name}`)
      setPartidos(games);
     // console.log(games)
      }
    catch(error){
      console.log(error)
    }
    finally
    {
      setCargando(false) ;}
  }
  else{
    setCargando(false) ;
  }
  }
    getnextMatches();
},[favTeam])

return {partidos,cargando};
}
function NextGames() {
  const {favTeam} = useContext(FavTeamContext);
  const {partidos,cargando} = useNextGames(favTeam);
  return (
    <section className=' container mx-auto mt-10'>
    <h2 className='text-white text-center text-5xl'>UPCOMING MATCH</h2>
    <div className='text-white flex justify-center items-center'>
    {cargando
          ? 
            <CargandoMatches >Loading upcoming match </CargandoMatches>
            :
            !favTeam?.name
            ? 
            <div className='mt-10 h-64 bg-hexablack border-8 border-gray-900 w-full'>
            <div className='text-center my-10 text-5xl'>
             <p>You dont have favourite team. Choose one </p> 
            </div>
            </div>
            :
          partidos?.length > 0?
    <NextMatch key={partidos[0].id}match={partidos[0]}/>
      :
     
      <div className='mt-10 h-64 bg-hexablack border-8 border-gray-900 w-full'>
        <div className='text-center my-10 text-5xl'>
          <p>Not upcoming match</p>
        </div>
      </div>
    }
    </div>
</section>
  )
}

export default NextGames
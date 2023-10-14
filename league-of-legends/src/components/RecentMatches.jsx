/* eslint-disable react-hooks/exhaustive-deps */
import FavTeamContext from '@/context/FavTeam'
import { useLeagues } from '@/hooks/useLeagues';
import { useTeams } from '@/hooks/useTeams'
import React, { useContext, useEffect, useState } from 'react'
import RecentMatch from './RecentMatch';
import CargandoMatches from './CargandoMatches';

function RecentMatches() {
    const [favTeamGames,setFavTeamGames] = useState([])
    const [cargando,setCargando] = useState(false);
    const [favTeam,setFavTeam] = useState({});
    const getLocalStorage =()=>{
      const team = JSON.parse(localStorage.getItem("favTeam"));
      if(team.id)
      setFavTeam(team);
    }
    useEffect(()=>{
      getLocalStorage();
    },[])
    useEffect(()=>{
        const getMatches=async()=>{
            if(favTeam.name){
        try{
          setCargando(true);
          const url ="https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US";
          const res2 = await fetch(url,{
            headers:{
              "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
            }
          });
          //SE BUSCAN LOS EQUIPOS -> TODOS LOS EQUIPOS
          const {data:data2} = await res2.json();
          const leagues = data2.leagues.filter(element=>element.region !== "INTERNATIONAL")
          const newObj = leagues.map(element=>{
              return{
               id:element.id,
               name:element.name,
               image:element.image
              }
            })
            //Se buscan los games del equipo
           const filterT = newObj.find(element=>element.name ===favTeam.homeLeague.name);
          const res = await fetch(`https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${filterT.id}`,{
          headers:{
            "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
          }
        });
        const {data} = await res.json();
        const tournament = data.schedule.events
        const filterGames = tournament.filter(element=>element.match.teams[0].name === `${favTeam.name}`  || element.match.teams[1].name ===`${favTeam.name}`)
        setFavTeamGames(filterGames) 
        setCargando(false); 
   
        }catch(error){
          console.log(error)
        }
    }
  }
        getMatches();
    
      },[favTeam])
      const [currentIndex, setCurrentIndex] = useState(0);
      const showNextElement = (index) => {
        if(disableNext) return;
        setCurrentIndex(currentIndex + 1);
        /**console.log(favTeamGames.length)
        console.log(index); */
      };
      const showPrevElement = () => {
        if(currentIndex >= 1){
            setCurrentIndex(currentIndex - 1);
        } 
      };
      const disableNext = currentIndex===favTeamGames.length - 1;
      const disablePrev = currentIndex >=1;
  return (
    <section className=' container mx-auto mt-10'>
        <h2 className='text-white text-center text-5xl'>Recent Matches</h2>
        <div className='text-white flex justify-center items-center'>
          
          {
          !favTeam.name ?
           <div className='mt-10 h-64 bg-hexablack border-8 border-gray-900 w-full'>
           <div className='text-center my-10 text-5xl'>
            <p>You dont have favourite team. Choose one </p> 
           </div>
           </div>: favTeam.name && cargando? <CargandoMatches >Loading games</CargandoMatches>
           :<>
             {favTeamGames.length> 1 ?
             (
              <>
              <button className={`text-white ${disablePrev ?"bg-blue-500 hover:bg-blue-600" :"bg-red-500"} transition-all duration-500 h-max px-10 text-black py-5 font-bold uppercase`} onClick={showPrevElement}> Previous Game</button>
              <RecentMatch match={favTeamGames[currentIndex]} key={Math.random()}/>
              <button disabled={disableNext} className={`text-white ${disableNext?"bg-red-500":"bg-blue-500 hover:bg-blue-600"} transition-all duration-500  px-10 py-5 font-bold uppercase`} onClick={()=>showNextElement(favTeamGames.length)} > Next Game</button>
              </> 
            ) 
            :  
            <div className='mt-10 h-64 bg-hexablack border-8 border-gray-900 w-full'>
            <div className='text-center my-10 text-5xl'>
              <p>Not recent games</p>
            </div>
            </div>
            }
           </>
          }

        
        </div>
        
       
    </section>
  )
}

export default RecentMatches
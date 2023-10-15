import FavTeamContext from "@/context/FavTeam";
import { useContext, useEffect, useState } from "react";

export function useRecent(){
    const [favTeamGames,setFavTeamGames] = useState([])
    const [cargando,setCargando] = useState(true);
    const {favTeam} = useContext(FavTeamContext)
    
    useEffect(()=>{
        const getMatches=async()=>{
            if(favTeam?.name){
        try{
       
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
        
   
        }catch(error){
          console.log(error)
        }
        finally{
            setCargando(false)
        }
    }else{
        setCargando(false);
    }
  }
        getMatches();
    
      },[favTeam])

      return{cargando, favTeamGames,favTeam}
}
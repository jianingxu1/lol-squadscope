import FavTeamContext from "@/context/FavTeam";
import { useContext, useEffect, useState } from "react";
import { filterMatchStatusCompleted } from "./useMatches";

export function useRecent(){
    const [favTeamGames,setFavTeamGames] = useState([])
    const [cargando,setCargando] = useState(true);
    const {favTeam} = useContext(FavTeamContext)
    
    useEffect(()=>{
        const getMatches=async()=>{
            if(favTeam?.name){
        try{
          //Fetch de las ligas
          const url ="https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US";
          const res2 = await fetch(url,{
            headers:{
              "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
            }
          });
          //SE BUSCAN LOS EQUIPOS -> TODOS LOS EQUIPOS
          const {data:data2} = await res2.json();

          //International leagues no. [Aunque podria ser]
          const leagues = data2.leagues.filter(element=>element.region !== "INTERNATIONAL")

          //Me creo un nuevo objeto de ligas donde tenga la info que quiero
          const newObj = leagues.map(element=>{
              return{
               id:element.id,
               name:element.name,
               image:element.image
              }
            })
            //Filtro y buso la liga del equipo
           const filterT = newObj.find(element=>element.name ===favTeam.homeLeague.name);

           //Fetch del calendario de la liga de mi equipo favorito
          const res = await fetch(`https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${filterT.id}`,{
          headers:{
            "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
          }
        });
        //DATOS del calendario de la lgia de mi equipo favorito 
        const {data} = await res.json();
        const tournament = data.schedule.events

        //Filtro por partidos de mi equipo favorito        
        const filterGames = tournament.filter(element=>element.match.teams[0].name === `${favTeam.name}`  || element.match.teams[1].name ===`${favTeam.name}`)
          //Fetch del calendario de todas las ligas de todo el mundo. Hago 2 fetch porque hay muchisimos partidos acabados y no salian muchos partidos recientes del equipo favorito
        const res3 = await fetch(`https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US`,{  headers:{
          "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
            }
          });
        
        const {data:data3} = await res3.json();
        //console.log(data3.schedule.events);

        //Filtro por partidos acabados. de todos los calendarios
        const games = filterMatchStatusCompleted(data3.schedule.events);

        //Filtro por partidos acabados de mi equipo favorito 
        const filterWorlds = games.filter(element=>element.match.teams[0].name === `${favTeam.name}`  || element.match.teams[1].name ===`${favTeam.name}`)
         
        //Junto FilterGames de la liga del equipo y el general
        const WorldsAndHisTeam = [...filterGames,...filterWorlds];

        //Ordeno por fechas
        const filterDate = WorldsAndHisTeam.sort((a,b)=>{
          const fechaA = new Date(a.startTime);
          const fechaB = new Date(b.startTime);
          return fechaB - fechaA;
        })

         //Como hemos juntado Array de Eventos global y los de la liga, habrá partidos que se repitan. Filtramos para quitar los que no se repitens
        const filterSameGame =  filterDate.filter((item, index, self) => {
          return self.findIndex((el) => el.match.id === item.match.id) === index;
        });

        //Games acabados de mi equipo favorito Juntando General + Liga
        setFavTeamGames(filterSameGame) 
   
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
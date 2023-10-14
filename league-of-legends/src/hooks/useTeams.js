import React,{ useState,useEffect } from "react";

export function useTeams(){
    const [teams,setTeams] = useState([]);
    const getTeams =async()=>{
      try{
        const url ="https://esports-api.lolesports.com/persisted/gw/getTeams?hl=en-US";
      const res = await fetch(url,{
        headers:{
          "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
        }
      });
      
      //SE BUSCAN LOS EQUIPOS -> TODOS LOS EQUIPOS
      const {data} = await res.json();
      const teams = data.teams.filter(element=> element.status ==="active" && element.status !== "archived" && element.homeLeague !== null && element.players.length>1 &&
      (element.homeLeague.region !== "INTERNATIONAL"))
      //console.log(data.teams[0].homeLeague.region)
      //console.log(data)
      setTeams(teams);
      }catch(error){console.log(error)}
    }
    useEffect(()=>{
        getTeams();
    },[])
    return{teams}
  }
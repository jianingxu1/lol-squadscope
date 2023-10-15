import { useEffect, useState } from "react";
import { useTeams } from "./useTeams";

export function useLeagues(){
    const [leagues,setLeagues] = useState([]);
    const getLeagues =async()=>{
        const url ="https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US";
        const res = await fetch(url,{
          headers:{
            "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
          }
        });
        //SE BUSCAN LOS EQUIPOS -> TODOS LOS EQUIPOS
        const {data} = await res.json();
       
        const leagues = data.leagues.filter(element=>element.region !== "INTERNATIONAL")
        const newObj = leagues.map(element=>{
            return{
             id:element.id,
             name:element.name,
             image:element.image
            }
          })
       setLeagues(newObj);
      }
      useEffect(()=>{
        getLeagues();
      },[])

      return{leagues}
}
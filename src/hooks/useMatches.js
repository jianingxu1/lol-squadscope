const { useState, useEffect } = require("react");

export const filterMatchStatus =(matches)=>matches.filter(element=>element.state !== "completed")
export const filterMatchStatusCompleted =(matches)=>matches.filter(element=>element.state == "completed")
//Calendario de todas las ligas que aun no han acabado
export function useMatches(){
    const [matches,setMatches] = useState([]);
    const [cargando,setCargando] = useState(true);
    useEffect(()=>{
      const getMatches=async()=>{
       setCargando(true);
        try{
          const res = await fetch("https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US",{
        headers:{
          "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
        }
      });
      const {data} = await res.json();
   
      setCargando(false);
      setMatches(data.schedule.events);
        }catch(error){console.log(error)}
        finally{
          setCargando(false);
        }
      }
      getMatches();
    
      console.log()
    },[])
  
    return {matches,cargando}
}
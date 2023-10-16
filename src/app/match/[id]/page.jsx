"use client"
import React, { useEffect, useState } from 'react'

 function MatchPage({params}) {
    const [games,setGames] = useState([])
   
    //110852981980205644
    //Para obtener cada game
    /**const getGame =async()=>{
                const url =` https://feed.lolesports.com/livestats/v1/window/110852981980205645`
                const res = await fetch(url,{
                  headers:{
                    "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
                  }
                });
                const data = await res.json();
                setGames(data.data);
                console.log(data); */

                //Obtener todos los partidos de un torneo
                /**useEffect(()=>{
            const getGame =async()=>{
                const url =` https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=110852926142971547`
                const res = await fetch(url,{
                  headers:{
                    "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
                  }
                });
                const data = await res.json();
                setGames(data.data);
                console.log(data)
            } */
     useEffect(()=>{
            const getGame =async()=>{
                const url =` https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${params.id}`
                const res = await fetch(url,{
                  headers:{
                    "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
                  }
                });
                const data = await res.json();
                setGames(data.data);
                console.log(data)
            }
            getGame();   
     },[])
  return (
   
    <div>{games.data}ass</div>
  )
}

export default MatchPage
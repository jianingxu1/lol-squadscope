"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

 function MatchPage({params}) {
    const [game,setGame] = useState()
    const [match,setMatch] = useState();
    const [status,setStatus] = useState();
    console.log(`${game?.event?.match?.games[0].id}`)
    const router = useRouter();
    ///console.log(params)
   
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
                setGame(data.data);
                //const filterGames = data.data.event.match.games.filter(element=>element.state !== "unneeded")
                //console.log(filterGames);
                console.log(data.data)
            }
            //APikey RGAPI-398c5a9c-3681-46cb-9c7d-82637dd9dea0
            getGame();   
     },[])
     const handleMatch=(id)=>{
        const getGame =async()=>{
            const url = `https://feed.lolesports.com/livestats/v1/window/${id}`
            const res = await fetch(url,{
              headers:{
                "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
              }
            });
            const data = await res.json();
            setMatch(data);
           // console.log(data); 
        }
        getGame();
     }
     useEffect(()=>{
        handleMatch(game?.event.match.games[0].id)
     },[game?.event?.match?.games[0].id])
  return (
    <section className='bg-blue-700'>
        <h2 className='text-white  text-center text-4xl'> {game?.event?.league?.name}</h2>
        <div className='flex justify-center'>
           <div className='flex items-center justify-center'> 
            <h3>{game?.event?.match?.teams[0]?.name}</h3>
            <img src={game?.event?.match?.teams[0].image} alt={`Image team `} width={50} height={50}></img>
           </div>
            <div className='flex items-center bg-slate-500 rounded-lg'>
                <div className='border-r-2'><p className={`text-white  p-2 px-3 text-2xl rounded-xl `}>{game?.event?.match.teams[0].result.gameWins}</p></div>
                <p className='text-white p-2 px-3 text-2xl rounded-xl'>{game?.event?.match?.teams[1].result.gameWins}</p>
            </div>
            <div className='flex items-center justify-center'> 
            <img src={game?.event?.match?.teams[1].image} alt={`Image team ${game?.event?.match?.teams[1].name}`} width={50} height={50}></img>
            <h3>{game?.event?.match.teams[1].name}</h3>
            </div>
        </div>

        <div>
            <nav>
               <ul className='flex gap-5 text-white'> 
                {game?.event?.match?.games.map(element=>
                {
                return  element.state ==="completed" && <li key={element.id}> <button onClick={()=>handleMatch(element.id)} > GAME: {element.number}</button> </li> }
                )
                }</ul>
            </nav>


            <div className='mt-10'>
               <p className='text-white'> {match?.esportsGameId}</p>
                <div className='flex bg-cyan-900 justify-evenly'>
                <div>
                {match?.gameMetadata?.blueTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white' key={element.championId}>{element.championId}{element.summonerName}</div>
                })}
                </div>
                <div>
                {match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white' key={element.championId}> {element.summonerName}{element.championId}</div>
                })}
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MatchPage
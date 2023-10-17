"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

 function AppMatchComponent({params}) {
    const [game,setGame] = useState({})
    const [match,setMatch] = useState();
    //console.log(`${game?.event?.match?.games[0].id}`)
    const router = useRouter();
    ///console.log(params)
   
    //110852981980205644
    //Para obtener cada game
    //Hacerlo luego
   /**useEffect(()=>{
    const getGame =async()=>{
      const url =` https://feed.lolesports.com/livestats/v1/window/109919226378791857?startingTime=2019-07-13T16:33:100Z`
      const res = await fetch(url,{
        headers:{
          "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
        }
      });
      const data = await res.json();
      //Importante
     // console.log(data)
      //console.log(data.frames[9]); 
   }
   getGame();
  },[]) */
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
               // console.log(data.data)
            }
            //APikey RGAPI-398c5a9c-3681-46cb-9c7d-82637dd9dea0
            getGame();   
     },[])
     const handleMatch=async(id)=>{
     
      const url = `https://feed.lolesports.com/livestats/v1/window/${id}`
      const res = await fetch(url,{
        headers:{
          "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
        }
      });
      const data = await res.json();
      setMatch(data);
      //Importante
      //  console.log(data)
     // console.log(data); 
 
}
     useEffect(()=>{
      if(!game?.event?.match?.games[0].id)return;
        handleMatch(game?.event?.match?.games[0].id)
     
     },[game?.event?.match?.games[0].id])
  return (
    <section className='bg-blue-700 h-screen container mx-auto'>
        <div className='flex justify-center items-center mb-10 pt-5'>
        <h2 className='text-white  text-center text-4xl '> {game?.event?.league?.name}</h2>
        <img src={game?.event?.league?.image} alt={`Image team `} width={100} height={100}></img>
        </div>
        <div className='flex justify-center gap-5'>
           <div className='flex items-center justify-center'> 
            <h3 className='text-2xl'>{game?.event?.match?.teams[0]?.code}</h3>
            <img src={game?.event?.match?.teams[0].image} alt={`Image team `} width={50} height={50}></img>
           </div>
            <div className='flex items-center bg-slate-500 rounded-lg'>
                <div className='border-r-2'><p className={`text-white  p-2 px-3 text-2xl rounded-xl `}>{game?.event?.match.teams[0].result.gameWins}</p></div>
                <p className='text-white p-2 px-3 text-2xl rounded-xl'>{game?.event?.match?.teams[1].result.gameWins}</p>
            </div>
            <div className='flex items-center justify-center'> 
            <img src={game?.event?.match?.teams[1].image} alt={`Image team ${game?.event?.match?.teams[1].name}`} width={50} height={50}></img>
            <h3 className='text-2xl'>{game?.event?.match.teams[1].code}</h3>
            </div>
        </div>

        <div>
            <nav>
            <div className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 cursor-pointer items-center justify-center gap-2 text-white text-sm  md:justify-center mt-10 md:text-2xl ' > 
                {game && game?.event?.match?.games.map(element=>
                {
                return  element.state ==="completed" && <button key={element.id} className='bg-blue-500  hover:bg-blue-400 transition-colors duration-300 px-5 py-2 rounded-full font-bold font-sans'  onClick={()=>handleMatch(element.id)} value={element.id}> GAME {element.number}</button> 
                }
                )
                }</div>
            </nav>


            <div className='mt-10 font-bold '>
                {/** <p className='text-white'> {match?.esportsGameId}</p> */}
                <div className='flex  flex-col md:flex-row md:justify-evenly'>
                
                <div className=' mb-10 flex md:gap-5 bg-blue-800  justify-between md:justify-center rounded-2xl px-5 py-5'>
                    <div className=''>
                    <div><p className='text-blue-100 mb-5'> Who played </p></div>
                {match && match?.gameMetadata?.blueTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white flex justify-between items-center' key={element.summonerName}>
                    <p >{element.summonerName}</p> 
                    </div>
                    
                })}</div>
                <p>-</p>
               <div>
               <div><p className='text-blue-100 mb-5 text-center'>Champions played </p></div>
                {match && match?.gameMetadata?.blueTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white flex md:justify-between items-center' key={element.championId}>
                 
                    <div className='flex flex-start text-right'>
                    <p className=''>{element.championId}</p>
                    </div>
                    </div> })}
               </div>
                </div>


                    {}
                    <div className=' mb-10 flex md:gap-5 bg-red-700 justify-between rounded-2xl px-5 py-5 md:hidden '>
                    <div className=''>
                    <div><p className='text-blue-100 mb-5'> Who played </p></div>
                {match && match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white flex justify-between items-center' key={element.summonerName}>
                    <p >{element.summonerName}</p> 
                    </div>
                    
                })}</div>
                <p>-</p>
               <div>
               <div><p className='text-blue-100 mb-5 text-center'>Champions played </p></div>
                {match && match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white flex md:justify-between items-center' key={element.championId}>
                 
                    <div className='flex flex-start text-right'>
                    <p className=''>{element.championId}</p>
                    </div>
                    </div> })}
               </div>
                </div>

                
                <div className=' mb-10  md:gap-5 bg-red-800 rounded-2xl px-5 py-5 hidden md:flex'>
                    <div className=''>
                    <div><p className='text-blue-100 mb-5'>Champions played </p></div>
                { match && match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white flex justify-between items-center' key={element.championId}>
                    <p >{element.championId}</p> 
                    </div>
                    
                })}</div>
                <p>-</p>
               <div>
               <div><p className='text-blue-100 mb-5 text-center'>Who played </p></div>
                {match && match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map(element=>{
                return <div className='text-white flex justify-between items-center' key={element.summonerName}>
                 
                    <div className='flex flex-start text-right'>
                    <p className=''>{element.summonerName}</p>
                    </div>
                    </div> })}
               </div>
                </div>

                </div>
            </div>
        </div>
    </section>
  )
}

export default AppMatchComponent
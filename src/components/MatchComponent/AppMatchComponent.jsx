'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function AppMatchComponent({ params }) {
  const [game, setGame] = useState({});
  const [match, setMatch] = useState();
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
  useEffect(() => {
    const getGame = async () => {
      const url = ` https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${params.id}`;
      const res = await fetch(url, {
        headers: {
          'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
        },
      });
      const data = await res.json();
      setGame(data.data);
      //const filterGames = data.data.event.match.games.filter(element=>element.state !== "unneeded")
      //console.log(filterGames);
      // console.log(data.data)
    };
    //APikey RGAPI-398c5a9c-3681-46cb-9c7d-82637dd9dea0
    getGame();
  }, []);
  const handleMatch = async (id) => {
    const url = `https://feed.lolesports.com/livestats/v1/window/${id}`;
    const res = await fetch(url, {
      headers: {
        'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
      },
    });
    const data = await res.json();
    setMatch(data);
    //Importante
    //  console.log(data)
    // console.log(data);
  };
  useEffect(() => {
    if (!game?.event?.match?.games[0].id) return;
    handleMatch(game?.event?.match?.games[0].id);
  }, [game?.event?.match?.games[0].id]);
  return (
    <section className='container mx-auto h-screen bg-blue-700'>
      <div className='mb-10 flex items-center justify-center pt-5'>
        <h2 className='text-center  text-4xl text-white '> {game?.event?.league?.name}</h2>
        <img src={game?.event?.league?.image} alt={`Image team `} width={100} height={100}></img>
      </div>
      <div className='flex justify-center gap-5'>
        <div className='flex items-center justify-center'>
          <h3 className='text-2xl'>{game?.event?.match?.teams[0]?.code}</h3>
          <img
            src={game?.event?.match?.teams[0].image}
            alt={`Image team `}
            width={50}
            height={50}
          ></img>
        </div>
        <div className='flex items-center rounded-lg bg-slate-500'>
          <div className='border-r-2'>
            <p className={`rounded-xl  p-2 px-3 text-2xl text-white `}>
              {game?.event?.match.teams[0].result.gameWins}
            </p>
          </div>
          <p className='rounded-xl p-2 px-3 text-2xl text-white'>
            {game?.event?.match?.teams[1].result.gameWins}
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <img
            src={game?.event?.match?.teams[1].image}
            alt={`Image team ${game?.event?.match?.teams[1].name}`}
            width={50}
            height={50}
          ></img>
          <h3 className='text-2xl'>{game?.event?.match.teams[1].code}</h3>
        </div>
      </div>

      <div>
        <nav>
          <div className='mt-10 grid cursor-pointer grid-cols-3 items-center justify-center gap-2 text-sm text-white md:justify-center  md:text-2xl lg:grid-cols-4 xl:grid-cols-5 '>
            {game &&
              game?.event?.match?.games.map((element) => {
                return (
                  element.state === 'completed' && (
                    <button
                      key={element.id}
                      className='rounded-full  bg-blue-500 px-5 py-2 font-sans font-bold transition-colors duration-300 hover:bg-blue-400'
                      onClick={() => handleMatch(element.id)}
                      value={element.id}
                    >
                      {' '}
                      GAME {element.number}
                    </button>
                  )
                );
              })}
          </div>
        </nav>

        <div className='mt-10 font-bold '>
          {/** <p className='text-white'> {match?.esportsGameId}</p> */}
          <div className='flex  flex-col md:flex-row md:justify-evenly'>
            <div className=' mb-10 flex justify-between rounded-2xl  bg-blue-800 px-5 py-5 md:justify-center md:gap-5'>
              <div className=''>
                <div>
                  <p className='mb-5 text-blue-100'> Who played </p>
                </div>
                {match &&
                  match?.gameMetadata?.blueTeamMetadata?.participantMetadata?.map((element) => {
                    return (
                      <div
                        className='flex items-center justify-between text-white'
                        key={element.summonerName}
                      >
                        <p>{element.summonerName}</p>
                      </div>
                    );
                  })}
              </div>
              <p>-</p>
              <div>
                <div>
                  <p className='mb-5 text-center text-blue-100'>Champions played </p>
                </div>
                {match &&
                  match?.gameMetadata?.blueTeamMetadata?.participantMetadata?.map((element) => {
                    return (
                      <div
                        className='flex items-center text-white md:justify-between'
                        key={element.championId}
                      >
                        <div className='flex-start flex text-right'>
                          <p className=''>{element.championId}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {}
            <div className=' mb-10 flex justify-between rounded-2xl bg-red-700 px-5 py-5 md:hidden md:gap-5 '>
              <div className=''>
                <div>
                  <p className='mb-5 text-blue-100'> Who played </p>
                </div>
                {match &&
                  match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map((element) => {
                    return (
                      <div
                        className='flex items-center justify-between text-white'
                        key={element.summonerName}
                      >
                        <p>{element.summonerName}</p>
                      </div>
                    );
                  })}
              </div>
              <p>-</p>
              <div>
                <div>
                  <p className='mb-5 text-center text-blue-100'>Champions played </p>
                </div>
                {match &&
                  match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map((element) => {
                    return (
                      <div
                        className='flex items-center text-white md:justify-between'
                        key={element.championId}
                      >
                        <div className='flex-start flex text-right'>
                          <p className=''>{element.championId}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className=' mb-10  hidden rounded-2xl bg-red-800 px-5 py-5 md:flex md:gap-5'>
              <div className=''>
                <div>
                  <p className='mb-5 text-blue-100'>Champions played </p>
                </div>
                {match &&
                  match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map((element) => {
                    return (
                      <div
                        className='flex items-center justify-between text-white'
                        key={element.championId}
                      >
                        <p>{element.championId}</p>
                      </div>
                    );
                  })}
              </div>
              <p>-</p>
              <div>
                <div>
                  <p className='mb-5 text-center text-blue-100'>Who played </p>
                </div>
                {match &&
                  match?.gameMetadata?.redTeamMetadata?.participantMetadata?.map((element) => {
                    return (
                      <div
                        className='flex items-center justify-between text-white'
                        key={element.summonerName}
                      >
                        <div className='flex-start flex text-right'>
                          <p className=''>{element.summonerName}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppMatchComponent;

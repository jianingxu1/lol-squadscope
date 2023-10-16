"use client"
import FavTeamContext from '@/context/FavTeam';
import { useTeams } from '@/hooks/useTeams'
import { useRouter } from 'next/navigation';
import {AiFillDelete} from "react-icons/ai"
import React, { Suspense, useContext, useEffect, useState } from 'react'
import RecentMatches from '@/components/MatchRecent';
import { useRecent } from '@/hooks/useRecentMatches';
import FilaRecentMatch from '@/components/FilaRecentMatch';
import { useNextGames } from '@/components/NextGames';
import NextMatch from '@/components/NextMatch';

function TeamPage({params}) {
    const router = useRouter();
    const name = params.id.replace(/%20/g,' ');
    const {teams} = useTeams();
    const {setFavTeam} = useContext(FavTeamContext)
    const [team,setTeam] = useState({});
    const [deleteTeam,setDelete] = useState(false);
    const [show,setShow] = useState();
    const {favTeam,cargando,favTeamGames} = useRecent();

    const {partidos,cargando:loadingNext} = useNextGames(favTeam);
    const deleteFav=()=>{
      setFavTeam({});
      router.push("/")
      localStorage.setItem("favTeam",JSON.stringify({}))
    }
    const handleMenu=(e)=>{
      setShow(e.target.value)
    }
    useEffect(()=>{
        if(!teams)return;
        const team = teams.find(element=>element.name === name);
        setTeam(team);
    },[teams])
    
  return (
    
     <div className='container mx-auto h-screen'>
        <button className=' text-white' onClick={()=>setDelete(!deleteTeam)}>
          <AiFillDelete className='text-4xl'/>
        </button>
        {deleteTeam && 
        <div className='absolute bg-slate-100 text-red-700 px-5 py-5 font-bold text-2xl flex flex-col gap-10'> 
          <p>YOU ARE GOING TO DELETE YOUR FAVOURITE TEAM!</p>
          <div className='flex justify-between'>
            <button className='bg-red-500 py-5 px-2 rounded-lg hover:bg-red-700 text-white' onClick={()=>deleteFav()}>Delete Team</button>
            <button className=' bg-hexblack py-5 px-2 rounded-lg hover:bg-gray-800 text-white' onClick={()=>setDelete(!deleteTeam)}>Back</button>
          </div>
        </div>
        }
       <main className='text-white'>
        <h2 className='text-white text-3xl text-center'>{team?.name}</h2>
        <nav>
          <ul className='flex flex-col md:flex-row md:gap-5 md:mb-10'>
            <li><input type="button"  className={`${show ==="Show last matches" ? "text-green-500 font-bold" :"text-white"} hover:bg-blue-900 uppercase px-2 py-2 cursor-pointer font-bold md:text-2xl`} onClick={e=>handleMenu(e)} value="Show last matches"></input></li>
            <li> <input type="button" className={`${show ==="Show players" ? "text-green-500 font-bold" :"text-white"} hover:bg-blue-900 uppercase px-2 py-2 cursor-pointer font-bold md:text-2xl`} onClick={e=>handleMenu(e)} value="Show players"></input></li>
            <li> <input type="button"  className={`${show ==="Show future matches" ? "text-green-500 font-bold" :"text-white"} hover:bg-blue-900 uppercase px-2 py-2 cursor-pointer font-bold md:text-2xl`} onClick={e=>handleMenu(e)} value="Show future matches"></input></li>
          </ul>
        </nav>
        {show === "Show last matches" &&
          favTeamGames.map(element=><FilaRecentMatch key={Math.random()} match={element}/>)
        }
         {show === "Show players" &&
          <h2 className='text-center text-4xl'>In development</h2>
        }        
        {show === "Show future matches" && <div className='flex justify-center'>{partidos.map(element=><NextMatch key={Math.random()} match={element}/>)}</div> }

       </main>
    </div>
 
  )
}

export default TeamPage
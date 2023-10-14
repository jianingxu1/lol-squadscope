"use client"
import FavTeamContext from '@/context/FavTeam';
import { useTeams } from '@/hooks/useTeams'
import { useRouter } from 'next/navigation';
import {AiFillDelete} from "react-icons/ai"
import React, { Suspense, useContext, useEffect, useState } from 'react'

function TeamPage({params}) {
    const router = useRouter();
    const name = params.id.replace(/%20/g,' ');
    const {teams} = useTeams();
    const {setFavTeam} = useContext(FavTeamContext)
    const [team,setTeam] = useState({});
    const [deleteTeam,setDelete] = useState(false);
    const deleteFav=()=>{
      setFavTeam({});
      router.push("/")
      localStorage.setItem("favTeam",JSON.stringify({}))
    }
    useEffect(()=>{
        if(!teams)return;
        const team = teams.find(element=>element.name === name);
        setTeam(team);
    },[teams])
    
  return (
     <main className='container mx-auto'>
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
       <h2 className='text-white text-3xl text-center'>{team?.name}</h2>
    </main>
 
  )
}

export default TeamPage
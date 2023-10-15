/* eslint-disable @next/next/no-img-element */
"use client"
import FavTeamContext from '@/context/FavTeam';
import { useTeams } from '@/hooks/useTeams';
import React, { useContext, useEffect, useState } from 'react'
import Error from '@/components/Error';
import FilterLeague from '@/components/SearchComponents/FilterLeague';
import { useRouter } from 'next/navigation';

import Formulario from '@/components/SearchComponents/Formulario';
function SearchPage() {
    const {setFavTeam,changeModal,animarCerrar,setAnimarCerrar,leagues,teams,favTeam} = useContext(FavTeamContext)
    const [team,setTeam] = useState("");
    const [results,setResults] = useState([])
    const [error,setError] = useState();
    const [selectLeague,setSelectLeague] = useState("");
    const [filterLeague,setFilterLeague] = useState({});
    const [emptyTeams,setEmptyTeams] = useState(false);
    const router = useRouter();
    
    //Busqueda dandole al submit
    const handleSubmit= e=>{
        e.preventDefault();
        if(team ===""){return; }
            else if (team.length===1) {setError("Write more than one character");return; }
                const teamsS = teams.filter(element=>element.name.toLowerCase().includes(`${team.toLowerCase()}`));
                console.log(teamsS);
                if(teamsS.length > 0  ){
                    setResults(teamsS)
                    setEmptyTeams(false);
                    setError("");
                    setTeam("");
                    setSelectLeague("");
                    setFilterLeague({})
                }
        else{
            setEmptyTeams(true);
            setError("")
            setTeam("");
            setFilterLeague({})
            setResults([])
        }
    }
    //Busqueda mientras escribe [No es muy eficiente, se recarga la pagina todo el rato]
    useEffect(()=>{
        if(team ===""){return; }
        setSelectLeague("")
        setFilterLeague("");
        const teamsS = teams.filter(element=>element.name.toLowerCase().includes(`${team.toLowerCase()}`));
        console.log(teamsS)
        const elementosAgrupados = teamsS.reduce((acumulador, elemento) => {
            const region = elemento.homeLeague.name;
        
            // Verificamos si ya existe un objeto de región en el acumulador
            const regionExistente = acumulador.find(item => item.region === region);
        
            if (regionExistente) {
                // Si existe, agregamos el elemento al array de elementos de la región existente
                regionExistente.elementos.push(elemento);
            } else {
                // Si no existe, creamos un nuevo objeto de región y un array de elementos con el elemento actual
                acumulador.push({
                    region,
                    elementos: [elemento]
                });
            }
        
            return acumulador;
        }, []);
        console.log(elementosAgrupados)
        setResults(elementosAgrupados)
        console.log(teamsS);
    },[team])
    const handleFavTeam =(element)=>{
        setFavTeam(element);
        if(element!=null)
        localStorage.setItem("favTeam",JSON.stringify(element))
    }
   
    //Busqueda seleccionando en el select
    useEffect(()=>{
        setTeam("");
        if(!selectLeague) return;
        const teamsS = teams.filter(element=>element.homeLeague.name === selectLeague);
        setFilterLeague(leagues.find(element=>element.name === selectLeague));
        console.log(teamsS);
        setResults(teamsS);
        setTeam("");
        setError("")
    },[selectLeague])
  return (  
   <section className={`mt-10  flex  container mx-auto flex-col items-center gap-10 `}>
   <h2 className='text-2xl font-extrabold font-sans text-center'>Choose your favorite team and follow all their information!</h2>
  
        <Formulario setSelectLeague={setSelectLeague} selectLeague={selectLeague} setTeam={setTeam} error={error}/>
        {filterLeague.id && 
        <div className='flex font-bold text-3xl bg-slate-600 opacity-100 py-2 px-5 items-center shadow-xl border-2 border-cyan-200 text-white'>
            <p className='text-white'>{filterLeague.name}</p>
            <img src={filterLeague.image} alt={`imagen liga ${filterLeague.name}` } width={60} height={60}/>
        </div>
        }
        <div className="w-full flex flex-col gap-10">
        {
        results.length>0  ?
        (
                    selectLeague && filterLeague?
                    <div className={`flex flex-col  gap-5  justify-center`}>
                        { results.map(element=>
                        <div key={element.id} className='flex items-center bg-cyan-900 justify-center'>
                            <div className='w-full h-max flex items-center'>
                                <img src={element.image} alt={`Imagen equipo ${element.name}`} width={50} height={50} className='filter sepia-50'></img>
                                <h4 className='text-black  opacity-100 text-2xl font-bold'> {element.name} </h4>
                            {/** <p className='text-white '>League: <span className='font-bold'>{element?.homeLeague?.name}</span></p>
                                <p className='text-white'>Region: <span className='font-bold'>{element?.homeLeague?.region}</span></p> */}
                            </div>
                            <button onClick={()=>{handleFavTeam(element); router.push(`/teams/${element.name}`)}} value={element.name} key={element.id} className='bg-blue-900 p-5 flex justify-end '> {element.name === favTeam.name? "EQUIPO FAVORITO" : "N OFAVORITO"} </button>   
                        </div>
                    )
                        }
                    </div>
                    :
                     <>
                    {
                    results.map(element=>
                    (
                    <div className="flex flex-col  gap-5  justify-center" key={element.region}>
                    <h2 className='text-3xl text-center font-bold px-5 p-2'>{element.region}</h2>
                    {
                    element.elementos.map(element=>(
                    <div key={element.id} className='flex items-center bg-cyan-900 justify-center'>
                    <div className='w-full h-max flex items-center'>
                    <img src={element.image} alt={`Imagen equipo ${element.name}`} width={50} height={50} className='filter sepia-50'></img>
                    <h4 className='text-black  opacity-100 text-2xl font-bold'> {element.name} </h4>
                        {/**   <p className='text-white '>League: <span className='font-bold'>{element?.homeLeague?.name}</span></p>
                     <p className='text-white'>Region: <span className='font-bold'>{element?.homeLeague?.region}</span></p> */}
                    </div>
                    <button onClick={()=>{handleFavTeam(element);  router.push(`/teams/${element.name}`)}} value={element.name} key={element.id} className='bg-blue-900 p-5 flex justify-end '> {element.name === favTeam.name? "favorito" :"no faviroto"} </button>   
                    </div>
                ))}

                </div>
                )
                    )
                    }
                    </>
                    )
        :
        emptyTeams && <p className='text-white'>No hay resultados</p>
        }
    </div>
   </section>
  )
}

export default SearchPage
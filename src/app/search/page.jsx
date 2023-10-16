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
        //console.log(elementosAgrupados)
        setResults(elementosAgrupados)
       // console.log(teamsS);
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
       // console.log(teamsS);
        setResults(teamsS);
        setTeam("");
        setError("")
    },[selectLeague])
  return (  
   <section className={`mt-10  flex  container mx-auto flex-col items-center gap-10 h-screen`}>
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
                            <div className='w-full h-max flex items-center ml-10'>
                                <img src={element.image} alt={`Imagen equipo ${element.name}`} width={50} height={50} className='filter sepia-50'></img>
                                <h4 className='text-white font-bold  opacity-100 text-2xl ml-5  font-sans'> {element.name} </h4>
                            {/** <p className='text-white '>League: <span className='font-bold'>{element?.homeLeague?.name}</span></p>
                                <p className='text-white'>Region: <span className='font-bold'>{element?.homeLeague?.region}</span></p> */}
                            </div>
                            <button onClick={()=>{handleFavTeam(element); router.push(`/teams/${element.name}`)}} value={element.name} key={element.id} className='bg-blue-900 p-5 flex justify-end '> {element.name === favTeam.name? 
                            
                            <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="1.5em"
                            width="1.5em"
                            color='red'
                            >
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                            </svg>
                             : 
                              <svg
                              fill="red"
                              viewBox="0 0 16 16"
                              height="1.5em"
                              width="1.5em"
                              >
                              <path d="M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 01-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 01.596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                              </svg>
                        } </button>   
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
                    <button onClick={()=>{handleFavTeam(element);  router.push(`/teams/${element.name}`)}} value={element.name} key={element.id} className='bg-blue-900 p-5 flex        justify-end '> {element.name === favTeam.name?   
                       <svg
                       fill="currentColor"
                       viewBox="0 0 16 16"
                       height="1.5em"
                       width="1.5em"
                       color='red'
                       >
                       <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 01-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                       </svg>
                        : 
                         <svg
                         fill="red"
                         viewBox="0 0 16 16"
                         height="1.5em"
                         width="1.5em"
                         >
                         <path d="M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 01-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 01.596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                         </svg>
                        } 
                        </button>   
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
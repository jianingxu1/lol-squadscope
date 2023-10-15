"use client"
import { useLeagues } from '@/hooks/useLeagues';
import { useTeams } from '@/hooks/useTeams';
import React, { createContext, useState, useContext, useEffect } from 'react';

const FavTeamContext = createContext();
const FavTeamProvider = ({ children }) => {
  const [modal,setModal] = useState(false);
  const[animarCerrar,setAnimarCerrar] = useState(false);
  const [favTeam,setFavTeam] = useState({});
  const {leagues} = useLeagues();
  const {teams} = useTeams();
  const getLocalStorage =()=>{
    const team =localStorage.getItem("favTeam");
   
      if(team)
      setFavTeam( JSON.parse(team));
   
  }
  useEffect(()=>{
    getLocalStorage();
  },[])
  const changeModal =(isCerrar)=> {
    if(isCerrar){
    setTimeout(() => {
        setModal(false);
        }, 1000);
    }
   else{
    setModal(true)
   }
}
  return (
    <FavTeamContext.Provider value={{
      setAnimarCerrar,animarCerrar, setFavTeam,favTeam,leagues,teams}}>
      {children}
    </FavTeamContext.Provider>
  );
};
export{
    FavTeamProvider
}
export default FavTeamContext;
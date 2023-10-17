
import AppTeamComponent from '@/components/TeamComponent/AppTeamComponent'
import React from 'react'

export  const generateMetadata= async({params})=>{
  
  return {
    title:"LOL - " + params.id
  }
}
function TeamPage({params}) {
  console.log(params)
  return <AppTeamComponent params={params}/>
}

export default TeamPage
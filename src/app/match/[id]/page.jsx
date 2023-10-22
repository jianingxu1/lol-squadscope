
import AppMatchComponent from '@/components/MatchComponent/AppMatchComponent'

export async function generateMetadata({params}){
  const url =` https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${params.id}`
  const res = await fetch(url,{
    headers:{
      "x-api-key":"0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
    }
  });
  const data = await res.json();
  return {title:data.data.event.match.teams[0].code + " vs "+ data.data.event.match.teams[1].code + " | LoL SquadScope"}
  }

export default function MatchPage({params}) {
  return <AppMatchComponent params={params}/>
 }
 
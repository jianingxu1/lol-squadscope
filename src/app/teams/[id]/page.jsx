import AppTeamComponent from '@/components/TeamComponent/AppTeamComponent';
import React from 'react';

export const generateMetadata = async ({ params }) => {
  return {
    title: params.id + ' | LoL SquadScope',
  };
};
function TeamPage({ params }) {
  console.log(params);
  return <AppTeamComponent params={params} />;
}

export default TeamPage;

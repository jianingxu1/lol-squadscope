import React from 'react';

function page({ params }) {
  console.log(params.id);
  return <div>hi</div>;
}

export default page;

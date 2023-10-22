import React from 'react';

function HeaderMatch({ game }) {
  return (
    <>
      <h2 className='text-center  text-4xl text-white'> {game?.event?.league?.name}</h2>
      <div className='flex justify-center'>
        <div className='flex items-center justify-center'>
          <h3>{game?.event?.match?.teams[0]?.name}</h3>
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
          <h3>{game?.event?.match.teams[1].name}</h3>
        </div>
      </div>
    </>
  );
}

export default HeaderMatch;

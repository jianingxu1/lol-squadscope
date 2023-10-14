import React from 'react'

function CargandoMatches({children,type}) {
  return (
    <div className={`flex h-52 ${type==="Matches" ? "w-full " :" h-96 w-full mt-10 text-4xl" }  shrink-0 flex-col items-center gap-2 justify-center border-l border-t border-grey-300 bg-blue-700 py-1`}>
      <div>
        <div className=' text-white font-bold'>
          <h2>{children}</h2>
        </div>
      </div>
    </div>
  )
}

export default CargandoMatches
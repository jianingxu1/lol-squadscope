/* eslint-disable @next/next/no-img-element */
import FavTeamContext from '@/context/FavTeam';
import { useTeams } from '@/hooks/useTeams';
import React, { useContext, useEffect, useState } from 'react';
import Error from './Error';
import FilterLeague from './SearchComponents/FilterLeague';
import { useRouter } from 'next/navigation';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Formulario from './SearchComponents/Formulario';
function Modal() {
  const { setFavTeam, changeModal, animarCerrar, setAnimarCerrar, leagues, teams, favTeam } =
    useContext(FavTeamContext);
  const [team, setTeam] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [selectLeague, setSelectLeague] = useState('');
  const [filterLeague, setFilterLeague] = useState({});
  const [emptyTeams, setEmptyTeams] = useState(false);
  const router = useRouter();

  //Busqueda dandole al submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (team === '') {
      return;
    } else if (team.length === 1) {
      setError('Write more than one character');
      return;
    }
    const teamsS = teams.filter((element) =>
      element.name.toLowerCase().includes(`${team.toLowerCase()}`),
    );
    console.log(teamsS);
    if (teamsS.length > 0) {
      setResults(teamsS);
      setEmptyTeams(false);
      setError('');
      setTeam('');
      setSelectLeague('');
      setFilterLeague({});
    } else {
      setEmptyTeams(true);
      setError('');
      setTeam('');
      setFilterLeague({});
      setResults([]);
    }
  };
  //Busqueda mientras escribe [No es muy eficiente, se recarga la pagina todo el rato]
  useEffect(() => {
    if (team === '') {
      return;
    }
    setSelectLeague('');
    setFilterLeague('');
    const teamsS = teams.filter((element) =>
      element.name.toLowerCase().includes(`${team.toLowerCase()}`),
    );
    console.log(teamsS);
    const elementosAgrupados = teamsS.reduce((acumulador, elemento) => {
      const region = elemento.homeLeague.name;

      // Verificamos si ya existe un objeto de región en el acumulador
      const regionExistente = acumulador.find((item) => item.region === region);

      if (regionExistente) {
        // Si existe, agregamos el elemento al array de elementos de la región existente
        regionExistente.elementos.push(elemento);
      } else {
        // Si no existe, creamos un nuevo objeto de región y un array de elementos con el elemento actual
        acumulador.push({
          region,
          elementos: [elemento],
        });
      }

      return acumulador;
    }, []);
    console.log(elementosAgrupados);
    setResults(elementosAgrupados);
    console.log(teamsS);
  }, [team]);
  const handleFavTeam = (element) => {
    setFavTeam(element);
    if (element != null) localStorage.setItem('favTeam', JSON.stringify(element));
  };

  //Busqueda seleccionando en el select
  useEffect(() => {
    if (!selectLeague) return;
    const teamsS = teams.filter((element) => element.homeLeague.name === selectLeague);
    setFilterLeague(leagues.find((element) => element.name === selectLeague));
    // console.log(teamsS);
    setResults(teamsS);
    setTeam('');
    setError('');
  }, [selectLeague]);
  return (
    <div className='container py-4 px-8'>
      <div
        className={`container px-4 mx-auto mt-10 flex flex-col items-center gap-10 ${
          animarCerrar ? 'animates' : 'cerrar opacity-0'
        }`}
      >
        <h2 className='font-sans text-2xl font-bold'>
          Choose your favorite team and follow all their information!
        </h2>

        <form onSubmit={handleSubmit} className='flex w-full flex-col items-center'>
          {error && <Error>{error}</Error>}
          <div className='flex w-full justify-center gap-2'>
            <div className='ml-10 flex w-4/5 justify-center gap-5'>
              <input
                onChange={(e) => setTeam(e.target.value)}
                value={team}
                type='text'
                className='border-2 border-blue-100 bg-grey-100 px-5 py-2'
                placeholder='Type your favorite team'
              ></input>

              {/**  <input type="submit" className='text-white bg-blue-200 px-5 py-2 uppercase font-bold cursor-pointer hover:bg-blue-300 transition-all duration-500'  value="SEARCH TEAM"/>*/}
            </div>

            <FilterLeague
              leagues={leagues}
              setSelectLeague={setSelectLeague}
              selectLeague={selectLeague}
            />
          </div>
        </form>
        {/* <Formulario error={error} setTeam={setTeam} team= setSelectLeague={setSelectLeague} selectLeague={selectLeague} /> */}
        {filterLeague.id && (
          <div className='flex items-center border-2 border-cyan-200 bg-slate-600 px-5 py-2 text-3xl font-bold text-white opacity-100 shadow-xl'>
            <p className='text-white'>{filterLeague.name}</p>
            <img
              src={filterLeague.image}
              alt={`imagen liga ${filterLeague.name}`}
              width={60}
              height={60}
            />
          </div>
        )}
        <div className='flex w-full flex-col gap-10'>
          {results.length > 0 ? (
            selectLeague ? (
              <div className={`flex flex-col  justify-center  gap-5`}>
                {results.map((element) => (
                  <div key={element.id} className='flex items-center justify-center bg-cyan-900'>
                    <div className='flex h-max w-full items-center'>
                      <img
                        src={element.image}
                        alt={`Imagen equipo ${element.name}`}
                        width={50}
                        height={50}
                        className='sepia-50 filter'
                      ></img>
                      <h4 className='text-2xl  font-bold text-black opacity-100'> {element.name} </h4>
                      {/** <p className='text-white '>League: <span className='font-bold'>{element?.homeLeague?.name}</span></p>
              <p className='text-white'>Region: <span className='font-bold'>{element?.homeLeague?.region}</span></p> */}
                    </div>
                    <button
                      onClick={() => {
                        handleFavTeam(element);
                        setAnimarCerrar(false);
                        changeModal(true);
                        router.push(`/teams/${element.name}`);
                      }}
                      value={element.name}
                      key={element.id}
                      className='flex justify-end bg-blue-900 p-5 '
                    >
                      {' '}
                      {element.name === favTeam.name ? <FavoriteIcon /> : <FavoriteBorderIcon />}{' '}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {results.map((element) => (
                  <div className='flex flex-col  justify-center  gap-5' key={element.region}>
                    <h2 className='p-2 px-5 text-center text-3xl font-bold'>{element.region}</h2>
                    {element.elementos.map((element) => (
                      <div key={element.id} className='flex items-center justify-center bg-cyan-900'>
                        <div className='flex h-max w-full items-center'>
                          <img
                            src={element.image}
                            alt={`Imagen equipo ${element.name}`}
                            width={50}
                            height={50}
                            className='sepia-50 filter'
                          ></img>
                          <h4 className='text-2xl  font-bold text-black opacity-100'>
                            {' '}
                            {element.name}{' '}
                          </h4>
                          {/**   <p className='text-white '>League: <span className='font-bold'>{element?.homeLeague?.name}</span></p>
             <p className='text-white'>Region: <span className='font-bold'>{element?.homeLeague?.region}</span></p> */}
                        </div>
                        <button
                          onClick={() => {
                            handleFavTeam(element);
                            setAnimarCerrar(false);
                            changeModal(true);
                            router.push(`/teams/${element.name}`);
                          }}
                          value={element.name}
                          key={element.id}
                          className='flex justify-end bg-blue-900 p-5 '
                        >
                          {' '}
                          {element.name === favTeam.name ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}{' '}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )
          ) : (
            emptyTeams && <p className='text-white'>There are no results</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;

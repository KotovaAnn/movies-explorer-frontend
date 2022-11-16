import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  const location = useLocation();
  const films = props.moviesData;
  const foundMovies = JSON.parse(localStorage.getItem('found-movies')) || [];

  return(
    <section className='movies-cardlist'>

      {
        <ul className='movies-cardlist__movies-list'>
          {
            films.map((item) => { 
              return <MoviesCard 
                movieData={item}
                handleClickMovie={props.handleClickMovie}
                savedMoviesData={props.savedMoviesData}
                deleteSavedMovie={props.deleteSavedMovie}
                key={item.id || item._id}/>
            })
          }
        </ul>
      }

      {
        (location.pathname === '/movies' && films !== null) ? ((films.length < foundMovies.length) ? 
        (<button className='movies-cardlist__show-more' onClick={props.handleShowMore}>Еще</button>) : ("")) :  ("")
      }
      
    </section>
  )
}

export default MoviesCardList;
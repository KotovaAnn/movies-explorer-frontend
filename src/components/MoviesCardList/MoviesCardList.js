import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  const location = useLocation();
  const films = props.moviesData;
  const foundMovies = JSON.parse(localStorage.getItem('found-movies'))

  return(
    <section className='movies-cardlist'>

      {
        (props.isNoFoundMovies ? (
            <span className="movies-cardlist__notfound">Ничего не найдено</span>
          ) :
          (
            <ul className='movies-cardlist__movies-list'>
              {
                films.map((item) => { 
                  return (<MoviesCard movieData={item} key={item._id}/>)
                })
              }
            </ul>
          )
        )
      }

      {
        (location.pathname === '/movies' && ((films.length !== 0) && (films.length < foundMovies.length))) ? (
          <button className='movies-cardlist__show-more' onClick={props.handleShowMore}>Еще</button>
        ) : ""
      }
      
    </section>
  )
}

export default MoviesCardList;
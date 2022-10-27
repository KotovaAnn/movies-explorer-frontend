import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';

function Movies(props) {
  const [ErrorApiMovies, serErrorApiMovies] = useState(false);

  useEffect(() => {
    getError();
  }, [props.apiResStatusGetMovies])

  function getError() {
    if(props.apiResStatusGetMovies) {
      switch (props.apiResStatusGetMovies) {
        case 200:
          serErrorApiMovies(false);
          break;
        default:
          serErrorApiMovies(true);
          break;
      };
    }
  }

  return(
    <main className="movies">
      <SearchForm />
      {ErrorApiMovies && (
        <p className="movies__not-found-movies">Упс! Ничего не найдено...</p>
      )}
      <MoviesCardList dataMovies={props.dataMovies} ErrorApiMovies={ErrorApiMovies}/>
    </main>
  )
}
export default Movies;

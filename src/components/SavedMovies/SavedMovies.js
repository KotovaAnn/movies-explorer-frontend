import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';

function SavedMovies(props) {
  const [ErrorApiMovies, serErrorApiMovies] = useState(false);

  useEffect(() => {
    getError();
  }, [props.apiResStatusGetSaveMovies])

  function getError() {
    if(props.apiResStatusGetSaveMovies) {
      switch (props.apiResStatusGetSaveMovies) {
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
        <main className="saved-movies">
          <SearchForm />
          {ErrorApiMovies && (
            <p className="saved-movies__not-found-movies">Сохраненных фильмов нет</p>
          )}
          <MoviesCardList dataMovies={props.dataSavedMovies} ErrorApiMovies={ErrorApiMovies}/>
        </main>
      )
}
export default SavedMovies;
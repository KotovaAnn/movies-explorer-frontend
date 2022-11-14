import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  function handleSubmit(data) {
    props.onSubmit(data);
  }

  return(
    <main className="saved-movies">
      <SearchForm onSubmit={handleSubmit} filterSavedMovies={props.filterSavedMovies} handleCheckShortFilms={props.handleCheckShortFilms}/>

      {props.isLoading && (
        <Preloader />
      )}

      {!props.isLoading && props.errorGeSavedMovies && (
        <p className="movies__not-found-movies">'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'</p>
      )}

      {
        (!props.isLoading && props.isNoFoundSavedMovies) ? 
        (<p className="saved-movies__not-found-movies">Сохраненных фильмов нет</p>) :
        (
          <MoviesCardList
            moviesData={(props.foundSavedMoviesData.length !== 0) ? props.foundSavedMoviesData : props.savedMoviesData}
            isNoFoundSavedMovies={props.isNoFoundSavedMovies}
            deleteSavedMovie={props.deleteSavedMovie}
            />
        )
      }

    </main>
  )
}

export default SavedMovies;
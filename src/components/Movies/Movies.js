import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

  function handleSubmit(data) {
    props.onSubmit(data);
  }

  return(
    <main className="movies">

      <SearchForm onSubmit={handleSubmit} filterMovies={props.filterMovies}/>

      {props.isLoading && (
        <Preloader />
      )}

      {!props.isLoading && props.errorGetMovies && (
        <p className="movies__not-found-movies">'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'</p>
      )}

      {!props.isLoading && props.isNoFoundMovies &&  (
          <span className="movies-cardlist__notfound">Ничего не найдено</span>
      )}

      <MoviesCardList
        moviesData={props.moviesData}
        handleClickMovie={props.handleClickMovie}
        handleShowMore={props.handleShowMore}
        savedMoviesData={props.savedMoviesData}
        />

    </main>
  )
}
export default Movies;

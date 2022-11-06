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
      {!props.isLoadingData && props.isNoMoviesFound && (
        <p className="movies__not-found-movies">'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'</p>
      )}
      {props.isLoadingData && (
        <Preloader />
      )}
      <MoviesCardList
        moviesData={props.moviesData}
        isNoFoundMovies={props.isNoFoundMovies}
        handleShowMore={props.handleShowMore}
        />
    </main>
  )
}
export default Movies;

import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();
  const likedMovie = props.savedMoviesData ? props.savedMoviesData.some((item) => item.movieId === props.movieData.id) : false;
  const imagelink = location.pathname === '/saved-movies' ? props.movieData.image : `https://api.nomoreparties.co/${props.movieData.image.url}`;

  function getTime (duration) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hours}ч ${minutes}м`;
  }
 
  function handleClickMovie() {
    props.handleClickMovie(props.movieData);
  }
  function handleDeleteMovie() {
    props.deleteSavedMovie(props.movieData);
  }
  return (
    <li className="moviesCard" id={props.movieData._id}>
      <h3 className="moviesCard__title">{props.movieData.nameRU || props.movieData.nameEN}</h3>
      <p className="moviesCard__description">{getTime(props.movieData.duration || 0)}</p>
      {
        (location.pathname === '/saved-movies') ? (
          <button className="moviesCard__remove-button" onClick={handleDeleteMovie} type="button" />
        ) : (location.pathname === '/movies') ? (
          <button className={likedMovie ? ('moviesCard__like-button_active') : ('moviesCard__like-button')} onClick={handleClickMovie} />
        ) : ("")
      }
      <a className="moviesCard__link" 
        href={props.movieData.trailerLink}
        target="_blank" rel="noreferrer"
        aria-label={`Открыть трейлер фильма "${props.movieData.nameRU || props.movieData.nameEN}"`}
        >
      <img className="moviesCard__image" src={imagelink} alt={props.movieData.nameRU || props.movieData.nameEN} />  
      </a>
    </li>
  )
}
export default MoviesCard;

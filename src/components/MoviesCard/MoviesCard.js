import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();

  function getTime (duration) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hours}ч ${minutes}м`;
  }

  function handleClickLikeMovie() {

  }

  return (
    <li className="moviesCard" id={props.movieData._id}>
      <h3 className="moviesCard__title">{props.movieData.nameRU || props.movieData.nameEN}</h3>
      <p className="moviesCard__description">{getTime(props.movieData.duration || 0)}</p>
      <button className={
        (location.pathname === '/saved-movies') ? ('moviesCard__remove-button') : 
        (location.pathname === '/movies' && props.movieData.saved) ? ('moviesCard__like-button_active') : 
        ('moviesCard__like-button')}
       onClick={handleClickLikeMovie} 
       type="button"/>
      <a className="moviesCard__link" 
        href={props.movieData.trailer} 
        aria-label={`Открыть трейлер фильма "${props.movieData.nameRU || props.movieData.nameEN}" на youtube.com`}
        >
        <img className="moviesCard__image" src={`https://api.nomoreparties.co/${props.movieData.image.url}`} alt={props.movieData.nameRU || props.movieData.nameEN} />  
      </a>
    </li>
  )
}
export default MoviesCard;
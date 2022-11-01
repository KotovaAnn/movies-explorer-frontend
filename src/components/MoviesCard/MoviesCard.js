import { useLocation } from 'react-router-dom';

function MoviesCard({ movieData }) {
  const location = useLocation();
  function getTime (duration) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hours}ч ${minutes}м`;
  }
  function handleClickLikeMovie() {

  }

  return (
    <li className="moviesCard" id={movieData._id}>
      <h3 className="moviesCard__title">{movieData.nameRU || movieData.nameEN}</h3>
      <p className="moviesCard__description">{getTime(movieData.duration || 0)}</p>
      <button className={
        (location.pathname === '/saved-movies') ? ('moviesCard__remove-button') : 
        (location.pathname === '/movies' && movieData.saved) ? ('moviesCard__like-button_active') : 
        ('moviesCard__like-button')}
       onClick={handleClickLikeMovie} 
       type="button"/>
      <a className="moviesCard__link" 
        href={movieData.trailer} 
        aria-label={`Открыть трейлер фильма "${movieData.nameRU || movieData.nameEN}" на youtube.com`}
        >
        <img className="moviesCard__image" src={movieData.image} alt={movieData.nameRU || movieData.nameEN} />  
      </a>
    </li>
  )
}
export default MoviesCard;
import { useState } from 'react';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [movie, setMovie] = useState("");
  const [noKeyword, setIsNoKeyword] = useState(false);

  function handleChange(evt){
    setMovie(evt.target.value);
    setIsNoKeyword(false);
    if(evt.target.value === "") {
      setMovie("");
      props.onSubmit("");
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if(!movie) {
      setIsNoKeyword(true);
    }
    props.onSubmit(movie);
  };
  
  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <img className="search-form__icon" src={searchIcon} alt="Лупа"/>
      <input 
        className="search-form__input"
        type="text"
        id="search-form-text-input"
        placeholder="Фильм"
        required
        name="searchFormInput"
        maxLength="30"
        value={movie || ""}
        onChange={handleChange}
        />
      <FilterCheckbox filterMovies={props.filterMovies} filterSavedMovies={props.filterSavedMovies} movie={movie}/>
      {
        noKeyword && <span className="search-form__validate-error">Название фильма не может быть пустым</span>
      }
      <button className="search-form__btn" type="submit"></button>
      <div className="search-form__border"></div>
    </form>
  )
}

export default SearchForm;

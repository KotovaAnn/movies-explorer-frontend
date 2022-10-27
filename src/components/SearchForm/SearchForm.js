import React from "react";
import { useState } from 'react';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [movie, setMovie] = useState("");

  function handleChange(evt){
    setMovie(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(movie);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <img className="search-form__icon" src={searchIcon} alt="Лупа"/>
      <input 
        className="search-form__input"
        type="text"
        id="search-form-text-input"
        placeholder="Фильм"
        name="searchFormInput"
        maxLength="30"
        value={movie}
        onChange={handleChange}
        />
      <FilterCheckbox />
      <button className="search-form__btn" type="submit"></button>
      <div className="search-form__border"></div>
    </form>
  )
}
export default SearchForm;

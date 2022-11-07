import { useState, useEffect } from 'react';

function FilterCheckbox(props) {
  const [onFocus, setOnFocus] = useState(false);
  const [checkedShortFilms, setCheckedShortFilms] = useState(false);

  function handleOnFocus() {
    setOnFocus(!onFocus);
  };

  function handleOffFocus() {
    setOnFocus(false);
  };

  const handleCheckShortFilms = () => {
    setCheckedShortFilms(!checkedShortFilms);
    //localStorage.setItem('checkbox', checkedShortFilms);
    if(props.movie) {
      props.filterMovies(props.movie, !checkedShortFilms);
    }
  };
 
  return (
    <div className="filter-checkbox">
      <label
      className="filter-checkbox__label"
      onFocus={handleOnFocus}
      onBlur={handleOffFocus}
      >
      <input 
        className="filter-checkbox__input"
        type="checkbox"
        role="switch"
        onFocus={handleOnFocus}
        onBlur={handleOffFocus}
        id='filter-checkbox-shortfilm'
        name='filterShortfilm'
        //onChange={handleCheckShortFilms}
        onClick={handleCheckShortFilms}
        />
        <span className="filter-checkbox__slider"/>
        Короткометражки
    </label>
    </div>
  )
}
export default FilterCheckbox;
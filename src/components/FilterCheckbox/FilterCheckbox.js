import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox(props) {
  const [onFocus, setOnFocus] = useState(false);
  const [checkedShortFilms, setCheckedShortFilms] = useState(false);
  const location = useLocation();

  function handleOnFocus() {
    setOnFocus(!onFocus);
  };

  function handleOffFocus() {
    setOnFocus(false);
  };

  const handleCheckShortFilms = () => {
    setCheckedShortFilms(!checkedShortFilms);
    if(location.pathname === '/movies' && props.movie) {
      props.filterMovies(props.movie, !checkedShortFilms);
    } else if(location.pathname === '/saved-movies' && props.movie) {
      console.log('функция чекбокса работает')
      console.log(`чекбокса ${!checkedShortFilms}`)
      props.filterSavedMovies(props.movie, !checkedShortFilms);
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
        onClick={handleCheckShortFilms}
        />
        <span className="filter-checkbox__slider"/>
        Короткометражки
    </label>
    </div>
  )
}
export default FilterCheckbox;
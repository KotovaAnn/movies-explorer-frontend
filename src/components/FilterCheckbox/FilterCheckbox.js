import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox(props) {
  const location = useLocation();
  const [cheked, setCheked] = useState(false);

  const handleCheckShortFilms = () => {
    setCheked(!cheked);

    if(location.pathname === '/movies') {
      props.handleCheckShortFilms();
      props.filterMovies(props.movie);
    } else if(location.pathname === '/saved-movies') {
      props.filterSavedMovies(props.movie, !cheked);
    }
  };

  return (
    <div className="filter-checkbox">
      <label
      className="filter-checkbox__label"
      >
      <input 
        className="filter-checkbox__input"
        type="checkbox"
        role="switch"
        id='filter-checkbox-shortfilm'
        name='filterShortfilm'
        onChange={handleCheckShortFilms}
        checked={props.checked}
        />
        <span className="filter-checkbox__slider"/>
        Короткометражки
    </label>
    </div>
  )
}
export default FilterCheckbox;
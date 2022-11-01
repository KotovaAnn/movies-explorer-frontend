import { useState } from 'react';

function FilterCheckbox(props) {
  const [onFocus, setOnFocus] = useState(false);
  const [shortfilm, setShortfilm] = useState(false);

  function handleOnFocus() {
    setOnFocus(!onFocus);
  };

  function handleOffFocus() {
    setOnFocus(false);
  };

  function handleChange(evt) {
    setShortfilm(evt.target.value);
  }

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
        onChange={handleChange}
        value={shortfilm}
        checked={shortfilm || ''}
        />
        <span className="filter-checkbox__slider"/>
        Короткометражки
    </label>
    </div>
  )
}
export default FilterCheckbox;
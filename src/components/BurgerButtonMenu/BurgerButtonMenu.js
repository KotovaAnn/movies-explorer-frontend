import React from 'react';

const BurgerButtonMenu = React.memo((props) => {
  return (
    <button className="burger-button-menu" onClick={props.onOpenMenu}/>
  )
});

export default BurgerButtonMenu;
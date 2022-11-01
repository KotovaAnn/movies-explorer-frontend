import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentLoggedInContext } from '../../contexts/CurrentLoggedInContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RenderLoading from '../../utils/utils';
import api from '../../utils/api';
import * as auth from '../../utils/auth';
import NotFound from '../NotFound/NotFound';;

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: 'Виталий', email: 'vitaly@mail.ru'});
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function onSubmitButton() {
    setIsLoading(true);
  }

  function handleLogin(email, password) {
    return setLoggedIn(false);
  }

  function handleRegistration(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if(res) {
          setRegistered(true);
          history.push('/signin');
        } 
      })
      .catch(err => {
        setRegistered(false);
      });
  }
  function handleUpdateProfile({ name, email }) {
    setCurrentUser({name, email});
    /*api.setUserInfo(inputValues)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(res => {
        setIsLoading(false);
      });*/
  }

function signout() {
  setIsLoading(false);
}

function onOpenMenu() {
  setIsOpenMenu(true);
}

function onCloseMenu() {
  setIsOpenMenu(false);
}
  return (
    <div className="page">
      <CurrentLoggedInContext.Provider value={loggedIn}>
        <CurrentUserContext.Provider value={currentUser}>
        <Header onOpenMenu={onOpenMenu}/>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route path="/profile">
              <Profile
                onUpdateUser={handleUpdateProfile}
                onSubmitButton={onSubmitButton}
                renderLoading={RenderLoading(isLoading)}
                signout={signout}
              />
            </Route>  
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register handleRegistration={handleRegistration} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer />
          <BurgerMenu isOpenMenu={isOpenMenu} onCloseMenu={onCloseMenu}/>
        </CurrentUserContext.Provider>
      </CurrentLoggedInContext.Provider>
    </div>
  );
}

export default App;

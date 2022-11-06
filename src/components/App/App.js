import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentLoggedInContext } from '../../contexts/CurrentLoggedInContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import RenderLoading from '../../utils/utils';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import NotFound from '../NotFound/NotFound';;

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isInfotooltip, setIsInfotooltip] = useState(false);

  const [currentUser, setCurrentUser] = useState({name: 'Виталий', email: 'vitaly@mail.ru'});

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [moviesData, setMoviesData] = useState([]);
  const [isFoundMovies, setIsFoundMovies] = useState([]);
  const [isNoFoundMovies, setIsNoFoundMovies] = useState(false);
  const [checkedShortFilms, setCheckedShortFilms] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreCards, setMoreCards] = useState(0);

  function handleRegistration(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if(res) {
          setRegistered(true);
          setIsInfotooltip(true);
          handleLogin(email, password);
        } 
      })
      .catch(err => {
        setRegistered(false);
        setIsInfotooltip(true);
      });
  }
  function handleLogin(name, email, password) {
    auth.authorize(email, password)
      .then((res) => { 
        setLoggedIn(true);
        setCurrentUser(res);
        getUserInfo();
        history.push('/movies');
      })
      .catch(err => {
        setLoggedIn(false);
        console.log(err);
        setIsInfotooltip(true);
      });
  }
  function handleCloseInfotooltip() {
    setIsInfotooltip(false);
  }
  function getUserInfo() {
    mainApi.getInfoUser()
      .then(res => {
        setCurrentUser(res);
        setLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    mainApi.getInfoUser()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setLoggedIn(false);
          setMoviesData([]);
          history.push('/');
          localStorage.clear();
        }
        console.log(err);
      });
  }, [history]);
/*
  useEffect(() => {
    if (loggedIn) {
      mainApi.getInfoUser()
      .then(res => {
        setCurrentUser(res);
        console.log(loggedIn)
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [loggedIn]);*/

  function onSubmitButton() {
    setIsLoading(true);
  }
  function handleUpdateProfile({ name, email }) {
    setCurrentUser({name, email});
    mainApi
      .setUserInfo(name, email)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(res => {
        setIsLoading(false);
      });
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

  function handleSearchMovies(keyWord = {}) {
    if(moviesData.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMoviesData()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res));
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
    filterMovies(keyWord);
    handleResize();
  };

  const filterMovies = useCallback((keyWord) => {
    const localMoviesData = JSON.parse(localStorage.getItem('movies'));
    if (localMoviesData) {
      const foundMovies = onFilterMovies(keyWord, localMoviesData);
      localStorage.setItem('found-movies', JSON.stringify(foundMovies));
      setIsFoundMovies(foundMovies);
      if (foundMovies.length === 0 || null) {
          setIsNoFoundMovies(true);
        } else {
          setIsNoFoundMovies(false);
        }
      }
    }, [checkedShortFilms]);
    
  
  function onFilterMovies(keyWord, localMoviesData) {
    const checkbox = localStorage.getItem('checkbox');
    const searchedShortFilms = (item) => {
      return item.duration <= 40;
    };

    const searchedMovies = (item) => {
      return JSON.stringify(item.nameRU).toLowerCase().includes(keyWord.toLowerCase());
    };
    
    if (checkbox === 'true') {
      return localMoviesData.filter(searchedMovies).filter(searchedShortFilms);
    } else {
      return localMoviesData.filter(searchedMovies);
    }
  }

  function handleResize() {
    //const foundMovies = JSON.parse(localStorage.getItem('found-movies'));
    if (isFoundMovies === null) {
      setMoviesData([]);
      return;
    }
    if (windowWidth >= 1280) {
      setMoviesData(isFoundMovies.slice(0, 12))
      setMoreCards(3)
    } else if (windowWidth > 480 && windowWidth < 1280) {
      setMoviesData(isFoundMovies.slice(0, 8))
      setMoreCards(2)
    } else if (windowWidth <= 480) {
      setMoviesData(isFoundMovies.slice(0, 5))
      setMoreCards(2)
    }
  }
  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth);
    handleResize();
  }, [windowWidth])

  function handleShowMore() {
    const foundMovies = JSON.parse(localStorage.getItem('found-movies'))
    setMoviesData(foundMovies.slice(0, moviesData.length + moreCards))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onOpenMenu={onOpenMenu} loggedIn={loggedIn}/>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/signup">
              <Register handleRegistration={handleRegistration} />
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              isNoFoundMovies={isNoFoundMovies}
              onSubmit={handleSearchMovies}
              moviesData={moviesData}
              filterMovies={filterMovies}
              handleShowMore={handleShowMore}
              />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateProfile}
              onSubmitButton={onSubmitButton}
              renderLoading={RenderLoading(isLoading)}
              signout={signout}
              /> 
            
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip isOpen={isInfotooltip} onClose={handleCloseInfotooltip} registered={registered}/>
          <Footer />
          <BurgerMenu isOpenMenu={isOpenMenu} onCloseMenu={onCloseMenu}/>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

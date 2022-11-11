import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isInfotooltip, setIsInfotooltip] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: 'Виталий', email: 'vitaly@mail.ru'});

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [moviesData, setMoviesData] = useState([]);
  const [errorGetMovies, setErrorGetMovies] = useState(false);
  const [isFoundMovies, setIsFoundMovies] = useState([]);
  const [isNoFoundMovies, setIsNoFoundMovies] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreCards, setMoreCards] = useState(0);

  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [foundSavedMoviesData, setFoundSavedMoviesData] = useState([]);
  const [isNoFoundSavedMovies, setIsNoFoundSavedMovies] = useState(false);
  const [errorGetSavedMovies, setErrorGetSavedMovies] = useState(false);

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
        localStorage.setItem('loggedIn', true);
        setCurrentUser(res);
        getUserInfo();
        getSavedMovies();
        history.push('/movies');
      })
      .catch(err => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', false);
        console.log(err);
        setIsInfotooltip(true);
      });
  }

  function handleSignout() {
    auth.signout()
      .then((res) => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', false);
        setIsLoading(false);
        localStorage.clear();
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCloseInfotooltip() {
    setIsInfotooltip(false);
  }

  function getUserInfo() {
    mainApi.getInfoUser()
      .then(res => {
        setCurrentUser(res);
        localStorage.setItem('loggedIn', true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getSavedMovies() {
    mainApi.getSavedMovies()
    .then(res => {
      setSavedMoviesData(res);
      setLoggedIn(true);
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('saved-movies', JSON.stringify(res));
      setErrorGetSavedMovies(false);
      if(res.length === 0) {
        setIsNoFoundSavedMovies(true);
      } else {
        setIsNoFoundSavedMovies(false);
      }
    })
    .catch(err => {
      console.log(err);
      setErrorGetSavedMovies(true);
      setLoggedIn(false);
      localStorage.setItem('loggedIn', false);
    });
  }

  useEffect(() => {
    if(loggedIn) {
      mainApi.getInfoUser()
      .then((res) => {
        getSavedMovies();
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        setCurrentUser(res);
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setLoggedIn(false);
          localStorage.setItem('loggedIn', false);
          setSavedMoviesData([]);
          history.push('/');
          localStorage.clear();
        }
        console.log(err);
      });
    }
  }, [history]);

  useEffect(() => {
    history.listen((location) => {
      setMoviesData([]);
      setFoundSavedMoviesData([]);
    })
  }, [history]);

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

  function onOpenMenu() {
    setIsOpenMenu(true);
  }

  function onCloseMenu() {
    setIsOpenMenu(false);
  }

  function handleSearchMovies(keyWord = {}) {
    if (keyWord === "") {
      setMoviesData([]);
      return;
    }
    if(moviesData.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMoviesData()
        .then((res) => {
          console.log(res)
          localStorage.setItem('movies', JSON.stringify(res));
          setErrorGetMovies(false);
        })
        .catch(err => {
          console.log(err)
          setErrorGetMovies(true);
        })
        .finally(() => setIsLoading(false));
    }
    filterMovies(keyWord);
    handleResize();
  };

  function handleSearchSavedMovies(keyWord = {}) {
    if (keyWord === "") {
      setFoundSavedMoviesData([]);
      return;
    }
    if(savedMoviesData.length !== 0) {
      setIsNoFoundSavedMovies(false)
      const checkedShortFilms = false;
      filterSavedMovies(keyWord, checkedShortFilms);
    } else {
      setIsNoFoundSavedMovies(true);
    }
  }

  const filterSavedMovies = useCallback((keyWord = "", checkedShortFilms) => {
    const localMoviesData = JSON.parse(localStorage.getItem('saved-movies'));
    if (localMoviesData) {
      const foundSavedMovies = onFilterMovies(keyWord, localMoviesData, checkedShortFilms);
      if (foundSavedMovies.length === 0 || null) {
        setIsNoFoundSavedMovies(true);
      } else {
        setIsNoFoundSavedMovies(false);
      }
      setFoundSavedMoviesData(foundSavedMovies);
    }

  }, []);


  const filterMovies = useCallback((keyWord, checkedShortFilms) => {
    const localMoviesData = JSON.parse(localStorage.getItem('movies'));
    if (localMoviesData) {
      const foundMovies = onFilterMovies(keyWord, localMoviesData, checkedShortFilms);
      localStorage.setItem('found-movies', JSON.stringify(foundMovies));
      setIsFoundMovies(foundMovies);
      if (foundMovies.length === 0 || null) {
          setIsNoFoundMovies(true);
        } else {
          setIsNoFoundMovies(false);
          if (windowWidth >= 1280) {
            setMoviesData(isFoundMovies.slice(0, 12));
            setMoreCards(3);
          } else if (windowWidth > 480 && windowWidth < 1280) {
            setMoviesData(isFoundMovies.slice(0, 8));
            setMoreCards(2);
          } else if (windowWidth <= 480) {
            setMoviesData(isFoundMovies.slice(0, 5));
            setMoreCards(2);
          }
        }
      }
  }, []);

  useEffect(() => {
    if (isFoundMovies === null) {
      setMoviesData([]);
      return;
    }
    if (windowWidth >= 1280) {
      setMoviesData(isFoundMovies.slice(0, 12));
      setMoreCards(3);
    } else if (windowWidth > 480 && windowWidth < 1280) {
      setMoviesData(isFoundMovies.slice(0, 8));
      setMoreCards(2);
    } else if (windowWidth <= 480) {
      setMoviesData(isFoundMovies.slice(0, 5));
      setMoreCards(2);
    }
  }, [isFoundMovies]);

  function onFilterMovies(keyWord, localMoviesData, checkedShortFilms) {
    const searchedMovies = localMoviesData.filter((item) => {
      return item.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    });
    const foundMovies = checkedShortFilms ? searchedMovies.filter((item) => {
      return item.duration <= 40
    }) : searchedMovies;
    return foundMovies;
  }
  
  function handleResize() {
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

  function handleClickMovie(movie){
    const movieCard = { 
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    };
    const isLikedMovie = savedMoviesData.some((item) => item.movieId === movieCard.movieId);

    if(isLikedMovie) {
      deleteSavedMovie(movieCard);
    } else {
      mainApi.saveMovie(movieCard)
        .then((res) => {
          setSavedMoviesData([res, ...savedMoviesData]);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  function deleteSavedMovie(movieCard) {
    const deleteCardMovie = savedMoviesData.find((item) => item.movieId === movieCard.movieId);
    mainApi.deleteSavedMovie(deleteCardMovie._id)
      .then((res) => {
        setSavedMoviesData(savedMoviesData.filter((item) => item.movieId !== movieCard.movieId));
      })
      .catch(err => {
        console.log(err);
      })
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
              isLoading={isLoading}
              errorGetMovies={errorGetMovies}
              handleClickMovie={handleClickMovie}
              savedMoviesData={savedMoviesData}
              />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              savedMoviesData={savedMoviesData}
              foundSavedMoviesData={foundSavedMoviesData}
              filterSavedMovies={filterSavedMovies}
              isLoading={isLoading}
              onSubmit={handleSearchSavedMovies}
              isNoFoundSavedMovies={isNoFoundSavedMovies}
              errorGetSavedMovies={errorGetSavedMovies}
              deleteSavedMovie={deleteSavedMovie}
              />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateProfile}
              onSubmitButton={onSubmitButton}
              renderLoading={RenderLoading(isLoading)}
              signout={handleSignout}
              /> 
            
            <Route path="*">
              <NotFound />
            </Route>

          </Switch>
          <InfoTooltip isOpen={isInfotooltip} onClose={handleCloseInfotooltip} registered={registered}/>
          <BurgerMenu isOpenMenu={isOpenMenu} onCloseMenu={onCloseMenu}/>
          <Footer />

        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
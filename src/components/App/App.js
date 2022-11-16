import './App.css';
import {
  LARGEST_SIZE,
  SMALL_SIZE,
  RENDER_MOVIES_LARGE,
  RENDER_MOVIES_MEDIUM,
  RENDER_MOVIES_SMALL,
  ZERO_NUMBER,
  MOVIES_TO_ADD_LARGE,
  MOVIES_TO_ADD_MEDIUM,
} from '../../utils/constants';

import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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
  const [emptySeach, setEmptySeach] = useState(false);

  const [cheCkShortFilms, setCheckShortFilms] = useState(JSON.parse(localStorage.getItem('checkbox')));
 
  const [isEditProfile, setIsEditProfile] = useState(false);

  function handleRegistration(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if(res) {
          setRegistered(true);
          setIsInfotooltip(true);
          handleLogin(name, email, password);
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
        setMoviesData([]);
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
        getSavedMovies();
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
      localStorage.setItem('checkboxSaveFilm', false);
      setFoundSavedMoviesData([]);
      setEmptySeach(false);
    })
  }, [history]);

  useEffect(() => {
    history.listen((location) => {
      const savedMovies = JSON.parse(localStorage.getItem('saved-movies'));
      setSavedMoviesData(savedMovies);
      if(savedMovies) {
        if(savedMovies.length === 0) {
          setIsNoFoundSavedMovies(true);
        } else {
          setIsNoFoundSavedMovies(false);
        }
      }
    })
  }, [history, savedMoviesData]);

  function onSubmitButton() {
    setIsLoading(true);
  }

  function handleUpdateProfile({ name, email }) {
    setCurrentUser({name, email});
    mainApi
      .setUserInfo(name, email)
      .then(res => {
        setCurrentUser(res);
        setIsEditProfile(true);
        setIsInfotooltip(true);
      })
      .catch(err => {
        console.log(err);
        setIsEditProfile(false);
        setIsInfotooltip(true);
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
    if(moviesData.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMoviesData()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res));
          setMoviesData(res);
          setErrorGetMovies(false);
          filterMovies(keyWord);
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
      setEmptySeach(false);
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

  const filterSavedMovies = useCallback((keyWord, checkbox) => {
    localStorage.setItem('keyWordSave', keyWord);
    const localMoviesData = JSON.parse(localStorage.getItem('saved-movies'));
    if (localMoviesData) {
      const searchedSavedMovies = localMoviesData.filter((item) => {
        return item.nameRU.toLowerCase().includes(keyWord.toLowerCase())
      });
      const foundSavedMovies = ((checkbox === true) ? (searchedSavedMovies.filter((item) => {
        return item.duration <= 40
      })) : searchedSavedMovies);

      if (foundSavedMovies.length === 0 || null) {
        setIsNoFoundSavedMovies(true);
      } else {
        setIsNoFoundSavedMovies(false);
      }
      setFoundSavedMoviesData(foundSavedMovies);
    }
  }, []);

  const filterMovies = useCallback((keyWord) => {
    localStorage.setItem('keyWord', keyWord);
    const localMoviesData = JSON.parse(localStorage.getItem('movies'));
    
    if (localMoviesData) {
      const foundMovies = onFilterMovies(keyWord, localMoviesData);
      localStorage.setItem('found-movies', JSON.stringify(foundMovies));
      setIsFoundMovies(foundMovies);
      if (foundMovies.length === 0 || null) {
          setIsNoFoundMovies(true);
        } else {
          setIsNoFoundMovies(false);
          if (windowWidth >= LARGEST_SIZE) {
            setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_LARGE));
            setMoreCards(3);
          } else if (windowWidth > SMALL_SIZE && windowWidth < LARGEST_SIZE) {
            setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_MEDIUM));
            setMoreCards(2);
          } else if (windowWidth <= SMALL_SIZE) {
            setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_SMALL));
            setMoreCards(2);
          }
        }
      }
  }, [cheCkShortFilms]);

  useEffect(() => {
    const foundMovies = JSON.parse(localStorage.getItem('found-movies'));
    if (foundMovies === null) {
      return;
    }
    if (windowWidth >= LARGEST_SIZE) {
      setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_LARGE));
      setMoreCards(3);
    } else if (windowWidth > SMALL_SIZE && windowWidth < LARGEST_SIZE) {
      setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_MEDIUM));
      setMoreCards(2);
    } else if (windowWidth <= SMALL_SIZE) {
      setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_SMALL));
      setMoreCards(2);
    }
  }, [isFoundMovies, cheCkShortFilms]);

  const handleCheckShortFilms = () => {
    setCheckShortFilms(!cheCkShortFilms);
    localStorage.setItem('checkbox', !cheCkShortFilms);
  };

  function onFilterMovies(keyWord, localMoviesData) {
    const searchedMovies = localMoviesData.filter((item) => {
      return item.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    });
    const foundMovies = ((cheCkShortFilms === true) ? (searchedMovies.filter((item) => {
      return item.duration <= 40
    })) : searchedMovies);
    return foundMovies;
  }

  useEffect(() => {
    const checkbox = localStorage.getItem('checkbox');
    setCheckShortFilms(JSON.parse(checkbox));
  }, []);

  useEffect(() => {
    const localMoviesData = JSON.parse(localStorage.getItem('movies'));   
    const keyWord = localStorage.getItem('keyWord');
    filterMovies(keyWord, localMoviesData);
  }, [filterMovies, cheCkShortFilms]);

  function handleResize() {
    const foundMovies = JSON.parse(localStorage.getItem('found-movies'));

    if (foundMovies === null) {
      return;
    }

    if (windowWidth >= LARGEST_SIZE) {
      setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_LARGE))
      setMoreCards(MOVIES_TO_ADD_LARGE)
    } else if (windowWidth > SMALL_SIZE && windowWidth < LARGEST_SIZE) {
      setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_MEDIUM))
      setMoreCards(MOVIES_TO_ADD_MEDIUM)
    } else if (windowWidth <= SMALL_SIZE) {
      setMoviesData(foundMovies.slice(ZERO_NUMBER, RENDER_MOVIES_SMALL))
      setMoreCards(MOVIES_TO_ADD_MEDIUM)
    }
  }
  
  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth);
    handleResize();
    return () => window.removeEventListener('resize', checkWindowWidth);
  }, [windowWidth])

  function handleShowMore() {
    const foundMovies = JSON.parse(localStorage.getItem('found-movies'))
    setMoviesData(foundMovies.slice(ZERO_NUMBER, moviesData.length + moreCards))
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
          localStorage.setItem('saved-movies', JSON.stringify([res, ...savedMoviesData]));
          setSavedMoviesData([res, ...savedMoviesData]);
        })
        .catch(err => {
          console.log(err);
          if (err === 'Ошибка: 401') {
            setLoggedIn(false);
            setMoviesData([]);
            setSavedMoviesData([]);
            history.push('/');
            localStorage.clear();
          }
        })
    }
  }

  function deleteSavedMovie(movieCard) {
    const localSavedFilmsData = JSON.parse(localStorage.getItem('saved-movies'));
    const movie = localSavedFilmsData.find((i) => i.movieId === movieCard.movieId);

    mainApi.deleteSavedMovie(movie._id)
    .then((res) => {
      const savedMoviesWithoutCard = localSavedFilmsData.filter((m) => m._id !== movie._id && res);
      localStorage.setItem('saved-movies', JSON.stringify(savedMoviesWithoutCard));
      setSavedMoviesData(savedMoviesWithoutCard);
      if(savedMoviesWithoutCard.length === 0) {
        setIsNoFoundSavedMovies(true);
      }
      if(foundSavedMoviesData.length !== 0) {
        const filtredFoundSavedMovies = foundSavedMoviesData.filter((m) => m._id !== movie._id && res);
        if (filtredFoundSavedMovies.length === 0) {
          setEmptySeach(true);
        } else {
          setEmptySeach(false);
        }
        setFoundSavedMoviesData(filtredFoundSavedMovies);
      }
    })
    .catch(err => {
      console.log(err);
      if (err === 'Ошибка: 401') {
        setLoggedIn(false);
        setMoviesData([]);
        setSavedMoviesData([]);
        history.push('/');
        localStorage.clear();
      }
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
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Register handleRegistration={handleRegistration} />
              )}
            </Route>
            <Route path="/signin">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Login handleLogin={handleLogin} />
              )}
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
              handleCheckShortFilms={handleCheckShortFilms}
              checked={cheCkShortFilms}
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
              emptySeach={emptySeach}
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
          <InfoTooltip 
            isOpen={isInfotooltip}
            onClose={handleCloseInfotooltip}
            registered={registered}
            loggedIn={loggedIn}
            isEditProfile={isEditProfile} 
            />
          <BurgerMenu isOpenMenu={isOpenMenu} onCloseMenu={onCloseMenu}/>
          <Footer />

        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
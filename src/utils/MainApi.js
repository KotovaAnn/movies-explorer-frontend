//export const BASE_URL = 'http://localhost:4000';
export const BASE_URL = 'https://api.kot-movies-explore.nomoredomains.icu';

class Api {
  constructor(url) {
    this._url = url;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email
      })
    })
    .then(this._checkResponse);
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse)
  };

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  };

  deleteSavedMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  };
}

const mainApi = new Api(BASE_URL);
export default mainApi;
  
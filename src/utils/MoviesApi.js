const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getMoviesData() {
    return fetch(`${this._url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse);
  }
}
const moviesApi = new MoviesApi(BASE_URL);
export default moviesApi;

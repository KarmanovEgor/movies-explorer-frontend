class MoviesApi {
    constructor(options) {
      this._url = options.baseUrl;
    }
  
    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(res.status);
    }
  
    getMovies() {
      return fetch(`${this._url}/`)
        .then(this._checkResponse);
    }
  }
  
  const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  });
  
  export default moviesApi;
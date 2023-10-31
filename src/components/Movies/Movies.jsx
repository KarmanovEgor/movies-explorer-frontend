import { useCallback, useEffect, useState } from "react";
import Search from "../Search/Search";
import "./Movies.css";
import moviesApi from "../utils/MoviesApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Movies({ setIsError, createMovie, savedMovies }) {
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMouvie, setSearchedMovie] = useState("");
  const [serverError, setServerError] = useState(false)

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search);
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("allmovies", JSON.stringify(movies));
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName =
          movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(search.toLowerCase());
        return isCheck ? searchName && movie.duration <= 30 : searchName;
      })
    );
  }, []);

  function searchMovies(query) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((res) => {
          setAllMovies(res);
          setIsCheck(false);
           setServerError(false)
          filter(query, isCheck, res);
        })
        .catch((err) => {
          console.error(`Ошибка при поиске фильмов ${err}`);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(query, isCheck, allMovies);
    }
  }
  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies);
      const query = JSON.parse(localStorage.movie);
      const isCheck = JSON.parse(localStorage.shorts);
      setServerError(false)
      setSearchedMovie(query);
      setIsCheck(isCheck);
      setAllMovies(movies);
      filter(query, isCheck, movies);
    }
  }, [filter]);
  return (
    <>
      <Header />
      <main className="main">
        <Search
          isCheck={isCheck}
          searchMovies={searchMovies}
          setIsError={setIsError}
          searchedMovie={searchedMouvie}
          movies={allMovies}
          filter={filter}
          setIsCheck={setIsCheck}
        />
        <MoviesCardList
          isLoading={isLoading}
          movies={filteredMovies}
          createMovie={createMovie}
          savedMovies={savedMovies}
          serverError={serverError}
        />
      </main>
      <Footer />
    </>
  );
}

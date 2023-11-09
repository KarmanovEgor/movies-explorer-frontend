import { useCallback, useEffect, useState } from "react";
import Search from "../Search/Search";
import "./Movies.css";
import moviesApi from "../utils/MoviesApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({ setIsError, createMovie, savedMovies }) {
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [serverError, setServerError] = useState(false);
  const [firstLogin, setFirstLogin] = useState(true)

  // Функция для фильтрации фильмов
  const filterMovies = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search);
  
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("allmovies", JSON.stringify(movies));
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName =
          movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(search.toLowerCase());
        return isCheck ? searchName && movie.duration <= 40 : searchName;
      })
    );
  }, []);

  // Функция для поиска фильмов
  function searchMovies(search) {
    // Если список фильмов пустой, то загружаем его с сервера
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((res) => {
          setAllMovies(res);
          setIsCheck(false);
          setFirstLogin(false);
          setServerError(false);
          filterMovies(search, isCheck, res);
        })
        .catch((err) => {
          console.error(`Ошибка при поиске фильмов ${err}`);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      filterMovies(search, isCheck, allMovies);
    }
  }

  // Загрузка данных из LocalStorage при монтировании компонента
  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies);
      const search = JSON.parse(localStorage.movie);
      const isCheck = JSON.parse(localStorage.shorts);
      setServerError(false);
      setSearchedMovie(search);
      setIsCheck(isCheck);
      setFirstLogin(false);
      setAllMovies(movies);
      filterMovies(search, isCheck, movies);
    }
  }, [filterMovies]);

  return (
    <>
      <main className="main">
        <Search
          isCheck={isCheck}
          searchMovies={searchMovies}
          setIsError={setIsError}
          searchedMovie={searchedMovie}
          movies={allMovies}
          filter={filterMovies}
          setIsCheck={setIsCheck}
        />
        <MoviesCardList
          isLoading={isLoading}
          movies={filteredMovies}
          createMovie={createMovie}
          savedMovies={savedMovies}
          serverError={serverError}
          firstLogin = {firstLogin}
        />
      </main>
    </>
  );
}

import { useCallback, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Search from "../Search/Search";

export default function SavedMovies({ savedMovies, onDelete, setIsError }) {
  // Состояние для отфильтрованных фильмов
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);

  // Состояние для поискового запроса
  const [searchedMovie, setSearchedMovie] = useState("");

  // Состояние для чекбокса "Короткометражки"
  const [isCheck, setIsCheck] = useState(false);

  // Функция для фильтрации фильмов
  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search);
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName = movie.nameRU
          .toLowerCase()
          .includes(search.toLowerCase());
        return isCheck ? searchName && movie.duration <= 40 : searchName;
      })
    );
  }, []);

  // Функция для поиска фильмов
  function searchMovies(search) {

    filter(search, isCheck, savedMovies);
  }

  // Эффект для обновления списка фильмов при изменении поискового запроса или чекбокса "Короткометражки"
  useEffect(() => {
    filter(searchedMovie, isCheck, savedMovies);
  }, [filter, savedMovies, isCheck, searchedMovie]);

  return (
    <>
      <Search
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        setIsError={setIsError}
        savedMovies={savedMovies}
        movies={savedMovies}
        filter={filter}
        setIsCheck={setIsCheck}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
     
      />
    </>
  );
}

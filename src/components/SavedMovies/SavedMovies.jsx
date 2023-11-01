import { useCallback, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Search from "../Search/Search";


export default function SavedMovies({ savedMovie, onDelete, setIsError }) {

// Состояние для отфильтрованных фильмов
const [filteredMovies, setFilteredMovies] = useState(savedMovie)

// Состояние для поискового запроса
const [searchedMovie, setSearchedMovie] = useState('')

// Состояние для чекбокса "Короткометражки"
const [isCheck, setIsCheck] = useState(false)

// Состояние для определения первого входа на страницу
const [firstEntrance, setFirstEntrance] = useState(true)

// Функция для фильтрации фильмов
const filter = useCallback((search, isCheck, movies) => {
  setSearchedMovie(search)
  setFilteredMovies(movies.filter((movie) => {
    const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
    return isCheck ? (searchName && movie.duration <= 40) : searchName
  }))
}, [])

// Функция для поиска фильмов
function searchMovies(search) {
  setFirstEntrance(false)
  filter(search, isCheck, savedMovie)
}

// Эффект для обновления списка фильмов при изменении поискового запроса или чекбокса "Короткометражки"
useEffect(() => {
  if (savedMovie.length === 0) {
    setFirstEntrance(true)
  } else {
    setFirstEntrance(false)
  }
  filter(searchedMovie, isCheck, savedMovie)
}, [filter, savedMovie, isCheck, searchedMovie])

  return (
    <>
      <Search
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        setIsError={setIsError}
        firstEntrance={firstEntrance}
        savedMovie={savedMovie}
        movies={savedMovie}
        filter={filter}
        setIsCheck={setIsCheck}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </>
  )
}
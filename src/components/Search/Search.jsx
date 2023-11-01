
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./Search.css";
import ErrorContext from "../../Context/ErrorContext";
import { useContext, useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";

export default function Search({ isCheck, searchedMovie, searchMovies, setIsError, savedMovie, movies, filter, setIsCheck }) {
 // Получаем объект location из react-router-dom
const { pathname } = useLocation();

// Получаем значение isError из контекста ErrorContext
const isError = useContext(ErrorContext);

// Получаем значения для управляемой формы из хука useFormValidation
const { values, handleChange, reset } = useFormValidation();

// Эффект для обновления значения поискового запроса и очистки формы при изменении списка сохраненных фильмов
useEffect(() => {
  if ((pathname === '/saved-movies' && savedMovie.length === 0)) {
    reset({ search: '' })
  } else {
    reset({ search: searchedMovie })
  }
  setIsError(false)
}, [searchedMovie, setIsError, pathname, savedMovie])

// Функция для отправки формы поиска фильмов
function onSubmit(evt) {
  evt.preventDefault()
  if (values.search) {
    searchMovies(values.search)
    setIsError(false)
  } else {
    setIsError(true)
  }
}

// Функция для изменения значения чекбокса "Короткометражки"
function changeShort() {
  if (isCheck) {
    setIsCheck(false)
    filter(values.search, false, movies)
  } else {
    setIsCheck(true)
    filter(values.search, true, movies)
  }
}
  return (
    <section className="search page__search" onSubmit={onSubmit}>
      <div className="search__container">
        <form className="search__form" name={"SearchForm"}>
          <div className="search__form-block">
          <input
            type="text"
            name="search"
            placeholder="Фильм"
            className="search__input"
            onChange={(evt) => {
              handleChange(evt)
              setIsError(false)
            }}
            disabled={savedMovie ? (savedMovie.length === 0 && true) : false}
            required
          />
          <button type="submit" className={`search__submit ${savedMovie ? (pathname === '/saved-movies' && savedMovie.length === 0) && 'search__submit_disabled' : ''}`}>
            Найти
          </button>
          </div>
          <FilterCheckbox isCheck={isCheck} changeShort={changeShort} />
        </form>
     
      </div>
      {isError && <p>Введите поисковой запрос</p>}
    </section>
  );
}
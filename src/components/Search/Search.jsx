
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./Search.css";
import ErrorContext from "../../Context/ErrorContext";
import { useContext, useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";

export default function Search({ isCheck, searchedMovie, searchMovies, setIsError, firstEntrance, savedMovie, movies, filter, setIsCheck }) {
  const { pathname } = useLocation();
  const isError = useContext(ErrorContext);
  const { values, handleChange, reset } = useFormValidation();

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovie.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedMovie })
    }
    setIsError(false)
  }, [searchedMovie, reset, setIsError, pathname, savedMovie])

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

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
          <FilterCheckbox isCheck={isCheck} changeShort={changeShort}/>
        </form>
     
      </div>
      {isError && <p>Введите поисковой запрос</p>}
    </section>
  );
}
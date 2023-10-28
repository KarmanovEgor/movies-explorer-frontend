
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./Search.css";

export default function Search({ isCheck, searchMovies, setIsError, isError  }) {
  function onSubmit(evt) {
    evt.preventDefault();
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value);
    } else {
      setIsError(true);
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
            required
          />
          <button type="submit" className="search__submit">
            Найти
          </button>
          </div>
          <FilterCheckbox />
        </form>
     
      </div>
      {isError && <p>Введите поисковой запрос</p>}
    </section>
  );
}
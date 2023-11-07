import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  movies,
  isLoading,
  onDelete,
  savedMovies,
  serverError,
  createMovie,
}) {
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const [totalCardsCount, setTotalCardsCount] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    setTotalCardsCount(movies.length);
    if (visibleCardsCount > totalCardsCount) {
      setVisibleCardsCount(totalCardsCount);
    }
  }, [movies, totalCardsCount, visibleCardsCount]);

  function handleMoreButtonClick() {
    // const remainingCards = totalCardsCount - visibleCardsCount;
    const nextVisibleCardsCount = visibleCardsCount + getVisibleCardsCount();
    setVisibleCardsCount(nextVisibleCardsCount);
  }

  useEffect(() => {
    if (movies.length > 0) {
      setVisibleCardsCount(getVisibleCardsCount());
    }
  }, [movies]);

  function getVisibleCardsCount() {
    if (window.innerWidth >= 1280) {
      return 16;
    } else if (window.innerWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  }

  return (
    <section className="movies page__movies">
      <div className="movies__container">
        <ul className="movies__lists">
          {isLoading ? (
            <Preloader />
          ) : pathname === "/movies" ? (
            movies
              .slice(0, visibleCardsCount)
              .map((movie) => (
                <MoviesCard
                  key={movie.id}
                  data={movie}
                  savedMovies={savedMovies}
                  createMovie={createMovie}
                />
              ))
          ) : movies.length !== 0 ? (
            movies.map((data) => (
              <MoviesCard key={data._id} onDelete={onDelete} data={data} />
            ))
          ) : serverError ? (
            <span className="movies__serch-error">
              «Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз»
            </span>
          ) : pathname === "/movies" ? (
            <span className="movies__serch-error">
              «Чтобы увидеть список фильмов выполните поиск»
            </span>
          ) : (
            <span className="movies__serch-error">
              «Нет сохранённых фильмов»
            </span>
          )}
        </ul>
        {visibleCardsCount < totalCardsCount && (
          <button
            type="button"
            className="movies__more"
            onClick={handleMoreButtonClick}
          >
            Еще
          </button>
        )}
      </div>
    </section>
  );
}

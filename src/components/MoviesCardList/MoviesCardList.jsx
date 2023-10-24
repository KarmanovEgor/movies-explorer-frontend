import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, isLoading }) {
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const [totalCardsCount, setTotalCardsCount] = useState(0);

  useEffect(() => {
    setTotalCardsCount(movies.length);
    if (visibleCardsCount > totalCardsCount) {
      setVisibleCardsCount(totalCardsCount);
    }
  }, [movies, totalCardsCount, visibleCardsCount]);

  function handleMoreButtonClick() {
    const remainingCards = totalCardsCount - visibleCardsCount;
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
          ) : movies.length > 0 ? (
            movies
              .slice(0, visibleCardsCount)
              .map((movie) => (
                <MoviesCard key={movie.id} data={movie} savedMovies={[]} />
              ))
          ) : (
            <p className="movies__text">Фильмы не найдены</p>
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

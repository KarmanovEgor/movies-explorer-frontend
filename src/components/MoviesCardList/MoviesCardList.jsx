import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import {
  SizeL,
  SizeM,
  SizeS,
  InitMoreSizeL,
  InitLessSizeL,
  InitSizeM,
  InitSizeS,
  StepSizeL,
  StepSizeM,
  StepSizeS,
} from "../utils/constants";

export default function MoviesCardList({
  movies,
  isLoading,
  onDelete,
  savedMovies,
  serverError,
  createMovie,
  firstLogin,
}) {
  const [countCard, setCountCard] = useState("");
  const { pathname } = useLocation();

  function createCards() {
    let init = InitMoreSizeL;
    let step = StepSizeL;

    if (window.innerWidth < SizeL) {
      init = InitLessSizeL;
      step = StepSizeM;
    }
    if (window.innerWidth < SizeM) {
      init = InitSizeM;
      step = StepSizeS;
    }
    if (window.innerWidth < SizeS) {
      init = InitSizeS;
      step = StepSizeS;
    }

    return { init, step };
  }

  useEffect(() => {
    if (pathname === "/movies") {
      setCountCard(createCards().init);

      function createCardsResize() {
        setCountCard(createCards().init);
      }

      window.addEventListener("resize", createCardsResize);
      return () => window.removeEventListener("resize", createCardsResize);
    }
  }, [pathname, movies]);

  function handleMoreButtonClick() {
    setCountCard(countCard + createCards().step);
  }


  return (
    <section className="movies page__movies">
      <div className="movies__container">
        <ul className="movies__lists">
          {isLoading ? (
            <Preloader />
          ) : serverError ? (
            <span className="movies__serch-error">
              «Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз»
            </span>
          ) : pathname === "/movies" ? (
            movies.length === 0 ? (
              firstLogin ? (
                <span className="movies__serch-error">«выполните поиск»</span>
              ) : (
                <span className="movies__serch-error">«Ничего не найдено»</span>
              )
            ) : (
              movies
                .slice(0, countCard)
                .map((movie) => (
                  <MoviesCard
                    key={movie.id}
                    data={movie}
                    savedMovies={savedMovies}
                    createMovie={createMovie}
                  />
                ))
            )
          ) : pathname === "/saved-movies" ? (
            movies.length === 0 ? (
              <span className="movies__serch-error">
                «Нет сохранённых фильмов»
              </span>
            ) : (
              movies.map((data) => (
                <MoviesCard key={data._id} onDelete={onDelete} data={data} />
              ))
            )
          ) : null}
        </ul>
        {pathname === "/movies" && (
          <button
            type="button"
            className={`movies__more ${
              countCard >= movies.length && "movies__more-hidden"
            }`}
            onClick={handleMoreButtonClick}
          >
            Ёще
          </button>
        )}
      </div>
    </section>
  );
}

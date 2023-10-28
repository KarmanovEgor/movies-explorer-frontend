import "./MoviesCard.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function MoviesCard({ onDelete, addMovie, data, savedMovies }) {
  const { pathname } = useLocation();
  const [click, setClick] = useState(false);

  console.log(data);

  function onClick() {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  }

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return hours === 0
      ? `${minutes}м`
      : minutes === 0
      ? `${hours}ч`
      : `${hours}ч${minutes}м`;
  }

  return (
    <li className="movie__card">
      <article className="movie__article">
        <Link to={data.trailerLink} target="_blank">
          <img
            src={`https://api.nomoreparties.co${data.image.url}`}
            alt={`изображение фильма ${data.image.name}`}
            className="movie__image"
          />
        </Link>
        <div className="movie__card">
          <div className="movie__text">
            <h2 className="movie__subtitle">{data.nameRU}</h2>
            {pathname === "/movies" ? (
              <button
                type="button"
                className={`movie__save ${click ? "movie__save_active" : ""}`}
                onClick={onClick}
              ></button>
            ) : (
              <button
                type="button"
                className={`gallery__save gallery__save_type_delete`}
              ></button>
            )}
          </div>
        </div>
        <span className="movie__duration">{convertTime(data.duration)}</span>
      </article>
    </li>
  );
}

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
    <li className="movies__card">
      <article className="movies__article">
        <Link to={data.trailerLink} target="_blank">
          <img
            src={`https://api.nomoreparties.co${data.image.url}`}
            alt={`изображение фильма ${data.image.name}`}
            className="movies__image"
          />
        </Link>
        <div className="movies__card-blockgi">
          <div className="movies__text">
            <h2 className="movies__subtitle">{data.nameRU}</h2>
            {pathname === "/movies" ? (
              <button
                type="button"
                className={`movies__save ${click ? "movies__save_active" : ""}`}
                onClick={onClick}
              ></button>
            ) : (
              <button
                type="button"
                className={`movies__save movies__save_type_delete`}
              ></button>
            )}
          </div>
        </div>
        <span className="movies__duration">{convertTime(data.duration)}</span>
      </article>
    </li>
  );
}

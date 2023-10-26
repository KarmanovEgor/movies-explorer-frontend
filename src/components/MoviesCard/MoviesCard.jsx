import "./MoviesCard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moviesApi from '../utils/MoviesApi'

export default function MoviesCard({ onDelete, addMovie, data, savedMovies }) {

  const [click, setClick] = useState(false);

console.log(data)


  function onClick() {
      if (click === false){
        setClick(true)
      } else {
        setClick(false)
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
            src={`https://api.nomoreparties.co${
              data.image.url}`
            }
            alt={data.name}
            className="movie__image"
          />
        </Link>
        <div className="movie__card">
          <div className="movie__text">
            <p className="movie__subtitle">{data.nameRU}</p>
            <span className="movie__duration">
              {convertTime(data.duration)}
            </span>
          </div>
            <button
              type="button"
              className={`movie__save ${click ? "movie__save_active" : ""}`}
              onClick={onClick}
            ></button>
          
        </div>
      </article>
    </li>
  );
}

import "./MoviesCard.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MoviesCard({
  onDelete,
  createMovie,
  data,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const [click, setClick] = useState(false);


  useEffect(() => {
    if (pathname === "/movies")
      setClick(savedMovies.some((element) => data.id === element.movieId));
  }, [savedMovies, data.id, setClick, pathname]);

  function onClick() {
    if (savedMovies.some((element) => data.id === element.movieId)) {
      setClick(true);
      createMovie(data);
    } else {
      setClick(false);
      createMovie(data);
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
            src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} 
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
                onClick={() => onDelete(data._id)}
              ></button>
            )}
          </div>
        </div>
        <span className="movies__duration">{convertTime(data.duration)}</span>
      </article>
    </li>
  );
}

import { useState } from "react";
import Search from "../Search/Search";
import "./Movies.css";
import moviesApi from "../utils/MoviesApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


export default function Movies() {
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);

  function searchMovies(query) {
    setIsLoading(true);
    moviesApi
      .getMovies(query)
      .then((res) => {
        setMovies(res);
        setIsCheck(false);
        setIsError(false);
      })
      .catch((err) => {
        console.error(`Ошибка при поиске фильмов ${err}`);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
    <Header />
    <>
      <Search isCheck={isCheck} searchMovies={searchMovies} setIsError={setIsError} />
      <MoviesCardList isLoading={isLoading} movies={movies} />
    </>
    <Footer />
    </>
  );
}

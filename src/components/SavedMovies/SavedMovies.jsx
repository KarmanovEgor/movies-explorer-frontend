import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Search from "../Search/Search";
import moviesApi from "../utils/MoviesApi";

export default function SavedMovies() {
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
      <main className="main">
        <Search
          isCheck={isCheck}
          searchMovies={searchMovies}
          setIsError={setIsError}
        />
        <MoviesCardList isLoading={isLoading} movies={movies} />
      </main>
      <Footer />
    </>
  );
}

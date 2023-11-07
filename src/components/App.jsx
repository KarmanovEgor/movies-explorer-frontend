import Header from "../components/Header/Header";
import Footer from "./Footer/Footer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./page__content.css";
import Main from "./Main/Main";
import { useCallback, useEffect, useState } from "react";
import ErrorContext from "../Context/ErrorContext";

import apiMain from "./utils/MainApi";
import CurrentUserContext from "../Context/CurrentUserContext ";
import Preloader from "./Preloader/Preloader";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProtectedMain from "./ProtectedPage/ProtectedPage";
import SendContext from "../Context/SendContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setsavedMovies] = useState([]);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([
        apiMain.getUser(localStorage.jwt),
        apiMain.getMovies(localStorage.jwt),
      ])
        .then(([userData, moviesData]) => {
          setsavedMovies(moviesData.reverse());
          setCurrentUser(userData);
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`);
          setIsCheckToken(false);
          localStorage.clear();
        });
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  // Создаю функцию setSuccess с использованием useCallback для оптимизации производительности
  const setSuccess = useCallback(() => {
    setIsSuccess(false);
  }, []);

  // Объявляю функцию handleDeleteMovie для удаления фильма по его id
  function handleDeleteMovie(deletemovieId) {
    // Выполняю запрос к API для удаления фильма с помощью переданного id и токена из localStorage
    apiMain
      .deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        // Обновляю состояние сохраненных фильмов, фильтруя элементы и удаляя фильм с переданным id
        setsavedMovies(
          savedMovies.filter((movie) => movie._id !== deletemovieId)
        );
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`));
  }

  async function handleLogin(email, password) {
    try {
      setIsSend(true); // Устанавливаю флаг отправки данных в true

      // Выполняю авторизацию пользователя через API
      const res = await apiMain.authorization(email, password);
      localStorage.setItem("jwt", res.token); // Сохраняю токен в локальном хранилище
      setLoggedIn(true); // Устанавливаю флаг авторизации в true
      navigate("/movies"); // Перенаправляю пользователя на страницу фильмов
    } catch (err) {
      setIsError(true);
      console.error(`Ошибка при авторизации ${err}`);
    } finally {
      setIsSend(false); // Устанавливаю флаг отправки данных в false
    }
  }

  async function handleRegister(username, email, password) {
    try {
      setIsSend(true);
      const res = await apiMain.registration(username, email, password);
      if (res) {
        setLoggedIn(false);
        const authRes = await apiMain.authorization(email, password);
        localStorage.setItem("jwt", authRes.token);
        setLoggedIn(true);
        navigate("/movies");
        window.scrollTo(0, 0);
      }
    } catch (err) {
      setIsError(true);
      console.error(`Ошибка при регистрации ${err}`);
    } finally {
      setIsSend(false);
    }
  }
  function logout() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }
  async function editUserData(username, email) {
    try {
      setIsSend(true);
      const res = await apiMain.editUser(username, email, localStorage.jwt);
      setCurrentUser(res);
      setIsSuccess(true);
      setIsEdit(false);
    } catch (err) {
      setIsError(true);
      console.error(`Ошибка при редактировании данных пользователя ${err}`);
    } finally {
      setIsSend(false);
    }
  }
  async function toggleMovie(data) {
    // Проверяю, есть ли в сохраненных фильмах элемент с таким же id, как у переданного фильма
    const checkAdd = savedMovies.some((element) => data.id === element.movieId);

    // Фильтруем сохраненные фильмы, чтобы найти фильм с тем же id, как у переданного фильма
    const searchClickMovie = savedMovies.filter(
      (movie) => movie.movieId === data.id
    )[0];

    try {
      // Если фильм уже добавлен в сохраненные, вызываю функцию handleDeleteMovie для удаления фильма
      if (checkAdd) {
        await handleDeleteMovie(searchClickMovie._id);
      } else {
        // Иначе, используем API для добавления фильма и обновляю список сохраненных фильмов
        const res = await apiMain.createMovie(data, localStorage.jwt);
        setsavedMovies([res, ...savedMovies]);
      }
    } catch (err) {
      // Если происходит ошибка, выводим сообщение об ошибке в консоль
      console.error(`Ошибка при установке лайка ${err}`);
    }
  }

  return (
    <div className="page__content">
      {isCheckToken ? (
        <Preloader />
      ) : (
        <ErrorContext.Provider value={isError}>
          <CurrentUserContext.Provider value={currentUser}>
            <SendContext.Provider value={isSend}>
              <Routes>
                <Route
                  path="/signin"
                  element={
                    loggedIn ? (
                      <Navigate to="/movies" replace />
                    ) : (
                      <Main
                        name="signin"
                        onLogin={handleLogin}
                        setIsError={setIsError}
                      />
                    )
                  }
                />

                <Route
                  path="/signup"
                  element={
                    loggedIn ? (
                      <Navigate to="/movies" replace />
                    ) : (
                      <Main
                        name="signup"
                        onRegistration={handleRegister}
                        setIsError={setIsError}
                      />
                    )
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={ProtectedMain}
                      name="profile"
                      loggedIn={loggedIn}
                      logout={logout}
                      setIsEdit={setIsEdit}
                      isEdit={isEdit}
                      editUserData={editUserData}
                      setIsError={setIsError}
                      isSuccess={isSuccess}
                      setSuccess={setSuccess}
                    />
                  }
                />

                <Route
                  path="/"
                  element={
                    <>
                      <Header name="home" loggedIn={loggedIn} />
                      <Main name="home" />
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedMain}
                      name="movies"
                      savedMovies={savedMovies}
                      createMovie={toggleMovie}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                  }
                />

                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedMain}
                      name="savedMovies"
                      onDelete={handleDeleteMovie}
                      savedMovies={savedMovies}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                  }
                />

                <Route
                  path="*"
                  element={
                    <>
                      <Main name="error" />
                    </>
                  }
                />
              </Routes>
            </SendContext.Provider>
          </CurrentUserContext.Provider>
        </ErrorContext.Provider>
      )}
    </div>
  );
}

export default App;

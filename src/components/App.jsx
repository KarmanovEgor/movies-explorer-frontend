import Header from "../components/Header/Header";
import Footer from "./Footer/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import "./page__content.css";
import Main from "./Main/Main";
import { useState } from "react";
import Movies from "./Movies/Movies";
import Profile from "./Profile/Profile";
import SavedMovies from "./SavedMovies/SavedMovies";
import ErrorContext from "../Context/ErrorContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="page__content">
      <ErrorContext.Provider value={isError}>
      <Routes>
        <Route
          path="/signin"
          element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Main name="signin" />
            )
          }
        />

        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Main name="signup" />
            )
          }
        />

        <Route
          path="/profile"
          element={<Profile name="profile" loggedIn={loggedIn} />}
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
            <Movies name="movies" loggedIn={loggedIn} setIsError={setIsError} />
          }
        />

        <Route
          path="/saved-movies"
          element={<SavedMovies loggedIn={loggedIn} setIsError={setIsError} />}
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
      </ErrorContext.Provider>
    </div>
  );
}

export default App;

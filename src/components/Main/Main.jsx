import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Error from "../Error/Error";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import "./Main.css";

export default function Main({
  name,
  setIsError,
  onRegistration,
  onLogin,
  logout,
  editUserData,
  savedMovies,
  onDelete,
  createMovie,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit,
  errorMessage
}) {

  return (
    <main className="main">
      {
        {
          home: (
            <>
              <Promo />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
            </>
          ),
          signin: (
            <Login name={name} setIsError={setIsError} onLogin={onLogin} />
          ),
          signup: (
            <Registration
              name={name}
              setIsError={setIsError}
              onRegistration={onRegistration}
            />
          ),
          error: <Error />,
          profile: (
            <Profile
              name={name}
              setIsError={setIsError}
              logout={logout}
              editUserData={editUserData}
              isSuccess={isSuccess}
              setSuccess={setSuccess}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              errorMessage={errorMessage}
            />
          ),
          movies: (
            <>
              <Movies
                setIsError={setIsError}
                savedMovies={savedMovies}
                createMovie={createMovie}
              />
            </>
          ),
          savedMovies: (
            <>
              <SavedMovies
                setIsError={setIsError}
                savedMovies={savedMovies}
                onDelete={onDelete}
              />
            </>
          ),
        }[name]
      }
    </main>
  );
}

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

export default function Main({ name, setIsError }) {
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
          signin: <Login name={name} setIsError={setIsError} />,
          signup: <Registration name={name} setIsError={setIsError} />,
          error: <Error />,
          profile: <Profile name={name} setIsError={setIsError} />,
          movies: (
            <>
              <Movies setIsError={setIsError} />
            </>
          ),
          savedmovies: (
            <>
              <SavedMovies setIsError={setIsError} />
            </>
          ),
        }[name]
      }
    </main>
  );
}

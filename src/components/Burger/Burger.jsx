import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Burger.css";

const Burger = ({ dataUser, onLogout }) => {
  const [activeBurger, setActiveBurger] = useState(false);
  const { pathname } = useLocation();

  function handleClickBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <nav className="header__navigation">
      <ul
        className={`header__links_navigation ${
          activeBurger ? "header__links_navigation-active" : ""
        }`}
      >
        <li className="header__links_movies">
          <ul className="header__links_movies-list">
            <li className="header__links  header__links-main">
              <Link to={"/"} className={`header__link ${pathname === '/' ? 'header__link_active' : ''}`}>
                Главная
              </Link>
            </li>
            <li className="header__links header__links-underline">
            <Link to={"/movies"} className={`header__link ${pathname === '/movies' ? 'header__link_active' : ''}`}>
  Фильмы
</Link>
            </li>
            <li className="header__links">
              <Link to={"/saved-movies"} className={`header__link ${pathname === '/saved-movies' ? 'header__link_active' : ''}`}>
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </li>
        <li className="header__links_profile">
          <ul className="header__links_profile-list">
            <li className="header__links ">
              <Link to={"/profile"} className={`header__link ${pathname === '/profile' ? 'header__link_active' : ''}`}>
                Аккаунт
              </Link>
            </li>
            <li className="header__links">
              <div className="header__logo-profile"></div>{" "}
            </li>
          </ul>
        </li>
      </ul>
      <button
        onClick={handleClickBurger}
        className={`burger header__button${
          activeBurger ? " burger_active" : ""
        }`}
      >
        <div
          className={`burger-line ${activeBurger ? " burger-first-line" : ""}`}
        ></div>
        <div
          className={`burger-line ${activeBurger ? " burger-second-line" : ""}`}
        ></div>
        <div
          className={`burger-line ${activeBurger ? " burger-third-line" : ""}`}
        ></div>
      </button>
    </nav>
  );
};

export default Burger;

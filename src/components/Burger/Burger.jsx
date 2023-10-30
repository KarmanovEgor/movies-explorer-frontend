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
        className={`header__lists ${
          activeBurger ? "header__lists_active " : ""
        }`}
      >
        <li className="header__items header__items_movies">
          <ul className="header__movies-list">
            <li className="header__links header__links-main">
              <Link
                to={"/"}
                className={`header__link ${
                  pathname === "/" ? "header__link_active" : ""
                }`}
              >
                Главная
              </Link>
            </li>
            <li className="header__links">
              <Link
                to={"/movies"}
                className={`header__link ${
                  pathname === "/movies" ? "header__link_active" : ""
                }`}
              >
                Фильмы
              </Link>
            </li>
            <li className="header__links">
              <Link
                to={"/saved-movies"}
                className={`header__link ${
                  pathname === "/saved-movies" ? "header__link_active" : ""
                }`}
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </li>
        <li className="header__items header__items_profile">
          <ul className="header__profile">
            <li className="header__links ">
              <Link
                to={"/profile"}
                className={`header__link header__link-prof ${
                  pathname === "/profile" ? "header__link_active" : ""
                }`}
              >
                Аккаунт <div className="header__icon-prof"></div>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <div
        className={`header__overlay ${
          activeBurger ? "header__overlay-active" : ""
        }`}
      ></div>
      <div
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
      </div>
    </nav>
  );
};

export default Burger;

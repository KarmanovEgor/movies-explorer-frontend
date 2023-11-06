import { useState } from "react";

import Burger from "../Burger/Burger";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

export default function Header({ name, dataUser, loggedIn }) {
  const [activeBurger, setActiveBurger] = useState(false);
  const { pathname } = useLocation();
  function handleClickBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <header
      className={`header page__header ${activeBurger ? "header_active" : ""} ${
        pathname === "/" ? "header_theme_blue" : "header_theme_black"
      }`}
    >
      <div className="header__container">
        <Link to={"/"} className="header__link-home"></Link>
        {name === "home" && !loggedIn ? (
          <nav>
            <ul className="header__links-navigation header__links-navigation_login">
              <li>
                <Link to={"/signup"} className="header__signup">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link to={"/signin"} className="header__signin">
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <>
            <Burger
              dataUser={dataUser}
              activeBurger={activeBurger}
              handleClickBurger={handleClickBurger}
            />
          </>
        )}
      </div>
    </header>
  );
}

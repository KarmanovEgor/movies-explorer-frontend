import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer page__footer">
      <div className="footer__container">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__lists">
          <div className="footer__date">@ {currentYear}</div>
          <ul className="footer__list">
            <li className="footer__list-links">
              <Link
                to={"https://practicum.yandex.ru/"}
                target="_blank"
                className="footer__link"
              >
                Яндекс.Практикум
              </Link>
            </li>
            <li className="footer__list-links">
              <Link
                to={"https://github.com/KarmanovEgor"}
                target="_blank"
                className="footer__link"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

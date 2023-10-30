import { Link } from "react-router-dom";
import "./Portfolio.css";


export default function Portfolio() {
  return (
    <section className="portfolio page__portfolio">
      <div className="portfolio__container">
        <div className="portfolio__title">Портфолио</div>
        <ul className="portfolio__list">
          <li className="portfolio__list-links">
            <Link
              to={"https://github.com/KarmanovEgor/how-to-learn/tree/main"}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__text">Статичный сайт</p>
              <div className="portfolio__arrow"></div>
            </Link>
            
          </li>
          <li className="portfolio__list-links">
            <Link
              to={"https://karmanovegor.github.io/russian-travel/"}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__text"> Адаптивный сайт</p>
              <div className="portfolio__arrow"></div>
            </Link>
          </li>
          <li className="portfolio__list-links">
            <Link
              to={"https://github.com/KarmanovEgor/react-mesto-api-full-gha"}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__text">Одностраничное приложение</p>
              <div className="portfolio__arrow"></div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

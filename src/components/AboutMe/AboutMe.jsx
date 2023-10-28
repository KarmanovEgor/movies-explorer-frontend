import Title from "../Title/Title";
import { Link } from "react-router-dom";
import "./AboutMe.css";
import photo from "../../images/portret.png";
export default function AboutMe() {
  return (
    <section className="aboutMe page__aboutMe">
      <div className="aboutMe__container">
        <Title title="Студент"></Title>
    <div className="aboutMe__columns">
        <div className="aboutMe__blocktext">
          <h3 className="aboutMe__subtitle">Виталий</h3>
          <h4 className="aboutMe__job">Фронтенд-разработчик, 30 лет</h4>
          <p className="aboutMe__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            to={"https://github.com/KarmanovEgor"}
            target="_blank"
            className="aboutMe__link"
          >
            Github
          </Link>
        </div>
        <img src={photo} alt="фото профиля" title="фото профиля" className="aboutMe__image" />
        </div>
      </div>
    </section>
  );
}

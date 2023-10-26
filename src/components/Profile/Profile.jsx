import { Link } from "react-router-dom";
import Form from "../FormLogin/FormLogin";
import "./Profile.css";
import Input from "../Input/Input";
import useFormValidation from "../utils/useFormValidation";
import Header from "../Header/Header";

export default function Profile({ name, setIsError }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

  return (
    <section className="profile">
      <Header />
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <Form
          name={name}
          isValid={isValid}
          setIsError={setIsError}
          values={values}
        >
          <Input
            selectname={name}
            name="username"
            type="text"
            title="Имя"
            minLength="3"
            value={values.username}
            isInputValid={isInputValid.username}
            error={errors.username}
            onChange={handleChange}
          />
          <Input
            selectname={name}
            name="email"
            type="email"
            title="E-mail"
            value={values.email}
            isInputValid={isInputValid.email}
            error={errors.email}
            onChange={handleChange}
          />
        </Form>
        <Link to="/" className="profile__link">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

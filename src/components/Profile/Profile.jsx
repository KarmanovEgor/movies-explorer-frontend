import { Link } from "react-router-dom";
import Form from "../FormLogin/FormLogin";
import "./Profile.css";
import Input from "../Input/Input";
import useFormValidation from "../utils/useFormValidation";
import { useContext, useEffect } from "react";

import CurrentUserContext from "../../Context/CurrentUserContext ";
import { emailValid } from "../utils/validConfig";

export default function Profile({ name, setIsError, logout, editUserData, isSuccess, setSuccess, setIsEdit, isEdit, errorMessage }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();
    useEffect(() => {
      reset({ username: currentUser.name, email: currentUser.email })
    }, [isEdit, reset, currentUser.name, currentUser.email])
  
    function onSubmit(evt) {
      evt.preventDefault()
      editUserData(values.username, values.email)
    }

  return (
    <section className="profile">

      <main className="main">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <Form
          name={name}
          isValid={isValid}
          setIsError={setIsError}
          values={values}  
          onSubmit={onSubmit}
          isSuccess={isSuccess}
          setSuccess={setSuccess}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          errorMessage={errorMessage}
        >
          <Input
            selectname={name}
            name="username"
            type="text"
            title="Имя"
            minLength="3"
            maxLength='20'
            value={values.username}
            isInputValid={isInputValid.username}
            error={errors.username}
            onChange={handleChange}
            isEdit={isEdit}
            placeholder='введите ваше имя'
          />
          <Input
            selectname={name}
            name="email"
            type="email"
            title="E-mail"
            value={values.email}
            isInputValid={isInputValid.email}
            error={errors.email}
            pattern={emailValid}
            onChange={handleChange}
            errorMessage={errorMessage}
            isEdit={isEdit}
            placeholder='введите ваш email'
          />
        </Form>
        <Link to="/" onClick={logout} className="profile__link" >
          Выйти из аккаунта
        </Link>
      </div>
      </main>
    </section>
  );
}

import { Link } from "react-router-dom";
import Form from "../FormLogin/FormLogin";
import "./Profile.css";
import Input from "../Input/Input";
import useFormValidation from "../utils/useFormValidation";
import Header from "../Header/Header";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../Context/CurrentUserContext ";

export default function Profile({ name, setIsError, placeholder, logOut, editUserData, isSuccess, setSuccess, setIsEdit, isEdit }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();
    useEffect(() => {
      reset({ username: currentUser.name, email: currentUser.email })
    }, [reset, currentUser, isEdit])
  
    function onSubmit(evt) {
      evt.preventDefault()
      editUserData(values.username, values.email)
    }
  return (
    <section className="profile">
      <Header />
      <main className="main">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${name}!`}</h1>
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
            onChange={handleChange}
            isEdit={isEdit}
            placeholder='введите ваш email'
          />
        </Form>
        <Link to="/" className="profile__link"  onClick={logOut}>
          Выйти из аккаунта
        </Link>
      </div>
      </main>
    </section>
  );
}

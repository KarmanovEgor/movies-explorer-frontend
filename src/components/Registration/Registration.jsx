import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from '../utils/useFormValidation'
import { emailValid } from "../utils/validConfig";


export default function Register({ name, onRegistration, setIsError }) {
  const { values, errors, isInputValid, isValid, handleChange} = useFormValidation()

  const onSubmit = (evt) => {
    evt.preventDefault();
    onRegistration(values.username, values.email, values.password);
  };
  const handleInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };
  return (
    <SectionLogin name={name} isValid={isValid} onSubmit={onSubmit} setIsError={setIsError}>
      <Input
        name='username'
        type='text'
        title='Имя'
        minLength='2'
        maxLength='30'
        value={values.username}
        isInputValid={isInputValid.username}
        error={errors.username}
        onChange={handleInputChange}
        placeholder='Введите ваше имя'
      />
      <Input
        name='email'
        type='email'
        title='E-mail'
        minLength='2'
        maxLength='30'
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        pattern={emailValid}
        onChange={handleInputChange}
        placeholder='Введите вашу электронную почту'
      />
      <Input
        name='password'
        type='password'
        title='Пароль'
        minLength='3'
        maxLength='10'
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={handleInputChange}
        placeholder='Введите ваш пароль'
      />
    </SectionLogin>
  )
}
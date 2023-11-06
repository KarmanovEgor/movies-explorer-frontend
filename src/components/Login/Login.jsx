import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from '../utils/useFormValidation'

export default function Login({ name, onLogin, setIsError }) {
  const { values, errors, isInputValid, isValid, handleChange, } = useFormValidation()

  const onSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values.email, values.password);
  };
  const handleInputChange = (evt) => {
    handleChange(evt);
    setIsError(false);
  };

  return (
    <SectionLogin name={name} isValid={isValid} onSubmit={onSubmit} setIsError={setIsError}>
      <Input
        name='email'
        type='email'
        title='E-mail'
        minLength='2'
        maxLength='30'
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
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
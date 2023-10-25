import './FormLogin.css'
import Preloader from '../Preloader/Preloader'


export default function Form({ name, children, isValid, onSubmit, setIsError, values, isSuccess, setSuccess, setIsEdit, isEdit, isError, isSend }) {



  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className={`login__error-request ${isError && 'login__error-request_active'}`}>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
          >{isSend ? <Preloader name='button' /> : 'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className={`login__error-request login__error-request_type_reg ${isError && 'login__error-request_active'}`}>{'При регистрации произошла ошибка.'}</span>
            <button
              type="submit"
              className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend || isError}
            >{isSend ? <Preloader name='button' /> : 'Зарегистрироваться'}</button>
          </>
          : !isEdit ?
            <>
              <span className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(true)
                  setSuccess(false)
                }}
              >{'Редактировать'}</button>
            </> :
            <>
              <span className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
              <button
                type="submit"
                className={`login__submit ${ !isValid || isError ? 'login__submit_disabled' : ''}`}
                disabled={!isValid || isSend || isError}
              >{isSend ? <Preloader name='button' /> : 'Сохранить'}</button>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(false)
                  setSuccess(false)
                  setIsError(false)
                }}
              >{'Отменить редактирование'}</button>
            </>
      }
    </form>
  )
}
import "./Input.css";

export default function Input({
  selectname,
  name,
  type,
  title,
  minLength,
  maxLength,
  value,
  isInputValid,
  error,
  onChange,
  placeholder,
}) {
  return (
    <>
      {selectname !== "profile" ? (
        <label className="login__label">
          <span className="login__subtitle">{title}</span>
          <input
            type={type}
            name={name}
            minLength={minLength ? minLength : ""}
            maxLength={maxLength ? maxLength : ""}
            className={`login__input ${
              isInputValid === undefined || isInputValid
                ? ""
                : "login__input_invaid"
            }`}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            required
          />
          <span className="login__error">{error}</span>
        </label>
      ) : (
        <>
          <label className="profile__label">
            <span className="profile__subtitle">{title}</span>
            <input
              type={type}
              name={name}
              minLength={minLength ? minLength : ""}
              maxLength={maxLength ? maxLength : ""}
              className={`profile__input ${
                isInputValid === undefined || isInputValid
                  ? ""
                  : "profile__input_invaid"
              }`}
              value={value || ""}
              placeholder={placeholder}
              required
            />
          </label>
          <span
            className={`profile__error ${
              name === "username" ? "profile__error_type_name" : ""
            }`}
          >
            {error}
          </span>
        </>
      )}
    </>
  );
}

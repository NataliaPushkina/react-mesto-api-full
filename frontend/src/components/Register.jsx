import { useState } from "react";
import { Link } from "react-router-dom";
import "../blocks/register/Register.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="popup__inputs">
          <input
            required
            type="email"
            name="email"
            id="email"
            className="register__input register__input_email"
            placeholder="Email"
            autoComplete="email"
            value={email || ""}
            onChange={handleChangeEmail}
          />
          <input
            required
            type="password"
            name="password"
            id="password"
            minLength="6"
            className="register__input register__input_password"
            placeholder="Пароль"
            autoComplete="current-password"
            value={password || ""}
            onChange={handleChangePassword}
          />
        </fieldset>
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="register__login-link">
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;

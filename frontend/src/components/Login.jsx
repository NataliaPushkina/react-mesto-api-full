import { useState } from "react";
import "../blocks/login/Login.css";

function Login({ onLogin }) {
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
    onLogin(email, password);
  };

  return (
    <div className="login">
      <h3 className="login__title">Вход</h3>
      <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__inputs">
          <input
            required
            type="email"
            name="email"
            id="email"
            className="login__input login__input_email"
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
            className="login__input login__input_password"
            placeholder="Пароль"
            autoComplete="current-password"
            value={password || ""}
            onChange={handleChangePassword}
          />
        </fieldset>
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;

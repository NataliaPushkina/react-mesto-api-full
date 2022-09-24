import logo from "../images/logo.svg";
import { Route, Link } from "react-router-dom";
import "../blocks/header/__burger/header__burger.css";

function Header({ loggedIn, onLogout, email, onBurgerClick, isBurgerOpened }) {
  function showEmail() {
    onBurgerClick();
  }

  return (
    <>
      {isBurgerOpened && loggedIn ? (
        <div className="header__burger-opened">
          <span className="header__email header__email_place_burger">
            {email}
          </span>
          <Link
            className="button button_to-sing-out"
            to="/sign-in"
            onClick={onLogout}
          >
            Выйти
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="header">
        <img src={logo} alt="Логотип" className="header__logo" />

        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{email}</p>
            <button className="button button_to-sing-out" onClick={onLogout}>
              Выйти
            </button>
          </div>
        </Route>

        <Route exact path="/sign-up">
          <Link className="button button_to-sing-in" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route exact path="/sign-in">
          <Link className="button button_to-sing-up" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        {loggedIn ? (
          <div className="header__burger" onClick={showEmail}>
            {isBurgerOpened ? (
              <div className="header__burger-close" onClick={showEmail}>
                <span className="header__burger-close-line header__burger-close-line_first"></span>
                <span className="header__burger-close-line header__burger-close-line_second"></span>
              </div>
            ) : (
              <>
                <span className="burger__line burger__line_first"></span>
                <span className="burger__line burger__line_second"></span>
                <span className="burger__line burger__line_third"></span>
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Header;

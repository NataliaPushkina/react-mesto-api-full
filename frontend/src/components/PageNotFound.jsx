import { Link } from "react-router-dom";
import "../blocks/pageNotFound/PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h3 className="page-not-found__title">
        <span>Ошибка 404</span> - Страница не найдена
      </h3>
      <Link className="button button_type_to-main" to="/">
        На главную
      </Link>
    </div>
  );
}

export default PageNotFound;

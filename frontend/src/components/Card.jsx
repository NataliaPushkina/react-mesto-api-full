import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = ` button ${
    isOwn ? "button_type_delete" : ""
  }`;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `button_type_like ${
    isLiked ? " button button_status_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function onConfirmClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        src={props.link}
        alt={props.name}
        className="element__photo"
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={onConfirmClick}
      ></button>
      <div className="element__caption">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;

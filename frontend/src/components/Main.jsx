import { useContext, useState } from "react";
import "../index.css";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [hover, setHover] = useState(false);

  const toggleEditIcon = () => {
    setHover(!hover);
  };

  return (
    <section className="content">
      <section className="profile">
        <div className="profile__container">
          <a href="#!" className="profile__avatar-link">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
              onClick={onEditAvatar}
              onMouseEnter={toggleEditIcon}
              onMouseLeave={toggleEditIcon}
            />
            <button
              type="button"
              className={`profile__edit-icon ${
                hover ? "" : "profile__edit-icon_hidden"
              }`}
            ></button>
          </a>

          <div className="profile__info">
            <div className="profile__edit-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="button button_type_edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                name={card.name}
                link={card.link}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default Main;

function ImagePopup({ card, onClose, onOverlay }) {
  const isEmpty = Object.keys(card).length === 0;

  return (
    <div
      onClick={onOverlay}
      className={`popup popup_action_open-pic ${
        !isEmpty ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_action_open-pic">
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
        ></button>

        <figure className="popup__image-container">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

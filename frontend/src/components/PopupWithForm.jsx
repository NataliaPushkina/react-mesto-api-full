import Popup from "./Popup";

function PopupWithForm({ isOpened, name, onClose, onOverlay, ...props }) {
  return (
    <Popup
      isOpened={isOpened}
      name={name}
      onClose={onClose}
      onOverlay={onOverlay}
    >
      <h3 className="popup__title">{props.title}</h3>
      <form
        className={`popup__form popup__form_${props.form}`}
        name={props.form}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button type="submit" className="popup__button">
          {props.text}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;

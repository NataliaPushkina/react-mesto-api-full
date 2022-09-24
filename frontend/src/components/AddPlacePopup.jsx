import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceLink, setNewPlaceLink] = useState("");

  function handleAddPlaceName(e) {
    setNewPlaceName(e.target.value);
  }

  function handleAddPlaceLink(e) {
    setNewPlaceLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace(newPlaceName, newPlaceLink);
  }

  useEffect(() => {
    setNewPlaceName("");
    setNewPlaceLink("");
  }, [props.isOpened]);

  return (
    <PopupWithForm
      name="action_add"
      form="add-element"
      text={props.isLoading ? "Создание..." : "Создать"}
      title="Новое место"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      isLoading={props.isLoading}
      onOverlay={props.onOverlay}
    >
      <fieldset className="popup__inputs">
        <input
          required
          type="text"
          name="title"
          id="title"
          minLength="2"
          maxLength="30"
          className="popup__input popup__input_el_title"
          placeholder="Название"
          value={newPlaceName}
          onChange={handleAddPlaceName}
        />
        <span className="popup__error name-error"></span>
        <input
          required
          type="url"
          name="link"
          id="link"
          className="popup__input popup__input_el_link"
          placeholder="Ссылка на картинку"
          value={newPlaceLink}
          onChange={handleAddPlaceLink}
        />
        <span className="popup__error link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

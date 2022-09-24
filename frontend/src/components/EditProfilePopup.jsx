import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpened]);

  return (
    <PopupWithForm
      name="action_edit"
      title="Редактировать профиль"
      form="edit-element"
      text={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      onOverlay={props.onOverlay}
    >
      <fieldset className="popup__inputs">
        <input
          required
          type="text"
          name="name"
          id="name"
          minLength=""
          maxLength="40"
          className="popup__input popup__input_el_name"
          placeholder="Имя"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__error name-error"></span>
        <input
          required
          type="text"
          name="job"
          id="job"
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_el_job"
          placeholder="О себе"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__error job-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

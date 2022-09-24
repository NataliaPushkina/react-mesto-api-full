import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarInput.current.value);
  }

  useEffect(() => {
    avatarInput.current.value = "";
  }, [props.isOpened]);

  return (
    <PopupWithForm
      name="action_update-avatar"
      form="update-avatar"
      text={props.isLoading ? "Сохранение..." : "Сохранить"}
      title="Обновить аватар"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      onOverlay={props.onOverlay}
    >
      <input
        required
        type="url"
        name="avatar"
        id="url"
        className="popup__input popup__input_el_avatar"
        placeholder="Введите url адрес картинки"
        ref={avatarInput}
        value={avatarInput.value}
      />
      <span className="popup__error url-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({
  name,
  form,
  text,
  title,
  isOpened,
  onClose,
  onSubmitConfirm,
  onOverlay,
}) {
  function handleSubmitConfirm(e) {
    e.preventDefault();
    onSubmitConfirm();
  }

  return (
    <PopupWithForm
      name={name}
      form={form}
      text={text}
      title={title}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmitConfirm}
      onOverlay={onOverlay}
    />
  );
}

export default ConfirmationPopup;

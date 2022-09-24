const Popup = ({ isOpened, name, onClose, onOverlay, children }) => {
  return (
    <div
      onClick={onOverlay}
      className={`popup popup_${name} ${isOpened ? "popup_opened" : ""}`}
    >
      <div className={`popup__container popup__container_${name}`}>
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

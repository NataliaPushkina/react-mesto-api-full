import okIcon from "../images/okIcon.svg";
import errorIcon from "../images/errorIcon.svg";
import Popup from "./Popup";

function InfoTooltip({ isOpened, name, onClose, onOverlay, ...props }) {
  return (
    <Popup
      isOpened={isOpened}
      name={name}
      onClose={onClose}
      onOverlay={onOverlay}
    >
      {props.registrationSuccess ? (
        <>
          <img src={okIcon} alt="Ok"></img>
          <h3 className="popup__title popup__title_place_infoTooltip">
            "Вы успешно зарегистрировались!"
          </h3>
        </>
      ) : (
        <>
          <img src={errorIcon} alt="Ошибочка"></img>
          <h3 className="popup__title popup__title_place_infoTooltip">
            "Что-то пошло не так! Попробуйте ещё раз."
          </h3>
        </>
      )}
    </Popup>
  );
}

export default InfoTooltip;

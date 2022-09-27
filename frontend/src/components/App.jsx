import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipPopupOpened, setIsInfoTooltipPopupOpened] =
    useState(false);
  const [isConfirmationPopupOpened, setIsConfirmationPopupOpened] =
    useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link ||
    isInfoTooltipPopupOpened ||
    isConfirmationPopupOpened;
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [confirmCard, setConfirmCard] = useState({});

  function onBurgerClick() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function onDeleteCardClick(card) {
    confirmationPopupOpen();
    setConfirmCard(card);
  }

  function handleCardDelete() {
    if (confirmCard) {
      api
        .deleteCard(confirmCard._id)
        .then((res) => {
          confirmationPopupOpen();
          setCards((state) =>
            state.filter((c) => (c._id !== confirmCard._id ? res : null))
          );
        })
        .catch((err) => console.log(err));
    } else {
      console.log("no card");
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function infoTooltipOpen() {
    setIsInfoTooltipPopupOpened(!isInfoTooltipPopupOpened);
  }

  function confirmationPopupOpen() {
    setIsConfirmationPopupOpened(!isConfirmationPopupOpened);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpened(false);
    setIsConfirmationPopupOpened(false);
  }

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlace(newPlaceName, newPlaceLink) {
    setIsLoading(true);
    api
      .addCard(newPlaceName, newPlaceLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // function tokenCheck() {
  //   const jwt = localStorage.getItem("jwt");
  //   if (!jwt) {
  //     return;
  //   } else {
  //     auth
  //       .checkToken(jwt)
  //       .then((res) => {
  //         // setUserEmail(res.data.email);
  //         console.log(jwt);
  //         setLoggedIn(true);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        setUserEmail(email);
        setLoggedIn(true);
        // localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        setRegistrationSuccess(false);
        infoTooltipOpen();
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setRegistrationSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setRegistrationSuccess(false);
      })
      .finally(() => {
        infoTooltipOpen();
      });
  }

  function handleLogout() {
    auth
    .logout()
    .then((res) => {
      setLoggedIn(false);
      // localStorage.removeItem("jwt");
      history.push("/sign-in");
      onBurgerClick();
    });
  }

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  useEffect(() => {
    if (loggedIn) {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn, history]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, history]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/");
  //   }
  // }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header
          loggedIn={loggedIn}
          onLogout={handleLogout}
          email={userEmail}
          onBurgerClick={onBurgerClick}
          isBurgerOpened={isBurgerOpened}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={(card) => onDeleteCardClick(card)}
          ></ProtectedRoute>
          <Route exact path="/sign-in">
            <Login onLogin={handleLogin}></Login>
          </Route>
          <Route exact path="/sign-up">
            <Register
              onRegister={handleRegister}
              onInfoTooltipOpen={infoTooltipOpen}
              registrationSuccess={registrationSuccess}
            ></Register>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onOverlay={handleOverlay}
        />

        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
          onOverlay={handleOverlay}
        />

        <ConfirmationPopup
          name="delete-pic"
          form="delete-pic"
          text="Да"
          title="Вы уверены?"
          isOpened={isConfirmationPopupOpened}
          onClose={closeAllPopups}
          onSubmitConfirm={handleCardDelete}
          onOverlay={handleOverlay}
        />

        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          onOverlay={handleOverlay}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlay={handleOverlay}
        />

        <InfoTooltip
          name="tooltip"
          isOpened={isInfoTooltipPopupOpened}
          onClose={closeAllPopups}
          registrationSuccess={registrationSuccess}
          onOverlay={handleOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

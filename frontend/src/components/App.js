import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';

function App() {
  const navigate = useNavigate();

  //Стейты

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  const [email, setEmail] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] =
    React.useState(false);

  // Функция закрытия попапов

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  }

  // Функции редактирования профиля

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(newData) {
    api
      .editProfileData(newData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Функции для работы с карточками

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(res) {
    api
      .postNewCard(res)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClickCard(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => {
      return item._id === currentUser._id;
    });
    api
      .toggleLike(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((cards) => {
          return cards.filter((c) => {
            return c._id !== card._id;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Функции регистрации и авторизации

  function handleRegistrationSubmit(password, email) {
    auth
      .register(password, email)
      .then(() => {
        navigate('/sign-in', { replace: true });
        setIsSuccessInfoTooltipStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessInfoTooltipStatus(false);
      })
      .finally(() => setIsInfoToolTipOpen(true));
  }

  function handleLoginSubmit(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        localStorage.setItem('token', res.token);
      }).then(() => authorize(email)
      )
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false);
        setIsInfoToolTipOpen(true);
        console.log(err);
      });
  }

  function authorize(email) {
    setLoggedIn(true);
    setEmail(email);
    }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    setCurrentUser({});
  }

  // Эффекты

  React.useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        auth
          .checkToken(token)
          .then((res) => {
            return res;
          })
          .then((userData) => authorize(userData.email))
          .catch((err) => console.log(err));
      }
    }
    checkToken();
  }, []);

  React.useEffect(() => {
    function setInitialData() {
      if (loggedIn) {
        api
          .getAllInfo()
          .then(([userInfo, initialCards]) => {
            setCurrentUser(userInfo);
            setCards(initialCards);
          })
          .catch((err) => console.log(err));
      }
    }
    setInitialData();
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-in"
            element={
              !loggedIn ? (
                <>
                  <Header
                    link="/sign-up"
                    text="Регистрация"
                    isLoggedIn={loggedIn}
                  />
                  <Login handleLoginSubmit={handleLoginSubmit} />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              !loggedIn ? (
                <>
                  <Header link="/sign-in" text="Вход" isLoggedIn={loggedIn} />
                  <Register
                    handleRegistrationSubmit={handleRegistrationSubmit}
                  />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Header}
                  link="/sign-in"
                  text="Выйти"
                  isLoggedIn={loggedIn}
                  email={email}
                  onSignOut={onSignOut}
                />
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleClickCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="confirmation"
          buttonText="Да"
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoToolTip
          success={isSuccessInfoTooltipStatus}
          onClose={closeAllPopups}
          isOpen={isInfoToolTipOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

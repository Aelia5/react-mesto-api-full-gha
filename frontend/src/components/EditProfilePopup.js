import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  function handleNameChange(e) {
    setName(e.target.value);
  }

  const [about, setAbout] = React.useState('');
  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__item popup__item_content_name"
        value={name || ''}
        onChange={handleNameChange}
        name="name"
        id="name"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__item-error popup__item-error_content_name"></span>
      <input
        type="text"
        className="popup__item popup__item_content_about"
        value={about || ''}
        onChange={handleAboutChange}
        name="about"
        id="about"
        placeholder="Род занятий"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__item-error popup__item-error_content_about"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

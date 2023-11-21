import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__item popup__item_content_avatar"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span className="popup__item-error popup__item-error_content_avatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

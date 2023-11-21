import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleNewPlace(e) {
    setPlace(e.target.value);
  }
  function handleNewUrl(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: place, link: url });
  }

  React.useEffect(() => {
    setPlace('');
    setUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__item popup__item_content_place"
        name="place"
        id="place"
        onChange={handleNewPlace}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={place || ''}
      />

      <span className="popup__item-error popup__item-error_content_place"></span>
      <input
        type="url"
        className="popup__item popup__item_content_url"
        name="url"
        id="url"
        onChange={handleNewUrl}
        placeholder="Ссылка на картинку"
        required
        value={url || ''}
      />
      <span className="popup__item-error popup__item-error_content_url"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

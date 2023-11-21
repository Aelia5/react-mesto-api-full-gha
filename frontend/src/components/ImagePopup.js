function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_content_image ${
        Object.keys(card).length !== 0 ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__image-container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__image-name">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;

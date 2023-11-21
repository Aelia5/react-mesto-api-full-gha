function PopupWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`popup popup_content_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form popup__form_content_user"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="popup__submit-button popup__submit-button_active"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

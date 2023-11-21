import successPath from '../images/success.svg';
import failurePath from '../images/failure.svg';

function InfoToolTip({ isOpen, onClose, success }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__result-image"
          src={success ? successPath : failurePath}
          alt="Успех"
        />
        <h2 className="popup__title popup__title_type_result">
          {success
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolTip;

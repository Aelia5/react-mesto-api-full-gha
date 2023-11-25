import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((item) => {
    return item === currentUser._id;
  });

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          className="element__delete-button"
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        />
      )}
      <img
        className="element__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={`element__like-button ${
              isLiked ? 'element__like-button_active' : ''
            }`}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;

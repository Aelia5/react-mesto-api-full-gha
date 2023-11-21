import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Аватара пользователя"
        />
        <div className="profile__cover" onClick={onEditAvatar} />
        <h1 className="profile__name">{currentUser.name}</h1>
        <button
          className="profile__edit-button"
          type="button"
          aria-label="Редактировать профиль"
          onClick={onEditProfile}
        />
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить данные"
          onClick={onAddPlace}
        />
        <p className="profile__about">{currentUser.about}</p>
      </section>
      <section className="elements" aria-label="Места">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

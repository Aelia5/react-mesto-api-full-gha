import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, link, text, email, onSignOut }) {
  const [menuOpened, setMenuOpened] = React.useState(false);

  function handleHeaderButtonClick() {
    setMenuOpened(!menuOpened);
  }

  return (
    <header className="header">
      <div className="logo header__logo" />
      {isLoggedIn && (
        <button
          type="button"
          className={`header__button ${
            menuOpened
              ? 'header__button_type_close'
              : 'header__button_type_menu'
          }`}
          onClick={handleHeaderButtonClick}
        />
      )}
      <div
        className={`header__menu ${menuOpened ? 'header__menu_opened' : ''}`}
      >
        {isLoggedIn && <p className="header__email">{email}</p>}
        <Link
          className={`header__link ${isLoggedIn ? 'header__link_exit' : ''}`}
          to={link}
          onClick={onSignOut}
          replace
        >
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;

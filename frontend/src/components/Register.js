import React from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegistrationSubmit }) {
  const [registerData, setRegisterData] = React.useState({
    password: '',
    email: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = registerData;
    handleRegistrationSubmit(password, email);
  }

  return (
    <section className="unauthorized">
      <h2 className="unauthorized__title">Регистрация</h2>
      <form name="register" onSubmit={handleSubmit}>
        <input
          type="email"
          className="unauthorized__input"
          name="email"
          id="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="unauthorized__input"
          name="password"
          id="password"
          placeholder="Пароль"
          minLength="7"
          value={registerData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="unauthorized__submit-button">
          Зарегистрироваться
        </button>
      </form>

      <Link className="unauthorized__link" to="/sign-in" replace>
        {' '}
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;

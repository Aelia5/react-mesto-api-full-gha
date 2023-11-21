import React from 'react';

function Login({ handleLoginSubmit }) {
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = loginData;

    handleLoginSubmit(password, email);
  }

  return (
    <section className="unauthorized">
      <h2 className="unauthorized__title">Вход</h2>
      <form name="login" onSubmit={handleSubmit}>
        <input
          type="email"
          className="unauthorized__input"
          name="email"
          id="email"
          value={loginData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="unauthorized__input"
          name="password"
          id="password"
          value={loginData.password}
          placeholder="Пароль"
          minLength="7"
          onChange={handleChange}
          required
        />
        <button type="submit" className="unauthorized__submit-button">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;

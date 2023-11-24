class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    }

  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
    }).then((res) => {
      return this._onResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
    }).then((res) => {
      return this._onResponse(res);
    });
  }

  getAllInfo() {
    return Promise.all([this.getProfileData(), this.getInitialCards()]);
  }

  editProfileData(newData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
      body: JSON.stringify({
        name: newData.name,
        about: newData.about,
      }),
    }).then((res) => {
      return this._onResponse(res);
    });
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._onResponse(res);
    });
  }

  postNewCard(newData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
      body: JSON.stringify({
        name: newData.name,
        link: newData.link,
      }),
    }).then((res) => {
      return this._onResponse(res);
    });
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
    }).then((res) => {
      return this._onResponse(res);
    });
  }
  toggleLike(card, isLiked) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',},
    }).then((res) => {
      return this._onResponse(res);
    });
  }
}

export const api = new Api('https://api.aelia.students.nomoredomainsmonster.ru');

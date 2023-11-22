class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
      headers: this._headers,
    }).then((res) => {
      return this._onResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
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
      headers: this._headers,
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
      headers: this._headers,
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
      headers: this._headers,
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
      headers: this._headers,
    }).then((res) => {
      return this._onResponse(res);
    });
  }
  toggleLike(card, isLiked) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._onResponse(res);
    });
  }
}

export const api = new Api({
  baseUrl: 'https://api.aelia.students.nomoredomainsmonster.ru',
  headers: {
    authorization: '0453871b-7ff0-422b-ba15-a21262966d2d',
    'Content-type': 'application/json',
  },
});

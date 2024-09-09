const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "787b7048-60bc-41ff-9da7-1579793c2672",
    "Content-Type": "application/json",
  },
};

//список карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

//информация о профиле
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

//сохранение профиля
export const saveUserInfo = (profileTitle, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: profileTitle,
      about: profileDescription,
    }),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

//добавить новую карточку
export const addNewCard = (placeNameInput, linkInput) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: placeNameInput,
      link: linkInput,
    }),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

//удаление карточки
export const deleteMyCard = (_id) => {
  // напишите код здесь
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

//лайк карточки
export const putDeleteLikeCard = (typeQuery, _id) => {
  // напишите код здесь
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: typeQuery,
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

//редактировать аватар
export const changeAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: link,
    }),
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};

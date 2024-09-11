const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "787b7048-60bc-41ff-9da7-1579793c2672",
    "Content-Type": "application/json",
  },
};

const handleResponse=(res)=>{
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);  
};

//список карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

//информация о профиле
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
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
  }).then(handleResponse);
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
  }).then(handleResponse);
};

//удаление карточки
export const deleteMyCard = (_id) => {
  // напишите код здесь
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

//лайк карточки
export const putDeleteLikeCard = (isActive, _id) => {
  
  let typeQuery="PUT";

  if (isActive) {
    typeQuery="DELETE";
  }

  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: typeQuery,
    headers: config.headers,
  }).then(handleResponse);
};

//редактировать аватар
export const changeAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: link,
    }),
    headers: config.headers,
  }).then(handleResponse);
};

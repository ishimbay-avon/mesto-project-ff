import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  openModal,
  closeModal,
  closeModalByOverlay,
} from "../components/modal.js";

import {
  getCards,
  getUserInfo,
  saveUserInfo,
  addNewCard,
  changeAvatar,
  deleteMyCard,
} from "../components/api.js";

import { enableValidation,clearValidation } from "../components/validation.js";

// @todo: DOM узлы
//список для карточек
const placesList = document.querySelector(".places__list");
//попап редактирования аватара
const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
//попап редактирования профиля
const popupTypeEdit = document.querySelector(".popup_type_edit");
//попап добавления новой карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
//кнопка открытия окна редактирования аватара
//const profileAvatarButton = document.querySelector(".profile__image");
//кнопка открытия окна редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
//кнопка открытия окна создания новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
//кнопки закрытия всех окон
const popupCloseButtons = document.querySelectorAll(".popup__close");
//ссылка на форму редактирования профиля
const editProfileForm = document.querySelector('[name="edit-profile"]');
//id профиля
let profileId = "";
//картинка профиля
const profileImage = document.querySelector(".profile__image");
//поле отображения имени
const profileTitle = document.querySelector(".profile__title");
//поле отображения описания
const profileDescription = document.querySelector(".profile__description");
//поле ввода имени в форме
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
//поле ввода описания в форме
const descriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
//форма создания новой карточки
const newAvatarForm = document.querySelector('[name="new-avatar"]');
//поле ссылки на аватар
const avatarLinkInput = newAvatarForm.querySelector(".popup__input_type_url");
//форма создания новой карточки
const newPlaceForm = document.querySelector('[name="new-place"]');
//поле имя карточки
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
//поле ссылка на фото
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const buttonPopup = newPlaceForm.querySelector(".popup__button");

//ссылка на попап изображения
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// @todo: Функция отображения карточки
const viewCard = function (cardImage) {
  //откроем попап
  openModal(popupTypeImage);
  //заполним данными поля
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt.slice(11);
};

// Создаём массив с промисами
const promises = [getUserInfo(), getCards()];

// Передаём массив с промисами методу Promise.all
Promise.all(promises)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data[0].avatar})`;
    profileTitle.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileId = data[0]._id;

    data[1].forEach(function (item) {    
      placesList.append(createCard(item,data[0]._id, deleteCard, likeCard, viewCard));
    });
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });

// @todo: клик открытия окна редактирования профиля
profileEditButton.addEventListener("click", function () {
  //добавим стиль - видимый попап
  openModal(popupTypeEdit);

  clearValidation(editProfileForm, {
    element: ".popup__input",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  });

  //перенесем  селекторы заголовка и описания профиля в форму
  document.forms["edit-profile"].elements.name.value = profileTitle.textContent;
  document.forms["edit-profile"].elements.description.value =
    profileDescription.textContent;
});

// @todo: клик открытия окна редактирования профиля
profileImage.addEventListener("click", function () {
  //добавим стиль - видимый попап
  openModal(popupTypeEditAvatar);

  newAvatarForm.reset();

  clearValidation(newAvatarForm, {
    element: ".popup__input",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  });
});

// @todo: клик открытия окна создания новой карточки
profileAddButton.addEventListener("click", function () {
  //добавим стиль - видимый попап
  openModal(popupTypeNewCard);
  //очистим форму
  newPlaceForm.reset();

  clearValidation(newPlaceForm, {
    element: ".popup__input",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  });

  //кнопка неактивна
  buttonPopup.disabled = false;
  buttonPopup.classList.remove("button_inactive");
});

// @todo: клик закрытия всех окон
popupCloseButtons.forEach(function (btn) {
  //для каждой кнопки
  btn.addEventListener("click", function (item) {
    const popup = item.target.closest(".popup");
    //добавим стиль - невидимый попап
    closeModal(popup);
  });
});

// @todo: обработка нажатия по overlay
document.addEventListener("click", closeModalByOverlay);

// @todo: редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.forms["edit-profile"].elements["submit-button"].textContent = "Сохранение...";
  //сохранение профиля
  saveUserInfo(nameInput.value, descriptionInput.value)
    .then((data) => {
      //сохраним введенные значения
      profileTitle.textContent = data.name; //nameInput.value;
      profileDescription.textContent = data.about; //descriptionInput.value;
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      document.forms["edit-profile"].elements["submit-button"].textContent = "Сохранить";
      //закроем форму
      const popup = evt.target.closest(".popup");
      closeModal(popup);
    });
}
// @todo: обработка события submit формы редактирования профиля
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// @todo: добавление карточки
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  document.forms["new-place"].elements["submit-button"].textContent = "Сохранение...";
  //создадим новый объект и добавим название и ссылку на фото
  addNewCard(placeNameInput.value, linkInput.value)
    .then((data) => {
      placesList.prepend(createCard(data,profileId, deleteCard, likeCard, viewCard));
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      document.forms["new-place"].elements["submit-button"].textContent = "Сохранить";
      //закроем форму
      const popup = evt.target.closest(".popup");
      closeModal(popup);
    });
}
// @todo: обработка события submit формы добавления карточки
newPlaceForm.addEventListener("submit", handlePlaceFormSubmit);

// @todo: Изменить аватар
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  document.forms["new-avatar"].elements["submit-button"].textContent = "Сохранение...";
  changeAvatar(avatarLinkInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      document.forms["new-avatar"].elements["submit-button"].textContent = "Сохранить";
      //закроем форму
      const popup = evt.target.closest(".popup");
      closeModal(popup);
    });
}
// @todo: обработка события submit формы изменения аватара
newAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

// ВАЛИДАЦИЯ
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive", 
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
});
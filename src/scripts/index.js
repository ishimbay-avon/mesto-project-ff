import { initialCards } from "./cards.js";
import "../pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard
} from "../components/card.js";
import {
  openModal,
  closeModal,
  closeModalByOverlay,
} from "../components/modal.js";


// @todo: DOM узлы
//список для карточек
const placesList = document.querySelector(".places__list");
//попап редактирования профиля
const popupTypeEdit = document.querySelector(".popup_type_edit");
//попап добавления новой карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
//кнопка открытия окна редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
//кнопка открытия окна создания новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
//кнопки закрытия всех окон
const popupCloseButtons = document.querySelectorAll(".popup__close");
//ссылка на форму редактирования профиля
const editProfileForm = document.querySelector('[name="edit-profile"]');
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
const newPlaceForm = document.querySelector('[name="new-place"]');
//поле имя карточки
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
//поле ссылка на фото
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
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


// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard, likeCard, viewCard));
});


// @todo: клик открытия окна редактирования профиля
profileEditButton.addEventListener("click", function () {
  //добавим стиль - видимый попап
  openModal(popupTypeEdit);
  //перенесем  селекторы заголовка и описания профиля в форму
  document.forms["edit-profile"].elements.name.value = profileTitle.textContent;
  document.forms["edit-profile"].elements.description.value =
    profileDescription.textContent;
});


// @todo: клик открытия окна создания новой карточки
profileAddButton.addEventListener("click", function () {
  //добавим стиль - видимый попап
  openModal(popupTypeNewCard);
  //очистим форму
  newPlaceForm.reset();
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
  //сохраним введенные значения
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  //закроем форму
  const popup = evt.target.closest(".popup");
  closeModal(popup);
}
// @todo: обработка события submit формы редактирования профиля
editProfileForm.addEventListener("submit", handleProfileFormSubmit);


// @todo: добавление карточки
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();


  //создадим новый объект и добавим название и ссылку на фото
  const newCard = { name: placeNameInput.value, link: linkInput.value };
  //добавим в список новую карточку
  placesList.prepend(createCard(newCard, deleteCard, likeCard, viewCard));
  //закроем форму
  const popup = evt.target.closest(".popup");
  closeModal(popup);
}
// @todo: обработка события submit формы добавления карточки
newPlaceForm.addEventListener("submit", handlePlaceFormSubmit);
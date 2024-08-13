import { openModal } from "./modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//ссылка на попап изображения
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// @todo: Функция создания карточки
export function createCard(item, deleteCard, likeCard, viewCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = "Фотография " + item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardDeleteButton);
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function () {
    likeCard(cardLikeButton);
  });

  const cardViewImage = cardElement.querySelector(".card__image");
  cardViewImage.addEventListener("click", function () {
    viewCard(cardViewImage);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export const deleteCard = function (cardDeleteButton) {
  const listItem = cardDeleteButton.closest(".places__item");
  listItem.remove();
};

// @todo: Функция лайка карточки
export const likeCard = function (cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
};

// @todo: Функция отображения карточки
export const viewCard = function (cardImage) {
  //откроем попап
  openModal(popupTypeImage);
  //заполним данными поля  
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt.slice(11);
};

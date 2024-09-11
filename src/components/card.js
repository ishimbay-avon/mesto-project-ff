import { putDeleteLikeCard, deleteMyCard } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(item, _id, deleteCard, likeCard, viewCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  //наполним элементы данными
  const cardViewImage = cardElement.querySelector(".card__image");
  cardViewImage.src = item.link;
  cardViewImage.alt = "Фотография " + item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  //количество лайков и id карточки
  cardElement.querySelector(".card__like-count").textContent =
    item.likes.length;
  cardElement.querySelector(".card__like-id").textContent = item._id;

  //отобразим состояние сердечка
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const isLiked = item.likes.some(function (item) {
    return item._id === _id;
  });
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  //настроим корзину
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  if (item.owner._id !== _id) {
    //прячем корзину
    cardDeleteButton.classList.add("is_visible");
  } else {
    //подключим событие для корзины
    cardDeleteButton.addEventListener("click", function () {
      //удаление карточки
      deleteCard(
        cardElement.querySelector(".card__like-id").textContent,
        cardDeleteButton
      );
    });
  }
  //настроим добавление и удаление лайка
  cardLikeButton.addEventListener("click", function () {
    //лайк карточки
    likeCard(cardElement,cardLikeButton);
  });

  cardViewImage.addEventListener("click", function () {
    viewCard(cardViewImage);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export const deleteCard = function (cardId, cardDeleteButton) {
  deleteMyCard(cardId)
    .then(() => {
      const listItem = cardDeleteButton.closest(".places__item"); 
      listItem.remove();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
};

// @todo: Функция лайка карточки
export const likeCard = function (cardElement,cardLikeButton) {

  putDeleteLikeCard(
    cardLikeButton.classList.contains("card__like-button_is-active"),
    cardElement.querySelector(".card__like-id").textContent
  )
    .then((data) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardElement.querySelector(".card__like-count").textContent =
        data.likes.length;
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
};

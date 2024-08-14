// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(item, deleteCard, likeCard, viewCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardViewImage = cardElement.querySelector(".card__image");
  cardViewImage.src = item.link;
  cardViewImage.alt = "Фотография " + item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardDeleteButton);
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function () {
    likeCard(cardLikeButton);
  });

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
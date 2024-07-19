// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
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

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = function (cardDeleteButton) {
  const listItem = cardDeleteButton.closest(".places__item");
  listItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard));
});

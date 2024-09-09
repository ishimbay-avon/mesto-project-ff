// @todo: Функция обработки нажатия клавиши
function keyHandler(evt) {
  if (evt.key === "Escape") {
    //найдем открытй попап
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      //popup.classList.remove("popup_is-opened");
      closeModal(popup);
    }
  }
}
// @todo: Функция открытия модального окна
export const openModal = function (popupType) {
  //добавим стиль видимый
  popupType.classList.add("popup_is-opened");
  //наделим документ событием нажатия клавиши
  document.addEventListener("keydown", keyHandler);
};
// @todo: Функция закрытия модального окна
export const closeModal = function (popupType) {
  //найдем родителя
  //const popup = popupType.target.closest(".popup");
  //удалим стиль видимый
  popupType.classList.remove("popup_is-opened");
  //удалим событие
  document.removeEventListener("keydown", keyHandler);
};
// @todo: обработка нажатия по overlay
export const closeModalByOverlay = function (e) {
  if (e.target.classList.contains("popup")) {
    closeModal(e.target);
    //e.target.classList.remove("popup_is-opened");
  }
};

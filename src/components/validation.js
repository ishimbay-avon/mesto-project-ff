// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, element, settings, errorMessage) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, element, settings) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
};

// Функция, которая проверяет валидность
const isValid = (formElement, formInput, settings) => {
  //проверка pattern
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) {
    showInputError(
      formElement,
      formInput,
      settings,
      formInput.validationMessage
    );
  } else {
    hideInputError(formElement, formInput, settings);
  }
};

//Проверка всех полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Состояние кнопки формы
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

//Поиск всех полей формы
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  ); 
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  ); 

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

//Поиск всех форм
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

//Очистка валидации
export const clearValidation=(formElement, settings)=> {
  const elements = formElement.querySelectorAll(settings.element);
  elements.forEach((element) => {
    element.classList.remove(settings.inputErrorClass);

    let formError = formElement.querySelector(`.${element.id}-error`);
    formError.classList.remove(settings.errorClass);
    formError.textContent = "";
  });
}
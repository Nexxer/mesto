//Настройки валидации
const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//Вывод ошибки валидации
const showInputError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};
//Скрытие ошибки валидации
const hideInputError = (popupElement, inputElement) => {
  const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

//Проверка
const checkInputValidity = (popupElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popupElement, inputElement);
  }
};

//Слушаем поля ввода
const setEventListeners = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll(params.inputSelector));
  const buttonElement = popupElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Валидация
const enableValidation = () => {
  const popupList = Array.from(document.querySelectorAll(params.formSelector));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(popupElement);
  });
}

//Проверка на валидность инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Переключаем кнопку по вроверке валидности инпутов
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "false");
  }
}

enableValidation(params);
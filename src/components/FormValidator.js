export default class FormValidator {
  constructor(validationparams, inputElement) {
    this._formSelector = validationparams.formSelector;
    this._inputSelector = validationparams.inputSelector;
    this._submitButtonSelector = validationparams.submitButtonSelector;
    this._inactiveButtonClass = validationparams.inactiveButtonClass;
    this._inputErrorClass = validationparams.inputErrorClass;
    this._errorClass = validationparams.errorClass;
    this._inputElement = inputElement;
  };

  //Вывод ошибки валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._inputElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //Скрытие ошибки валидации
  _hideInputError(inputElement) {
    const errorElement = this._inputElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //Проверка
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  //Слушаем поля ввода
  _setEventListeners() {
    const buttonElement = this._inputElement.querySelector(this._submitButtonSelector);
    const inputList = Array.from(this._inputElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputErrorClass) => {
      inputErrorClass.addEventListener('input', () => {
        this._hideInputError(inputErrorClass);
        this._checkInputValidity(inputErrorClass);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //Проверка на валидность инпутов
  _hasInvalidInput(inputList) {
    return inputList.some((inputErrorClass) => {
      return !inputErrorClass.validity.valid;
    });
  };

  //Переключаем кнопку по проверке валидности инпутов
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    };
  };

  //Функция отчистки форм от ошибок при открытии и отключение активности кнопке
  clearInputError() {
    const inputList = Array.from(this._inputElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      const buttonElement = this._inputElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
    });
  };

  //Валидация
  enableValidation() {
    this._inputElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}

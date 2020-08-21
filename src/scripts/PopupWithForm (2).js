import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {
    formSubmit
  }) { //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = document.querySelector('.popup__form');
  }

  //приватный метод, который собирает данные всех полей формы
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //метод добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });


  }

  //при закрытии попапа форма сбрасываtтся
  close() {
    // this._formSubmit.reset();
    super.close();
  }
}

//! Сделать САБМИТ
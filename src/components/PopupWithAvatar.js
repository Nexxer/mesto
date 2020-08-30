import Popup from './Popup.js';
export default class PopupWithAvatar extends Popup {
  constructor(popupSelector, { formSubmit }) { //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
  }
}

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) { //метод вставляeт в попап картинку и атрибут src изображения и подпись к картинке.
    super.open();
    this._popupSelector.querySelector('.popup__image').src = link;
    this._popupSelector.querySelector('.popup__image').alt = name;
    this._popupSelector.querySelector('.popup__caption').textContent = name;
  }
}
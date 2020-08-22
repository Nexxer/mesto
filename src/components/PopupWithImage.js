import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) { //метод вставляeт в попап картинку и атрибут src изображения и подпись к картинке.
    super.open();
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = link;
    popupImage.alt = name;
    this._popupSelector.querySelector('.popup__caption').textContent = name;
  }
}
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(link, name) { //метод вставляeт в попап картинку и атрибут src изображения и подпись к картинке.
    super.open();
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = link.src;
    popupImage.alt = link.alt;
    this._popupSelector.querySelector('.popup__caption').textContent = name.textContent;
  };
}
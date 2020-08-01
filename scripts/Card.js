import {
  openPopup, popupFigure
} from './utils.js';

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._clickLike();
    this._clickDelete();
    this._openPopup();
  }

  _clickLike() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => evt.target.classList.toggle('elememt__like_active'));
  }

  _clickDelete() {
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => evt.target.closest('.element').remove());
  }

  _openPopup() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      openPopup(popupFigure);
      popupFigure.querySelector('.popup__image').src = this._link;
      popupFigure.querySelector('.popup__caption').textContent = this._name;
      popupFigure.querySelector('.popup__image').alt = this._name;
    });
  }
}
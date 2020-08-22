export default class Card {
  constructor(name, link, cardSelector, {
    cardClick
  }) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardClick = cardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._clickLike();
    this._clickDelete();
    this._cardClickListener();
  }

  _clickLike() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => evt.target.classList.toggle('elememt__like_active'));
  }

  _clickDelete() {
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => evt.target.closest('.element').remove());
  }

  _cardClickListener() {
    this._element.querySelector('.element__image').addEventListener('click', () => this._cardClick(this._name, this._link));
  }
}
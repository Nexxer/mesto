export default class Card {
  constructor({ data, cardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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
    // Слушатель лайка
    this._element.querySelector('.element__like').addEventListener('click', (evt) => { evt.target.classList.toggle('elememt__like_active') });

    // Слушатель удаления карточки
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
      this._element = null;
    });

    // Слушатель клика карточки
    this._element.querySelector('.element__image').addEventListener('click', () => this._cardClick(this._name, this._link));
  }
}
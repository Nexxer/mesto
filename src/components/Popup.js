export default class Popup {
  constructor(popupSelector) { //конструктор единственный параметр — селектор попапа
    this._popupSelector = popupSelector;
  }

  //Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Содержит приватный метод, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Содержит публичный метод, который добавляет слушатель клика иконке закрытия попапа или оверлею
  setEventListeners() {
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () => {
      this.close();
    })
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}
import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popup, api) {
    super(popup);
    this._api = api;
  };

  setEventListeners(cardId) {
    super.setEventListeners();
    const deleteСonfirmation = this._popupSelector.querySelector('.popup__button-save');
    deleteСonfirmation.addEventListener('click', () => {
      this._deleteClickHandler(cardId);
    });
  };

  _deleteClickHandler(cardId) {
    this._api
      .deleteCard(cardId)
      .then((res) => {
        const card = document.getElementById(cardId);
        card.remove();
        this.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

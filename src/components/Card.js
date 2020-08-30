export default class Card {
  constructor(card, template, openPopupWithImage, myId, openPopupDeleteCard, api) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._likes = card.likes;
    this._owner = card.owner;
    this._myId = myId;
    this._template = template;
    this._openPopupWithImage = openPopupWithImage;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._api = api;
  };

  _getTemplate() {
    return this._template.cloneNode(true);
  };

  generateCard() {
    this._element = this._getTemplate();
    const placeImage = this._element.querySelector('.element__image');
    const placeName = this._element.querySelector('.element__title');
    this._placeLikes = this._element.querySelector('.element__likes');
    const place = this._element.querySelector('.element');
    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeName.textContent = this._name;
    place.id = this._id;
    this._placeLikes.textContent = this._likes.length;

    if (this._owner._id === this._myId) {
      const cardDeleteButton = document.createElement('button');
      cardDeleteButton.classList.add('element__delete');
      this._element.querySelector('.element').appendChild(cardDeleteButton);
      cardDeleteButton.addEventListener('click', () => {
        this._openPopupDeleteCard(this._id);
      });
    };

    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        const likeButton = this._element.querySelector('.element__like');
        likeButton.classList.add('elememt__like_active');
      }
    });

    this._placeListeners(placeImage, placeName);
    return this._element;
  };

  _like(e) {
    if (e.target.classList.contains('elememt__like_active')) {
      this._api
        .deleteLike(this._id)
        .then((res) => {
          e.target.classList.remove('elememt__like_active');

          if (res.likes.length >= 1) {
            this._placeLikes.textContent = res.likes.length;
          } else {
            this._placeLikes.textContent = '';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .setLike(this._id)
        .then((res) => {
          e.target.classList.add('elememt__like_active');
          this._placeLikes.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  _placeListeners(placeImage, placeName) {
    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      this._like(e);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupWithImage(placeImage, placeName);
    });
  };
}

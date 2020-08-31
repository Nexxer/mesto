import './index.css';
import Api from '../components/Api.js';
import { setLoading } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupButtonEditProfile,
  profileName,
  profileProfession,
  popupProfile,
  nameInputProfile,
  jobInputProfile,
  popupAddPlace,
  popupPlace,
  formPopupPlace,
  formPopupProfile,
  popupImage,
  validationParams,
  formPopupAvatar,
  submitButton,
  editAvatarButton,
  popupAvatarSelector,
  popupDeleteCard,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '834b1617-1b88-4942-8049-fea5a8e726ef',
    'Content-Type': 'application/json'
  }
});

//!Валидация
const formValidatorProfile = new FormValidator(validationParams, formPopupProfile);
const formValidatorElement = new FormValidator(validationParams, formPopupPlace);
const formValidatorAvatar = new FormValidator(validationParams, formPopupAvatar);

//Скрываем ошибки валидации и дизейблим кнопку при открытии попапов
const removeFormErrors = (formElement) => {
  formValidatorElement.clearInputError(validationParams, formElement);
  formValidatorProfile.clearInputError(validationParams, formElement);
  formValidatorAvatar.clearInputError(validationParams, formElement);
};

formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();
formValidatorAvatar.enableValidation();

//!Аватарка
const handleAvatar = function (itemAvatar) {
  setLoading(true);
  api
    .setNewAvatar(itemAvatar.avatar)
    .then((res) => {
      user.setUserAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
};

const avatarPopup = new PopupWithForm(popupAvatarSelector, handleAvatar);
avatarPopup.setEventListeners();
editAvatarButton.addEventListener('click', () => {
  removeFormErrors(popupAvatarSelector);
  avatarPopup.open();
});

//!Инфо юзера
const user = new UserInfo(profileName, profileProfession);

const handleUserInfo = function (itemUser) {
  setLoading(true);
  api
    .setUserInfo(itemUser.name, itemUser.about)
    .then((item) => {
      user.setUserInfo(item);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

const popupEditProfile = new PopupWithForm(popupProfile, handleUserInfo);

//установка в попап профиля текущих значений
function setInputValue(info) {
  nameInputProfile.value = info.name;
  jobInputProfile.value = info.job;
};

popupButtonEditProfile.addEventListener('click', () => {
  setInputValue(user.getUserInfo());
  removeFormErrors(popupProfile);
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();

//!Все что связано с картами
//открываем попап карточки
const popupPicImage = new PopupWithImage(popupImage);
popupPicImage.setEventListeners();

//вывод карточек
const renderCards = function (cards) {
  const initialCardsArr = new Section({
    items: cards,
    renderer: (item) => {
      initialCardsArr.addItem(renderCard(item));

    },
  }
  );
  return initialCardsArr;
};

//открываем форму добавления карточки
const placeTemplate = document.querySelector('#element').content;
const handleCardClick = function (link, name) {
  popupPicImage.open(link, name);
  popupPicImage.setEventListeners();
};

const popupWithDeleteCard = new PopupWithDelete(popupDeleteCard, api);

const handleDeleteClick = function (cardId) {
  popupWithDeleteCard.open();
  popupWithDeleteCard.setEventListeners(cardId);
};

const renderCard = function (card) {
  const newCard = new Card(
    card,
    placeTemplate,
    handleCardClick,
    api.userInfo._id,
    handleDeleteClick,
    api
  );
  return newCard.generateCard();
};

const addNewCard = function (card) {
  setLoading(true);
  api
    .postNewCard(card.photoname, card.photolink)
    .then((card) => {
      renderCards().addNewItem(renderCard(card));
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

const popupFormCard = new PopupWithForm(popupPlace, (card) => {
  addNewCard(card);
});
popupFormCard.setEventListeners();

//открытие попапа для новой карточки
popupAddPlace.addEventListener('click', () => {
  removeFormErrors(popupPlace);
  popupFormCard.open();
});

//Загружаем данные с сервера и рендерим
api
  .getUserInfo()
  .then((data) => {
    api.userInfo = data;
    user.setUserInfo({ name: data.name, about: data.about });
    user.setUserAvatar(data.avatar);
    api
      .getInitialCards()
      .then((cards) => {
        renderCards(cards).rendererCard();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
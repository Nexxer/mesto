import './../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  initialCards,
  popupButtonEditProfile,
  profileName,
  profileProfession,
  popupProfile,
  nameInputProfile,
  jobInputProfile,
  popupAddPlace,
  popupPlace,
  formPopupPlace,
  formElement,
  popupImage,
  validationParams
} from './Const.js';

//функция создания карточки
function createCard(item) {
  return new Card(
    item.name,
    item.link,
    '#element', {
    cardClick: (name, link) => {
      popupPicImage.open(name, link)
    }
  })
}

//вывод карточек
const initialCardsArr = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item).generateCard();
    initialCardsArr.addItem(card);
  },
},
  '.elements__list'
);

//выводим изначальный массив
initialCardsArr.rendererCard();

//открываем попап карточки
const popupPicImage = new PopupWithImage(popupImage);
popupPicImage.setEventListeners();

//открываем форму добавления карточки
const popupFormCard = new PopupWithForm(popupPlace, {
  formSubmit: (item) => {
    const cardElement = createCard({ name: item.photoname, link: item.photolink }).generateCard();
    initialCardsArr.addItem(cardElement);
  }
});
popupFormCard.setEventListeners();

//открытие попапа для новой карточки
popupAddPlace.addEventListener('click', () => {
  popupFormCard.open();
})

//открываем форму изменения профиля
const userInfo = new UserInfo(profileName, profileProfession);

const popupEditProfile = new PopupWithForm(popupProfile, {
  formSubmit: (info) => {
    userInfo.setUserInfo(info);
  }
})
popupButtonEditProfile.addEventListener('click', () => {
  setInputValue(userInfo.getUserInfo());
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();

//установка в попап профиля текущих значений
function setInputValue(info) {
  nameInputProfile.value = info.name;
  jobInputProfile.value = info.job;
}

//валидация
const formValidatorProfile = new FormValidator(validationParams, formElement);
const formValidatorElement = new FormValidator(validationParams, formPopupPlace);
formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();
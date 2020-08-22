import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
} from '../components/constants.js';

//функция создания карточки
function createCard(item) {
  return new Card(
    item.name,
    item.link,
    '#element', {
    cardClick: (name, link) => {
      popupPicImage.open(name, link);
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
  removeFormErrors(popupPlace);
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
  removeFormErrors(popupProfile);
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

//Скрываем ошибки валидации и дизейблим кнопку при открытии попапов
const removeFormErrors = (formElement) => {
  formValidatorElement.clearInputError(validationParams, formElement);
  formValidatorProfile.clearInputError(validationParams, formElement);
}

formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();

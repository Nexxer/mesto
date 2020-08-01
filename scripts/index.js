import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';
import {
  openPopup,
  closePopup
} from './utils.js';

// Массив мест
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Профиль
const popupEditProfile = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupProfile = document.querySelector('.popup_type_profile');
const formPopupProfile = popupProfile.querySelector('#form-profile');
const nameInputProfile = formPopupProfile.querySelector('#profile-name');
const jobInputProfile = formPopupProfile.querySelector('#profile-profession');

// Добавление места
const popupAddPlace = document.querySelector('.profile__button-add');
const placeList = document.querySelector('.elements__list');
const placeTemplate = placeList.querySelector('#element');
const popupPlace = document.querySelector('.popup_type_add-place');
const formPopupPlace = popupPlace.querySelector('#form-place');
const placeInput = formPopupPlace.querySelector('#place-name');
const linkInput = formPopupPlace.querySelector('#place-link');
const formElement = document.querySelector('.popup__form');

// Просмотр фото
const popupImage = document.querySelector('.popup_type_photo');
const placeImage = popupImage.querySelector('.popup__image');
const placeTitle = popupImage.querySelector('.popup__caption');

// Закрытия попапов
const closeButtonPopupProfile = popupProfile.querySelector('.popup__button-close');
const closeButtonPopupImage = popupImage.querySelector('.popup__button-close');
const closeButtonPopupPlace = popupPlace.querySelector('.popup__button-close');

// Вызов функции закрытия попапа при клике на оверлей
const closePopupClickOverlay = (event) => {
  const currentPopup = document.querySelector('.popup_opened');
  if (event.target === event.currentTarget) {
    closePopup(currentPopup);
  }
};

// Заполнение форм профиля
const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
  closePopup(popupProfile);
};

// Заполняем ввод в попапе профиля текущими значениями профиля
const openPopupProfile = () => {
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
  openPopup(popupProfile);
};

// функция добавления нового места
const formSubmitHandlerPlace = (evt) => {
  evt.preventDefault();
  createNewPlace(placeInput.value, linkInput.value);
  closePopup(popupPlace);
};

// Слушаем события
popupEditProfile.addEventListener('click', openPopupProfile);
popupProfile.addEventListener('click', closePopupClickOverlay);
closeButtonPopupProfile.addEventListener('click', () => closePopup(popupProfile));
formPopupProfile.addEventListener('submit', formSubmitHandlerProfile);
popupImage.addEventListener('click', closePopupClickOverlay);
closeButtonPopupImage.addEventListener('click', () => closePopup(popupImage));
popupPlace.addEventListener('click', closePopupClickOverlay);
closeButtonPopupPlace.addEventListener('click', () => closePopup(popupPlace));
formPopupPlace.addEventListener('submit', formSubmitHandlerPlace);
popupAddPlace.addEventListener('click', () => {
  formPopupPlace.reset();
  //Отключаем кнопку
  disabledSave(formPopupPlace.querySelector('.popup__button-save'));
  openPopup(popupPlace);
});

// Функция генерирования и вставки места
const createNewPlace = (name, link) => {
  const card = new Card(name, link, '#element');
  const cardElement = card.generateCard();
  placeList.prepend(cardElement);
};

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#element');
  const cardElement = card.generateCard();
  placeList.append(cardElement);
});

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const formValidatorProfile = new FormValidator(validationParams, formElement);
const formValidatorElement = new FormValidator(validationParams, formPopupPlace);
formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();

// Отключение кнопки "Сохранить"
const disabledSave = (buttonElement) => {
  buttonElement.classList.add('popup__button-save_disabled');
  buttonElement.setAttribute("disabled", "true");
};
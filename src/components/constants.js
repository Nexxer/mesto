// Массив мест
export const initialCards = [{
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
export const popupButtonEditProfile = document.querySelector('.profile__button-edit');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const popupProfile = document.querySelector('.popup_type_profile');
const formPopupProfile = popupProfile.querySelector('#form-profile');
export const nameInputProfile = formPopupProfile.querySelector('#profile-name');
export const jobInputProfile = formPopupProfile.querySelector('#profile-profession');

// Добавление места
export const popupAddPlace = document.querySelector('.profile__button-add');
export const popupPlace = document.querySelector('.popup_type_add-place');
export const formPopupPlace = popupPlace.querySelector('#form-place');
export const formElement = document.querySelector('.popup__form');

// Просмотр фото
export const popupImage = document.querySelector('.popup_type_photo');

//Параметры валидации
export const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

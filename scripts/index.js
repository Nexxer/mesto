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

// Просмотр фото
const popupImage = document.querySelector('.popup_type_photo');
const placeImage = popupImage.querySelector('.popup__image');
const placeTitle = popupImage.querySelector('.popup__caption');

// Закрытия попапов
const closeButtonPopupProfile = popupProfile.querySelector('.popup__button-close');
const closeButtonPopupImage = popupImage.querySelector('.popup__button-close');
const closeButtonPopupPlace = popupPlace.querySelector('.popup__button-close');

// Открытие попапов
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', keyEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', keyEsc);
};

// Вызов функции закрытия попапа при клике на оверлей
const closePopupClickOverlay = (event) => {
  const currentPopup = document.querySelector('.popup_opened');
  if (event.target === event.currentTarget) {
    closePopup(currentPopup);
  }
};

//Закрытие через Esc
const keyEsc = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popup);
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
  addPlace(placeInput.value, linkInput.value);
  closePopup(popupPlace);
};

// Отключение кнопки "Сохранить"
const disabledSave = (buttonElement) => {
  buttonElement.classList.add('popup__button-save_disabled');
  buttonElement.setAttribute("disabled", "true");
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

// Функция генерирования места
const createNewPlace = (name, link) => {
  const newPlace = placeTemplate.content.cloneNode(true);
  const newPlaceTitle = newPlace.querySelector('.element__title');
  const newPlaceImage = newPlace.querySelector('.element__image');
  const newPlaceDelete = newPlace.querySelector('.element__delete');
  const newPlaceLike = newPlace.querySelector('.element__like');
  newPlaceTitle.textContent = name;
  newPlaceImage.src = link;
  newPlaceImage.alt = name;
  newPlaceDelete.addEventListener('click', (evt) => evt.target.closest('.element').remove());
  newPlaceLike.addEventListener('click', (evt) => evt.target.classList.toggle('elememt__like_active'));
  newPlaceImage.addEventListener('click', function (evt) {
    placeImage.src = evt.target.src;
    placeTitle.textContent = name;
    placeImage.alt = name;
    openPopup(popupImage);
  });
  return newPlace;
};

// функция вставки места в DOM
const addPlace = (name, link) => {
  const placeNode = createNewPlace(name, link);
  placeList.prepend(placeNode);
};

// генерация изначальных мест
initialCards.reverse().forEach(place => addPlace(place.name, place.link));
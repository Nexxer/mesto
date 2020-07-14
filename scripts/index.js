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

// Открытие попапов
const popupToggle = function (popupElement) {
  popupElement.classList.toggle('popup_opened');
  addEsc()
};

// Закрытия попапов
const closeButtonPopupProfile = popupProfile.querySelector('.popup__button-close');
const closeButtonPopupImage = popupImage.querySelector('.popup__button-close');
const closeButtonPopupPlace = popupPlace.querySelector('.popup__button-close');

const closePopupProfile = function (evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  popupToggle(popupProfile);
  removeEscape()
}
const closePopupImage = function (evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  popupToggle(popupImage);
  removeEscape()
}
const closePopupPlace = function (evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  popupToggle(popupPlace);
  removeEscape()
};

//Закрытие через Esc
const keyEsc = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    popupToggle(popup)
    removeEscape()
  }
};

// Заполнение форм профиля
const formSubmitHandlerProfile = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
  popupToggle(popupProfile);
};

// Заполняем ввод в попапе профиля текущими значениями профиля
const openPopup = function () {
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
  popupToggle(popupProfile);
};

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

// Функция генерирования места
function createPlace(name, link) {
  const place = placeTemplate.content.cloneNode(true);
  place.querySelector('.element__title').textContent = name;
  place.querySelector('.element__image').src = link;
  place.querySelector('.element__image').alt = name;
  place.querySelector('.element__delete').addEventListener('click', (evt) => evt.target.closest('.element').remove());
  place.querySelector('.element__like').addEventListener('click', (evt) => evt.target.classList.toggle('elememt__like_active'));
  place.querySelector('.element__image').addEventListener('click', function (evt) {
    placeImage.src = evt.target.src;
    placeTitle.textContent = name;
    placeImage.alt = name;
    popupToggle(popupImage);
  });
  return place;
};

// функция вставки места в DOM
function addPlace(name, link) {
  const placeNode = createPlace(name, link);
  placeList.prepend(placeNode);
};

// функция добавления нового места
function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  addPlace(placeInput.value, linkInput.value);
  popupToggle(popupPlace);
};

// генерация изначальных мест
initialCards.reverse().forEach(place => addPlace(place.name, place.link));

// Слушаем события
closeButtonPopupProfile.addEventListener('click', () => popupToggle(popupProfile));
popupEditProfile.addEventListener('click', openPopup);
formPopupProfile.addEventListener('submit', formSubmitHandlerProfile);
popupImage.addEventListener('click', closePopupImage);
popupProfile.addEventListener('click', closePopupProfile);
popupPlace.addEventListener('click', closePopupPlace);
formPopupPlace.addEventListener('submit', formSubmitHandlerPlace);
closeButtonPopupImage.addEventListener('click', () => popupToggle(popupImage));
closeButtonPopupPlace.addEventListener('click', () => popupToggle(popupPlace));

// Очищаем поля ввода места
popupAddPlace.addEventListener('click', () => {
  formPopupPlace.reset();
  //Отключаем кнопку
  formPopupPlace.querySelector('.popup__button-save').classList.add('popup__button-save_disabled');
  formPopupPlace.querySelector('.popup__button-save').setAttribute("disabled", "true");

  popupToggle(popupPlace);
});


//Добавление и удаление слушателя Esc для закрытия попапа
function addEsc() {
  window.addEventListener('keydown', keyEsc);
};

function removeEsc() {
  window.removeEventListener('keydown', keyEsc);
};
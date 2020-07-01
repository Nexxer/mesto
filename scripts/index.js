// Профиль
const popupEditProfile = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupProfile = document.querySelector('.popup_type_profile');
const formPopupProfile = popupProfile.querySelector('#form-profile');
const nameInputProfile = formPopupProfile.querySelector('.popup__name');
const jobInputProfile = formPopupProfile.querySelector('.popup__compl');

// Добавление места
const popupAddPlace = document.querySelector('.profile__button-add');
const placeList = document.querySelector('.elements__list');
const placeTemplate = placeList.querySelector('#element');
const popupPlace = document.querySelector('.popup_type_add-place');
const formpopupPlace = popupPlace.querySelector('#form-place');
const placeInput = formpopupPlace.querySelector('#place-name');
const linkInput = formpopupPlace.querySelector('#place-link');


// Просмотр фото
const popupImage = document.querySelector('.popup_type_photo');
const placeImage = popupImage.querySelector('.popup__image');
const placeTitle = popupImage.querySelector('.popup__caption');

// Открытие попапов
const PopupToggle = function (evt) {
  evt.classList.toggle('popup_opened');
};

// Закрытия попапов
const closeButtonPopupProfile = popupProfile.querySelector('.popup__button-close');
const closeButtonpopupImage = popupImage.querySelector('.popup__button-close');
const closeButtonpopupPlace = popupPlace.querySelector('.popup__button-close');

const closePopupProfile = function (evt) {
  if (evt.target != evt.currentTarget) {
    return
  }
  PopupToggle(popupProfile);
}
const closepopupImage = function (evt) {
  if (evt.target != evt.currentTarget) {
    return
  }
  PopupToggle(popupImage);
}
const closepopupPlace = function (evt) {
  if (evt.target != evt.currentTarget) {
    return
  }
  PopupToggle(popupPlace);
};

// Заполнение форм профиля
const formSubmitHandlerProfile = function (evt) {
  event.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileProfession.textContent = jobInputProfile.value;
  PopupToggle(popupProfile);
};

// Заполняем ввод в попапе профиля текущими значениями профиля
const openPopup = function () {
  PopupToggle(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
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

// Функция добавления места
function addPlace(name, link) {
  const place = placeTemplate.content.cloneNode(true);
  place.querySelector('.element__title').textContent = name;
  place.querySelector('.element__image').src = link;
  place.querySelector('.element__image').alt = name;
  place.querySelector('.element__delete').addEventListener('click', (evt) => evt.target.closest('.element').remove());
  place.querySelector('.elememt__like').addEventListener('click', (evt) => evt.target.classList.toggle('elememt__like_active'));
  place.querySelector('.element__image').addEventListener('click', function (evt) {
    PopupToggle(popupImage);
    placeImage.setAttribute('src', evt.target.src);
    placeTitle.textContent = name;
    placeImage.setAttribute('alt', name);
  });
  placeList.prepend(place);
  return place;
};

// Изначальные места
initialCards.forEach(element => addPlace(element.name, element.link));

// Добавляем место
function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  addPlace(placeInput.value, linkInput.value);
  PopupToggle(popupPlace);
};

// Слушаем события
closeButtonPopupProfile.addEventListener('click', () => PopupToggle(popupProfile));
popupEditProfile.addEventListener('click', openPopup);
formPopupProfile.addEventListener('submit', formSubmitHandlerProfile);
popupImage.addEventListener('click', closepopupImage);
popupProfile.addEventListener('click', closePopupProfile);
popupPlace.addEventListener('click', closepopupPlace);
formpopupPlace.addEventListener('submit', formSubmitHandlerPlace);
closeButtonpopupImage.addEventListener('click', () => PopupToggle(popupImage));
closeButtonpopupPlace.addEventListener('click', () => PopupToggle(popupPlace));

// Очищаем поля ввода места
popupAddPlace.addEventListener('click', () => {
  PopupToggle(popupPlace);
  placeInput.value = '';
  linkInput.value = '';
});
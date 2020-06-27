const popup = document.querySelector('.popup')
const popupButtonAdd = document.querySelector('.profile__button-edit');
const popupButtonClose = document.querySelector('.popup__button-close');
const popupPhotoView = document.querySelector('.element__image');
const popupImgView = document.querySelector('.popup_type_photo');
const popupButtonCloseImg = document.querySelector('.popup__button-close_for_img');
const ButtonAddPlace = document.querySelector('.profile__button-add');
const popupButtonAddPlace = document.querySelector('.popup_type_add-place')
const popupButtonClosePlace = document.querySelector('.popup__button-close_for_place');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('#form-profile');
const placeElement = document.querySelector('.elememt__like')

function PopupToggle() {
  // Открытие и закрытие popup'a классом
  popup.classList.toggle('popup_opened');
  // Задаем значения в popup'e которые есть в профайле на данный момент
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  // Получите значение полей из свойства value
  const nameForProfile = nameInput.value;
  const jobForProfile = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameForProfile;
  profileProfession.textContent = jobForProfile;
  // Закрываем popup
  PopupToggle();
}

// Открываем popup редактирование профиля по кнопке редактирования
popupButtonAdd.addEventListener('click', PopupToggle);
// Закрываем popup редактирование профиля крестиком
popupButtonClose.addEventListener('click', PopupToggle);
// Прикрепляем обработчик к форме: он будет следить за событием “submit”
formElement.addEventListener('submit', formSubmitHandler);

//Открываем просмотр фото по клику на превью
popupPhotoView.addEventListener('click', function () {
  popupImgView.classList.toggle('popup_opened');
});
// Закрываем попап с фото по крестику
popupButtonCloseImg.addEventListener('click', function () {
  popupImgView.classList.toggle('popup_opened');
});

//Открываем добавление места по кнопке
ButtonAddPlace.addEventListener('click', function () {
  popupButtonAddPlace.classList.toggle('popup_opened');
});
// Закрываем добавление места по крестику
popupButtonClosePlace.addEventListener('click', function () {
  popupButtonAddPlace.classList.toggle('popup_opened');
});

// Меняем иконку лайка при клике
placeElement.addEventListener('click', function () {
  console.log('Da');
  placeElement.classList.toggle('elememt__like_active');
});
const popup = document.querySelector('.popup')
const popupButtonAdd = document.querySelector('.profile__button-edit');
const popupButtonClose = document.querySelector('.popup__button-close');

let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElement = document.querySelector('#form-profile')

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
  let nameForProfile = nameInput.value;
  let jobForProfile = jobInput.value;

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
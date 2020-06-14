const popup = document.querySelector('.popup')
const popupButtonAdd = document.querySelector('.profile__button-edit');
const popupButtonClose = document.querySelector('.popup__button-close');

const PopupToggle = function () {
  popup.classList.toggle('popup_opened');
}
// Открываем popup редактирование профиля
popupButtonAdd.addEventListener('click', PopupToggle);

// Закрываем popup редактирование профиля
popupButtonClose.addEventListener('click', PopupToggle);

// Задаем значения в popup'e которые есть в профайле на данный момент
popup.querySelector('.popup__name').value = document.querySelector('.profile__name').textContent;
popup.querySelector('.popup__profession').value = document.querySelector('.profile__profession').textContent;

// Находим форму в DOM
let formElement = popup.querySelector('.popup__button-save')

function formSubmitHandler(evt) {
  evt.preventDefault();

  // Находим поля формы в DOM
  let nameInput = document.querySelector('.popup__name');
  let jobInput = document.querySelector('.popup__profession');

  // Получите значение полей из свойства value
  let nameForProfile = nameInput.value;
  let jobForProfile = jobInput.value;


  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileProfession = document.querySelector('.profile__profession');

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameForProfile;
  profileProfession.textContent = jobForProfile;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit”
formElement.addEventListener('click', formSubmitHandler);



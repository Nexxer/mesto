export const popupFigure = document.querySelector('.popup_type_photo');

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', keyEsc);
};

//Закрытие через Esc
const keyEsc = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', keyEsc);
};
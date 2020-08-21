export const popupFigure = document.querySelector('.popup_type_photo');

export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
};


export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', keyEsc);
};
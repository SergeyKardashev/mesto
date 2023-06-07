// массив для изначального наполнения галлереи

// Можно прописать слово ЭКСПОРТ перед переменной и не вызывать команду export { initialCards };
// Просто другой способ.
// export const initialCards = [ ...

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const popupUser = (() => {
  const popup = document.querySelector(".popup_type_user-profile");
  return {
    popup,
    // form: popup.querySelector(".popup__form_type_user-profile"),
    form: document.forms["profile-form"],
    nameInput: popup.querySelector(".popup__input_type_user-name"),
    jobInput: popup.querySelector(".popup__input_type_user-job"),
  };
})(); // Последние 2 скобки не лишние - самовызывающаяся функция.

export const addPlaceButton = document.querySelector(".profile__add-place-btn");
export const addPlaceForm = document.querySelector(
  ".popup__form_type_add-place"
);
export const placeNameInput = addPlaceForm.querySelector(
  ".popup__input_type_place-name"
);
export const pleceUrlInput = addPlaceForm.querySelector(
  ".popup__input_type_place-url"
);
export const editProfileBtn = document.querySelector(".profile__edit-btn");

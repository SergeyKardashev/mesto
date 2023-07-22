export const validationConfig = {
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
    aboutInput: popup.querySelector(".popup__input_type_user-about"),
  };
})(); // Последние 2 скобки не лишние - самовызывающаяся функция.

export const addPlaceButton = document.querySelector(".profile__add-place-btn");
export const addPlaceForm = document.querySelector(
  ".popup__form_type_add-place"
);
// export const placeNameInput = addPlaceForm.querySelector(
//   ".popup__input_type_place-name"
// );
// export const pleceUrlInput = addPlaceForm.querySelector(
//   ".popup__input_type_place-url"
// );
export const editProfileBtn = document.querySelector(".profile__edit-btn");

// export const likeNumber = document.querySelector(".gallery__like-number");

export const editAvatarBtn = document.querySelector(
  ".profile__avatar-edit-btn"
);

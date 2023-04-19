const formPlace = document.querySelector(".popup_type_new-place");
console.log(formPlace);

const inputPlaceName = document.getElementById("place-name");
console.log(inputPlaceName);

const submitBtnPlace = formPlace.querySelector(".popup__submit-button");
console.log(submitBtnPlace);

const errorPlaceName = document.querySelector(`.${inputPlaceName.id}-input-error`);
console.log(errorPlaceName);

inputPlaceName.addEventListener("input", (evt) => {
  // console.log(evt.target.validity.valid);
  // console.log(evt);
  if (evt.target.validity.valid) {
    errorPlaceName.classList.remove("form__input-error_active");
    inputPlaceName.classList.remove("form__input_invalid");
  } else {
    errorPlaceName.classList.add("form__input-error_active");
    inputPlaceName.classList.add("form__input_invalid");
  }
});

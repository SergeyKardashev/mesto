class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    this._inputsArray = Array.from(this._inputs);
    this._formFields = this._inputsArray.map((input) => ({
      input: input,
      error: this._form.querySelector(`.${input.id}-input-error`),
    }));
  }

  _enableButton() {
    // this._submitButton.removeAttribute("disabled"); // полная запись
    this._submitButton.disabled = false; // краткая версия
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
  }

  _disableButton() {
    this._submitButton.disabled = true; // краткая версия
    // this._submitButton.setAttribute("disabled", "true"); // полная версия
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }

  _toggleButton = () => {
    if (this._form.checkValidity()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  };

  _setInputValid = (formField) => {
    formField.input.classList.remove(this._config.inputErrorClass);
    formField.error.textContent = "";
    formField.error.classList.remove(this._config.errorClass);
  };

  _setInputInvalid = (formField) => {
    formField.input.classList.add(this._config.inputErrorClass);
    formField.error.textContent = formField.input.validationMessage;
    formField.error.classList.add(this._config.errorClass);
  };

  _checkInputValidity = (formField) => {
    if (formField.input.checkValidity()) {
      this._setInputValid(formField);
    } else {
      this._setInputInvalid(formField);
    }
  };

  // ощистка форм от ошибок, оставленных при прошлом закрытии формы.
  resetValidation = () => {
    this._toggleButton();
    this._formFields.forEach((formField) => {
      this._setInputValid(formField);
    });
  };

  _setListeners = () => {
    this._formFields.forEach((formField) => {
      formField.input.addEventListener("input", () => {
        this._checkInputValidity(formField);
        this._toggleButton(this._config, this._form);
      });
    });
  };

  enableValidation = () => {
    this._setListeners();
    this._toggleButton();
  };
}

export default FormValidator;

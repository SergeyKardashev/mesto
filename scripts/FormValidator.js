class FormValidator {
  constructor(config, form) {
    this.config = config;
    this.form = form;
    this.submitButton = this.form.querySelector(
      this.config.submitButtonSelector
    );
    this.inputs = this.form.querySelectorAll(this.config.inputSelector);
    this.inputsArray = Array.from(this.inputs);
    this.formFields = this.inputsArray.map((input) => ({
      input: input,
      error: this.form.querySelector(`.${input.id}-input-error`),
    }));
  }

  _enableButton() {
    this.submitButton.removeAttribute("disabled", "");
    this.submitButton.classList.remove(this.config.inactiveButtonClass);
  }

  _disableButton() {
    this.submitButton.setAttribute("disabled", "");
    this.submitButton.classList.add(this.config.inactiveButtonClass);
  }

  _toggleButton = () => {
    if (this.form.checkValidity()) {
      this._enableButton(this.config, this.submitButton);
    } else {
      this._disableButton(this.config, this.submitButton);
    }
  };

  _setInputValid = (formField) => {
    formField.input.classList.remove(this.config.inputErrorClass);
    formField.error.textContent = "";
    formField.error.classList.remove(this.config.errorClass);
  };

  _setInputInvalid = (formField) => {
    formField.input.classList.add(this.config.inputErrorClass);
    formField.error.textContent = formField.input.validationMessage;
    formField.error.classList.add(this.config.errorClass);
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
    this.formFields.forEach((formField) => {
      formField.input.classList.remove(this.config.inputErrorClass);
      formField.error.textContent = "";
      formField.error.classList.remove(this.config.errorClass);
    });
  };

  _setListeners = () => {
    this.formFields.forEach((formField) => {
      formField.input.addEventListener("input", () => {
        this._checkInputValidity(formField);
        this._toggleButton(this.config, this.form);
      });
    });
  };

  enableValidation = () => {
    this._setListeners();
    this._toggleButton();
  };
}

export default FormValidator;

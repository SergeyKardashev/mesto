class FormValidator {
  constructor(config, formItem) {
    this.config = config;
    this.formItem = formItem;
  }
  _enableButton() {
    this.submitButton.removeAttribute("disabled", "");
    this.submitButton.classList.remove(this.config.inactiveButtonClass);
  }

  _disableButton() {
    this.submitButton.removeAttribute("disabled", "");
    this.submitButton.classList.add(this.config.inactiveButtonClass);
  }
  _toggleButton = () => {
    this.submitButton = this.formItem.querySelector(
      this.config.submitButtonSelector
    );
    if (this.formItem.checkValidity()) {
      this._enableButton(this.config, this.submitButton);
    } else {
      this._disableButton(this.config, this.submitButton);
    }
  };

  _setInputStatusValid = (inputItem) => {
    const errorItem = document.querySelector(`.${inputItem.id}-input-error`);
    inputItem.classList.remove(this.config.inputErrorClass);
    errorItem.textContent = "";
    errorItem.classList.remove(this.config.errorClass);
  };

  _setInputStatusInvalid = (inputItem) => {
    const errorItem = document.querySelector(`.${inputItem.id}-input-error`);
    inputItem.classList.add(this.config.inputErrorClass);
    errorItem.textContent = inputItem.validationMessage;
    errorItem.classList.add(this.config.errorClass);
  };

  _checkInputValidity = (inputItem) => {
    if (inputItem.checkValidity()) {
      this._setInputStatusValid(inputItem, this.errorItem, this.config);
    } else {
      this._setInputStatusInvalid(inputItem, this.errorItem, this.config);
    }
  };

  _setEventListeners = () => {
    const inputs = this.formItem.querySelectorAll(this.config.inputSelector);
    const inputsArray = Array.from(inputs);
    inputsArray.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidity(inputItem);
        this._toggleButton(this.config, this.formItem);
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
    this._toggleButton();
  };
}

export default FormValidator;
/*
Создайте класс FormValidator, который
- настраивает валидацию полей формы:
  - принимает в конструктор объект настроек с селекторами и классами формы;
  - принимает вторым параметром элемент той формы, которая валидируется;
- имеет приватные методы, которые обрабатывают форму:
  - проверяют валидность поля,
  - изменяют состояние кнопки сабмита,
  - устанавливают все обработчики;
- имеет публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator.
*/

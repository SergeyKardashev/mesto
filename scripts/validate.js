// 🟡 некоторые функции пометил для экспорта, но в другом файле их не использую. Можно удалить команды export

// 🧢 Установить валиный статус полю
export function setInputStatusValid(inputItem, errorItem, config) {
  inputItem.classList.remove(config.inputErrorClass); // убрать класс красной рамки ИНПУТА
  errorItem.textContent = ""; // удалить содержимое ОШИБКИ
  errorItem.classList.remove(config.errorClass); // выключить отображение ОШИБКИ
}

// 🧢 Установить НЕвалиный статус полю
export function setInputStatusInvalid(inputItem, errorItem, config) {
  inputItem.classList.add(config.inputErrorClass); // 1) добавить класс красной рамки ИНПУТА
  errorItem.textContent = inputItem.validationMessage; // 2) заполнить содержимое ОШИБКИ
  errorItem.classList.add(config.errorClass); // 3) включить отображение ОШИБКИ
}

// 🧢 Установить валиный статус ВСЕМ полям ОТКРЫТОГО попапа. Вызывать при зарытии попапа.
// Бывало закрывал его при невалидных полях, а  при следующем открытии поля ОСТАВАЛИСЬ НЕВАЛИДНЫМИ)
// export function setFormInputsValidStatus(popup) {
//   // Собираю все инпуты попапа в коллекцию > массив
//   const inputsCollection = popup.querySelectorAll(".popup__input");
//   const inputsArr = Array.from(inputsCollection);

//   // Прохожу по массиву инпутов, меняя статус каждому полю.
//   inputsArr.forEach((inputToSetValid) => {
//     setInputStatusValid(inputToSetValid);
//   });
// }

// 🧢 ОТКЛЮЧИТЬ КНОПКУ САБМИТА
export function disableButton(config, submitButton) {
  submitButton.setAttribute("disabled", "");
  submitButton.classList.add(config.inactiveButtonClass);
}

// 🧢 ВКЛЮЧИТЬ КНОПКУ САБМИТА
function enableButton(config, submitButton) {
  // console.log("submitButton: ", submitButton);
  // console.log("Включаю кнопку фукнцией enableButton, которую вызвала функция toggleButtonStatus ");
  // console.log("проеряю есть ли класс неактивности у кнопки перед его удалением");
  submitButton.removeAttribute("disabled", "");
  submitButton.classList.remove(config.inactiveButtonClass);
}
//
//🧢 ПРОВЕРКА НЕ СМЕНИТЬ ЛИ СТАТУС КНОПКЕ
export function toggleButtonStatus(config, form) {
  console.log("Cтартовала функция toggleButtonStatus проверки формы, а не полей");
  console.log("Проверяться будет кнопка для формы: ", form);

  const submitButton = form.querySelector(config.submitButtonSelector);
  console.log("Выбрана сабмит-кнопка. Соответствует форме???", submitButton);

  // 🟡 тут ленивая проверка
  console.log("Внутри toggleButtonStatus проверю валидность формы");
  if (form.checkValidity()) {
    console.log("Проверка пройдена - форма валидна. Следом включу кнопку функцией");
    enableButton(config, submitButton); // действия если форма валидна
  } else {
    console.log("Проверка завалена - форма НЕ валидна. Следом ОТключу кнопку функцией");
    disableButton(config, submitButton); // действие если форма невалидна
  }
  console.log("Функция toggleButtonStatus отработала");
}
//
//🧢 НАВЕШИВАТЕЛЬ СЛУШАТЕЛЕЙ САБМИТА
function setSubmitListener(form, config) {
  console.log("Старт функции setSubmitListener - навешивает слушатели сабмита формам");
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("сработал слушатель сабмита формы, навешенный функцией setSubmitListener, запушенной в файл validate.js");
    // console.log(event);
    // console.log(event.target);

    // form.reset(); // 🔴 сброс происходит раньше, чем данные из формы успевают отправиться в сайт

    console.log("Событие САБМИТ вызвало toggleButtonStatus");
    toggleButtonStatus(config, form);
    console.log("Отработала Функция toggleButtonStatus, вызванная событием САБМИТ");
  });
  console.log("Финиш функции setSubmitListener - слушатели сабмита формам поставлены");
}
// //
// 🧢 ПРОВЕРКА ОДНОГО ПОЛЯ. Запускать ТОЛЬКО при событии ИНПУТ, а не при открытии попапа. .
function checkInputValidity(config, inputItem) {
  const errorItem = document.querySelector(`.${inputItem.id}-input-error`);

  if (inputItem.checkValidity() === true) {
    console.log("valid input ");
    setInputStatusValid(inputItem, errorItem, config);
    // inputItem.classList.remove(config.inputErrorClass); // убрать класс красной рамки ИНПУТА
    // errorItem.textContent = ""; // удалить содержимое ОШИБКИ
    // errorItem.classList.remove(config.errorClass); // выключить отображение ОШИБКИ
  } else {
    console.log("invalid input");
    setInputStatusInvalid(inputItem, errorItem, config);
    // inputItem.classList.add(config.inputErrorClass); // 1) добавить класс красной рамки ИНПУТА
    // errorItem.textContent = inputItem.validationMessage; // 2) заполнить содержимое ОШИБКИ
    // errorItem.classList.add(config.errorClass); // 3) включить отображение ОШИБКИ
  }
}

//
// ГЛАВНАЯ ФУНКЦИЯ

export function enableValidation(config) {
  // собираю все формы в коллекцию
  const forms = document.querySelectorAll(config.formSelector);

  // превращаю коллекцию форм в массив форм
  const formsArray = Array.from(forms);
  // console.log("formsArray.length: ", formsArray.length); // 2

  // Всем формам массива навешиваю слушатели сабмита,
  formsArray.forEach(function (formItem) {
    // console.log("Прохожу форычом по массиву форм ", "formItem: ");
    // console.log(formItem);
    setSubmitListener(formItem, config); // ✅ ок
    // 🟡 дважды вешается слушатель сабмита. Тут и в index.js
    // Лишний наверное тут. Ведь этот файл про валидацию. Надо подумать.
    // Точно в слушатель добавить сброс формы и проверку статуса кнопки.

    // console.log("просматриваю конфиг: ");
    // console.log(config);
    // console.log("нахожу все инпуты в 1 форме и закидываю в массив, а массив в константу");
    const inputs = formItem.querySelectorAll(config.inputSelector);
    // console.log("inputs: ");
    // console.log(inputs);
    const inputsArray = Array.from(inputs);
    // console.log("inputsArray.length: ");
    // console.log(inputsArray.length);

    // без всяких слушателей прохожусь по формам, откючая кнопки невалидных форм. Актуально для формы добавления места
    console.log("При загрузке страницы запускается toggleButtonStatus: ");
    toggleButtonStatus(config, formItem); // 🟡 еще не проверил
    console.log("При загрузке страницы запускается toggleButtonStatus: ");

    // навешиваю слушатели события ВВОД полям из массива
    // console.log("сейчас начнется навешиваник слушателей ввода");
    // console.log("inputsArray - ", inputsArray);
    inputsArray.forEach(function (inputItem) {
      // console.log("наввешиваю полям слушатель ИНПУТов");
      inputItem.addEventListener("input", function () {
        checkInputValidity(config, inputItem);
        toggleButtonStatus(config, formItem); // 🟡 еще не проверил
      });
    });
  });
}
//
//

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  // inactiveButtonClass: "popup__button_disabled",
  // submitButtonSelector: ".popup__button",
});

// // 🟡 некоторые функции пометил для экспорта, но в другом файле их не использую. Можно удалить команды export

// // 🧢 Установить валиный статус полю
// export function setInputStatusValid(inputItem, errorItem, config) {
//   inputItem.classList.remove(config.inputErrorClass); // убрать класс красной рамки ИНПУТА
//   errorItem.textContent = ""; // удалить содержимое ОШИБКИ
//   errorItem.classList.remove(config.errorClass); // выключить отображение ОШИБКИ
// }

// // 🧢 Установить НЕвалиный статус полю
// export function setInputStatusInvalid(inputItem, errorItem, config) {
//   inputItem.classList.add(config.inputErrorClass); // 1) добавить класс красной рамки ИНПУТА
//   errorItem.textContent = inputItem.validationMessage; // 2) заполнить содержимое ОШИБКИ
//   errorItem.classList.add(config.errorClass); // 3) включить отображение ОШИБКИ
// }

// // 🧢 ОТКЛЮЧИТЬ КНОПКУ САБМИТА
// export function disableButton(config, submitButton) {
//   submitButton.setAttribute("disabled", "");
//   submitButton.classList.add(config.inactiveButtonClass);
// }

// // 🧢 ВКЛЮЧИТЬ КНОПКУ САБМИТА
// function enableButton(config, submitButton) {
//   submitButton.removeAttribute("disabled", "");
//   submitButton.classList.remove(config.inactiveButtonClass);
// }
// //
// //🧢 ПРОВЕРКА НЕ СМЕНИТЬ ЛИ СТАТУС КНОПКЕ
// export function toggleButtonStatus(config, form) {
//   const submitButton = form.querySelector(config.submitButtonSelector);

//   // 🟡 тут ленивая проверка
//   if (form.checkValidity()) {
//     enableButton(config, submitButton); // действия если форма валидна
//   } else {
//     disableButton(config, submitButton); // действие если форма невалидна
//   }
// }

// //🧢 НАВЕШИВАТЕЛЬ СЛУШАТЕЛЕЙ САБМИТА
// function setSubmitListener(form, config) {
//   form.addEventListener("submit", function (evt) {
//     evt.preventDefault();
//     toggleButtonStatus(config, form);
//   });
// }
// //
// // 🧢 ПРОВЕРКА ОДНОГО ПОЛЯ. Запускать ТОЛЬКО при событии ИНПУТ, а не при открытии попапа. .
// function checkInputValidity(config, inputItem) {
//   const errorItem = document.querySelector(`.${inputItem.id}-input-error`);

//   if (inputItem.checkValidity() === true) {
//     setInputStatusValid(inputItem, errorItem, config);
//   } else {
//     setInputStatusInvalid(inputItem, errorItem, config);
//   }
// }

// // ГЛАВНАЯ ФУНКЦИЯ

// function enableValidation(config) {
//   // собираю все формы в коллекцию
//   const forms = document.querySelectorAll(config.formSelector);

//   // превращаю коллекцию форм в массив форм
//   const formsArray = Array.from(forms);

//   // Всем формам массива навешиваю слушатели сабмита,
//   formsArray.forEach(function (formItem) {
//     setSubmitListener(formItem, config);

//     const inputs = formItem.querySelectorAll(config.inputSelector);
//     const inputsArray = Array.from(inputs);

//     // без всяких слушателей прохожусь по формам, откючая кнопки невалидных форм. Актуально для формы добавления места
//     toggleButtonStatus(config, formItem); // 🟡 еще не проверил

//     // навешиваю слушатели события ВВОД полям из массива
//     inputsArray.forEach(function (inputItem) {
//       inputItem.addEventListener("input", function () {
//         checkInputValidity(config, inputItem);
//         toggleButtonStatus(config, formItem); // 🟡 еще не проверил
//       });
//     });
//   });
// }
// //

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__submit-button",
//   inactiveButtonClass: "popup__submit-button_inactive",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

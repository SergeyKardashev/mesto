import { initialCards } from "./content.js";

// import { enableValidation } from "./validate.js"; // 🔴 проверить достаточно ли одной главной функции
// // или нужно все остальные призывать сюда импортом

// import { toggleButtonStatus } from "./validate.js"; // 🔴 проверить достаточно ли ей аргументов

// import { disableButton } from "./validate.js"; // 🔴 проверить достаточно ли ей аргументов
// import { setInputStatusValid } from "./validate.js"; // 🔴 проверить достаточно ли ей аргументов
// import { setInputStatusInvalid } from "./validate.js"; // 🔴 проверить достаточно ли ей аргументов
// import { setFormInputsValidStatus } from "./validate.js"; // 🔴 проверить достаточно ли ей аргументов

// СОДЕРЖИМОЕ ШАБЛОНА КАРТОЧКИ - #document-fragment без метода *.remove()
const cardTemplateContent = document.getElementById("card").content;

// ДИВ-ОБЕРТКА КАРТОЧКИ ПО ИМЕНИ КЛАССА (html-узел)
const galleryElement = cardTemplateContent.querySelector(".gallery__element");

// Галерея КУДА КЛАСТЬ НОВЫЕ КАРТОЧКИ - (html-узел), принимающий новорожденные карточки.
const gallery = document.querySelector(".gallery");

// ФИО в тексте профиля (html-узел)
const userNameElement = document.querySelector(".profile__name");

// должность в тексте профиля (html-узел)
const userJobElement = document.querySelector(".profile__job");

// кнопка редактирования профиля (html-узел)
const editProfileBtn = document.querySelector(".profile__edit-btn");

// кнопка добавления места в профиле рядом с аватаркой
const addPlaceBtn = document.querySelector(".profile__add-place-btn");

// функция, возвращающая объект popupUser с частями попапа профиля.
const popupUser = (() => {
  const popup = document.querySelector(".popup_type_user-profile");
  return {
    popup,
    // ОШИБОЧНОЕ ПРЕДПОЛОЖЕНИЕ: строка выше из одного слова возвращает объект. Следующие строки - его свойства.
    // ВЕРНОЕ: это ключ с одноименным значением. Обращаться так: popupuser.popup и выдаст НОДу попапа, а не объект.
    closeButton: popup.querySelector(".popup__close-button_type_profile"),
    form: popup.querySelector(".popup__form_type_user-profile"),
    nameInput: popup.querySelector(".popup__input_type_user-name"),
    jobInput: popup.querySelector(".popup__input_type_user-job"),
  };
})(); // Последние 2 скобки не лишние - самовызывающаяся функция. В первых скобках создается анонимная функция и сразу же вызывается вторыми скобками

// Весь попап добаления места
const popupAddPlace = document.querySelector(".popup_type_new-place");

// Форма добавления места, а не весь попап, для отправки формы.
const formElementAddPlace = popupAddPlace.querySelector(".popup__form_type_add-place");

// Поле ввода названия места
const placeNameInput = formElementAddPlace.querySelector(".popup__input_type_place-name");

// Поле ввода URL места
const pleceUrlInput = formElementAddPlace.querySelector(".popup__input_type_place-url");

// Кнопка закрытия попапа места
const closePopupAddPlaceBtn = popupAddPlace.querySelector(".popup__close-button");

// Кнопка сабмита попапа места или добавления места в попапе добавления места.
const submitPlaceButton = popupAddPlace.querySelector(".popup__submit-button");

// Весь папап ЗУМа
const zoomPopup = document.querySelector(".popup_type_zoom-image");

// 🔴 не использую функцию, которая берет попап на вход. Вместо нее использую ту, что берет форму.
// 🧢 функция Установить валиный статус ВСЕМ полям ОТКРЫТОГО попапа. Вызывать при зарытии попапа.
// Бывало закрывал попап при невалидных полях, а при следующем его открытии поля ОСТАВАЛИСЬ НЕВАЛИДНЫМИ)
// function setPopupFormInputsValidStatus(popup) {
//   // БУДУ ЧИСТИТЬ ФОРМУ чтобы она не хранила ошибок от прошлого откытия и закрытия.
//   console.log("БУДУ ЧИСТИТЬ ФОРМУ functoin setFormInputsValidStatus is lounched");
//   // Собираю все инпуты попапа в коллекцию > массив

//   const inputsCollection = popup.querySelectorAll(".popup__input");
//   const inputsArr = Array.from(inputsCollection);

//   // Прохожу по массиву инпутов, меняя статус каждому полю.
//   inputsArr.forEach((inputToSetValid) => {
//     // setInputStatusValid(inputToSetValid);
//     inputToSetValid.classList.remove("popup__input_type_error"); // убрать класс красной рамки ИНПУТА
//     const errorItemToSetValid = document.querySelector(`.${inputToSetValid.id}-input-error`);
//     errorItemToSetValid.textContent = ""; // удалить содержимое ОШИБКИ
//     errorItemToSetValid.classList.remove("popup__error_visible"); // выключить отображение ОШИБКИ
//   });
// }

// 🔴 Это было закоменчено. Не факто что именно нужную версию раскомментил.
// 🧢 функция Установить валиный статус ВСЕМ полям ОТКРЫТОГО попапа. Вызывать при зарытии попапа.
// Бывало закрывал попап при невалидных полях, а при следующем его открытии поля ОСТАВАЛИСЬ НЕВАЛИДНЫМИ)
function setFormInputsValidStatus(formToSetValid) {
  // БУДУ ЧИСТИТЬ ФОРМУ чтобы она не хранила ошибок от прошлого откытия и закрытия.
  console.log("БУДУ ЧИСТИТЬ ФОРМУ functoin setFormInputsValidStatus is lounched");
  // Собираю все инпуты попапа в коллекцию > массив

  const inputsCollection = formToSetValid.querySelectorAll(".popup__input");
  const inputsArr = Array.from(inputsCollection);

  // Прохожу по массиву инпутов, меняя статус каждому полю.
  inputsArr.forEach((inputToSetValid) => {
    // setInputStatusValid(inputToSetValid);
    inputToSetValid.classList.remove("popup__input_type_error"); // убрать класс красной рамки ИНПУТА
    const errorItemToSetValid = document.querySelector(`.${inputToSetValid.id}-input-error`);
    errorItemToSetValid.textContent = ""; // удалить содержимое ОШИБКИ
    errorItemToSetValid.classList.remove("popup__error_visible"); // выключить отображение ОШИБКИ
  });
}

// 🧢  функция открытия указанного попапа.
function openPopup(popupName) {
  popupName.classList.add("popup_opened"); // добавление класса ОТКРЫТО для попапа

  // Добавил на весь файл слушатель клавы.  // Колбэк ИФом по эскейпу закрывает ОТКРЫТый попап.
  document.addEventListener("keydown", closePopupByEscape); // Без скобок колбэка. Её не вызываем. Ее вызовет событие.

  //  добавил навешивание слушателя на оверлэй при открытии. Закрывает ПОПАП по клику на оверлее.
  closePopupByOverlay(popupName);
}

// 🧢 функция закрытия указанного попапа.
function closePopup(popupToClose) {
  console.log("Старт функции closePopup > ");
  popupToClose.classList.remove("popup_opened");

  // Удаляю слушатель клавы.
  document.removeEventListener("keydown", closePopupByEscape); // Без скобок колбэка. Её не вызываем. Ее вызовет событие.

  //
  // 🔴 Установить валиный статус ВСЕМ полям ОТКРЫТОГО попапа. Вызывать при зарытии попапа.
  // Бывало закрывал попап при невалидных полях, а при следующем его открытии поля ОСТАВАЛИСЬ НЕВАЛИДНЫМИ)
  const formToReset = popupToClose.querySelector(".popup__form");

  // В ЗУМ-ПОПАПЕ НЕТ ФОРМЫ - вызывает ошибку. Поэтому проверка на наличие формы.

  // Жесткая проверка без приведения к типу не сработает. Думал что formToReset === true это как formToReset.
  // Автоматом приведется к булевом значению. Но не прошло
  if (Boolean(formToReset) === true) {
    // if (formToReset === true) {
    // if (formToReset) {
    console.log("Успешно проверено formToReset на трушность");
    formToReset.reset();
    setFormInputsValidStatus(formToReset);
  } else {
    console.log("!!!Завалена проверка formToReset на трушность!!!");
  }
}

//
// 🧢 функция закрытия попапа по эскейпу
// Аргументом попап НЕ даю функции. Нахожу его внутри.
// Добавил аргумент Ивент в скобки. Конструкция ИФ должна брать ивент из родителя - слушателя.
function closePopupByEscape(evt) {
  // console.log("closePopupByEscape function > event:");
  // console.log(evt);
  const popupToClose = document.querySelector(".popup_opened");
  if (evt.key === "Escape" && popupToClose) {
    // Тут запись "&& popupToClose" значит: И  "попап, который надо закрыть" равен правде,
    // т.е. существуюет и не нулевой не пустой. (открытый попап - попап, которому уже назначен класс открытия)
    closePopup(popupToClose);
  }
}

// 🧢 функция удаления указанного элемента
function deleteCardElement(cardToDelete) {
  cardToDelete.remove();
}
// 🧢 функция лайка для объекта (кнопки), передаваемого в нее
function likeCardElement(btnToLike) {
  btnToLike.classList.toggle("gallery__like_active");
}
// 🧢 функция ЗУМИРОВАНИЯ - открытие папапа zoom - только объявление без вызова

function zoom(cardData) {
  // Нахожу html-узлы попапа zoom для наполнения.
  // // Картинка попапа zoom (html-узел)
  const popupImage = zoomPopup.querySelector(".popup__image-zoom");
  // // Подпись попапа zoom (html-узел)
  const popupTxt = zoomPopup.querySelector(".popup__caption");

  // Наполняю попап данными из объекта (объект в форыче или в сабмите)
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTxt.textContent = cardData.name;

  // Кнопка закрытия zoom попапа
  const closeZoomPopupBtn = zoomPopup.querySelector(".popup__close-button");

  // Слушатель кнопки закрытия zoom попапа
  closeZoomPopupBtn.addEventListener("click", () => {
    closePopup(zoomPopup); // вызов функции с агмументом (переменная с попапок)
  });

  // Открываю ЗУМ папап
  openPopup(zoomPopup);
}
// 🧢  Функция СОЗДАНИЯ карточки и наполнения БЕЗ добавления ее на страницу.
// cardData - данные (объект из массива или инпутов), части которых нести в создаваемый элемент.
function createCard(cardData) {
  // Клонирую узел galleryElement в переменную
  const cardElement = galleryElement.cloneNode(true);

  // название места в клоне карточки (html-узел)
  const placeName = cardElement.querySelector(".gallery__text");
  // картинка в клоне карточки (html-узел)
  const placeImage = cardElement.querySelector(".gallery__img");
  // Слушатель на картинку в клоне карточки
  placeImage.addEventListener("click", () => {
    zoom(cardData);
  });

  // Наполню теги значениями из объекта cardData
  placeName.textContent = cardData.name;
  placeImage.src = cardData.link;
  placeImage.alt = cardData.name;

  // Кнопка лайка в клоне карточки (html-узел)
  const likeBtn = cardElement.querySelector(".gallery__like");
  // Слушатель лайка по клику на кнопке лайка
  likeBtn.addEventListener("click", () => {
    likeCardElement(likeBtn);
  });

  // Кнопка удаления в клоне карточки
  const deletePlaceBtm = cardElement.querySelector(".gallery__delete");
  // Слушатель кнопки удаления в клоне карточки
  deletePlaceBtm.addEventListener("click", () => {
    deleteCardElement(cardElement);
  });

  // Возврат заполненнной переменной, готовой к добавлению в ДОМ
  return cardElement;
}
// 🧢 Функция сабмита формы UserProfile (без вызова, просто функция)
function handleFormSubmitUserProfile(evt) {
  evt.preventDefault(); // без перезагрузки страницы
  userNameElement.textContent = popupUser.nameInput.value; // из формы в страницу
  userJobElement.textContent = popupUser.jobInput.value; // из формы в страницу
  closePopup(popupUser.popup); // закладываю функцию сокрытия попапа
}
// 🧢 Функция добавления карточек в конец
function renderPlaceAppend(cardItem) {
  gallery.append(cardItem); // gallery объявлена в глобальном скоупе
}
// 🧢 Функция добавления карточек в начало
function renderPlacePrepend(cardItem) {
  gallery.prepend(cardItem); // gallery объявлена в глобальном скоупе
}

// 🧢 Функция добавления слушателя на Овелей для закрытия попапа по клику на оверлее.
function closePopupByOverlay(popupName) {
  popupName.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popupName);
    }
  });
}

// 🧢 Функция сабмита формы нового места (без вызова, просто функция). Сбор инфы из полей в объект cardData,
// который скормлю функции создания карточек. Создание карточки функцией. Отрисовка карточки (рендер) - отправка в ДОМ
function handleFormSubmitAddPlace(evt) {
  evt.preventDefault(); // без перезагрузки страницы

  // Сбор инфы из полей в переменные, а затем в объект cardData
  const placeNameInputValue = placeNameInput.value;
  const placeLinkInputValue = pleceUrlInput.value;

  // В объект (НЕмассив) тащу данные из переменных из полей.
  const cardData = {
    name: placeNameInputValue,
    link: placeLinkInputValue,
  };

  // Вызов функции создания и наполнения карточки.
  // при создании карточки вешаю обработчики на фото, лайк и корзину
  const cardElement = createCard(cardData);

  // Вызов функции отображения карточки
  renderPlacePrepend(cardElement);

  // 🟡reset form add here

  closePopup(popupAddPlace); // закладываю функцию сокрытия попапа
}

// Наполняю галерею карточками из массива
initialCards.forEach((cardData) => {
  renderPlaceAppend(createCard(cardData));
  // Вызываю функцию создания и наполнения карточки (+ добавление слушателей)
  // Создание - клонированием. Наполнение из аргумента-объекта, подаваемого на вход .
  // форычом элемента js-массива initialCards, где каждый элемент массива - объект.
  // Полученную заполненную карточку отдаю функции добавления в ДОМ
});

// Слушатель кнопки открытые попапа добавления места
addPlaceBtn.addEventListener("click", (evt) => {
  // отлючил опустошение полей, т.к. в главной функции прописан ресет формы при отправке.
  placeNameInput.value = ""; // опустошаю поле ввода формы
  pleceUrlInput.value = ""; // опустошаю поле ввода формы

  // 🟡 вместо хардкодного опустошения полей слушателю сабмита всех форм попробовал дописать
  // чтобы сбрасывал форму после отправки. Но он сбрасывает поля ДО отправки данных в сайт.

  // 🟡 Нужна проверка кнопки функцией с условием.
  // 🟡 Отключаю кнопку хардкодом. Функцией не работает. при открытии попапа в 2 действия. 1) стиль; 2) свойство отключения в разметке.
  // 1) стиль неактивной кнопки применился успешно
  submitPlaceButton.classList.add("popup__submit-button_inactive");
  // 2) свойство отключения в разметке.
  submitPlaceButton.setAttribute("disable", "");

  openPopup(popupAddPlace); // открытие попапа
});

// 🟡 Нужно ли писать функцию по отключению кнопки сабмита при открытии попапа добавления места?
// Он один такой, нуждающийся в отлючении кнопки. Это код не повторяется.

// Слушатель кнопки закрытия попапа места
closePopupAddPlaceBtn.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

// Слушатель сабмита (кнопки СОХРАНИТЬ) в форме добавления места запускает функцию сабмита
formElementAddPlace.addEventListener("submit", handleFormSubmitAddPlace);

// Слушатель кнопки редактирования профиля
editProfileBtn.addEventListener("click", function () {
  popupUser.nameInput.value = userNameElement.textContent; // из страницы в форму
  popupUser.jobInput.value = userJobElement.textContent; // из страницы в форму
  openPopup(popupUser.popup); // открытие попапа
});

// Слушатель кнопки закрытия попапа профиля.
popupUser.closeButton.addEventListener("click", () => {
  closePopup(popupUser.popup);
});

// слушатель сабмита формы профиля = СОХРАНИТЬ в форме профиля
popupUser.form.addEventListener("submit", handleFormSubmitUserProfile);

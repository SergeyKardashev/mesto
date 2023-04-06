import { initialCards } from "./content.js";
// получаю содержимое шаблона карточки в переменную.
const cardTemplate = document.querySelector("#card").content;
// или без квериселектора то же самое можно сделать const cardTemplate = document.getElementById("card");

// в переменную сохраняю html-элемент, принимающий новорожденные карточки.
const gallery = document.querySelector(".gallery");

// получаю содержимое шаблона ZOOM-попапа в переменную.
// const zoomTemplate = document.querySelector("#zoom").content;

// в переменную сохраняю html-элемент BODY, принимающий новорожденные ZOOM-попапы.
const body = document.querySelector(".body");

// Наполняю галерею карточками из массива
// методом forEach для каждого элемента массива создаю заготовку клоном нода, наполняю ее и вставляд в ДОМ аппендом
initialCards.forEach((item, index) => {
  // клонирую содержимое шаблона из переменной cardTemplate в переменную cardElement,
  // найдя по классу контейнера внутри шаблона, а не по элементу шаблона.
  const cardElement = cardTemplate.querySelector(".gallery__element").cloneNode(true);

  // наполняю содержимым каждый тег клона отдельно
  cardElement.querySelector(".gallery__img").src = initialCards[index].link;
  cardElement.querySelector(".gallery__img").alt = initialCards[index].name;
  cardElement.querySelector(".gallery__text").textContent = initialCards[index].name;
  //
  //  ZOOM-попап в процессе наполнения галлереи из массива
  // картинка карточки
  const imgPlace = cardElement.querySelector(".gallery__img");

  // функция зумирования картинки отображает попап
  function zoom() {
    // нахожу попап, запихиваю в переменную
    const zoomPopup = document.querySelector(".popup_type_zoom-image");

    // наполняю попап данными из массива
    zoomPopup.querySelector(".popup__image-zoom").src = initialCards[index].link;
    zoomPopup.querySelector(".popup__image-zoom").alt = initialCards[index].name;
    zoomPopup.querySelector(".popup__caption").textContent = initialCards[index].name;

    // нахожу кнопку закрытия попапа, запихиваю в переменную.
    const closeZoomPopupBtn = zoomPopup.querySelector(".popup__close-button_type_zoom-image");
    // вешаю на кнопку обработчик события
    closeZoomPopupBtn.addEventListener("click", () => {
      closePopup(zoomPopup); // вызов функции с агмументом (переменная с попапок)
    });

    // отображаю ZOOM-попап
    zoomPopup.classList.add("popup_opened");
  }

  // вешаю обработчик на саму картинку в карточке (в момент создания карточки)
  imgPlace.addEventListener("click", () => {
    zoom();
  });
  //
  // 🗑️ кнопка удаления
  const deletePlaceBtm = cardElement.querySelector(".gallery__delete");

  // 🗑️функция удаления
  function deleteCardElement() {
    cardElement.remove();
  }
  // 🗑️действие удаления по клику на кнопке удаления
  deletePlaceBtm.addEventListener("click", () => {
    deleteCardElement();
  });

  // 💛 кнопка лайка
  const likeBtn = cardElement.querySelector(".gallery__like");

  // 💛 функция лайка
  function likeCardElement() {
    likeBtn.classList.toggle("gallery__like_active");
  }
  // 💛 действие лайка по клику на кнопке лайка
  likeBtn.addEventListener("click", () => {
    likeCardElement();
  });

  // передаю это в DOM
  // в объект-приемник добавляю карточку (в конец объекта)
  gallery.append(cardElement);
});
//
//  УНИВЕРСАЛЬНОЕ
//
// 🧢 🍿 👀 функция открытия указанного попапа.
function openPopup(popupName) {
  popupName.classList.add("popup_opened"); // добавление класса ОТКРЫТО для попапа
}

// 🧢 ❌ 🍿 функция закрытия указанного попапа.
function closePopup(popupName) {
  popupName.classList.remove("popup_opened"); // убираю класс, делающий попап видимым
}
//
// ПРОФИЛЬ
//
// 🍿 👨‍💼 весь попап профиля
const popupProfile = document.querySelector(".popup_type_user-profile");

// Форма профиля, а не весь попап для отправки формы.
const formElementUserProfile = popupProfile.querySelector(".popup__form_type_user-profile");

// html-элемент с ФИО в тексте профиля
const userNameElement = document.querySelector(".profile__name");

// html-элемент с должностью в тексте профиля
const userJobElement = document.querySelector(".profile__job");

// Поле ввода ФИО // 🔴 error
const userNameInput = formElementUserProfile.querySelector(".popup__input_type_user-name");

// Поле ввода работы
const userJobInput = formElementUserProfile.querySelector(".popup__input_type_user-job");

// 🔤 🖍️ 👨‍💼 кнопка редактирования профиля
const editProfileBtn = document.querySelector(".profile__edit-btn");

// 🆑 🖍️ 👨‍💼 👀 клик по кнопке редактирования профиля
editProfileBtn.addEventListener("click", function () {
  userNameInput.value = userNameElement.textContent; // из страницы в форму
  userJobInput.value = userJobElement.textContent; // из страницы в форму
  openPopup(popupProfile); // 👀 открытие попапа
});

// ❌ 🍿 👨‍💼 Крестик - кнопка закрытия попапа профиля
const closePopupProfileBtn = popupProfile.querySelector(".popup__close-button_type_profile");

// ❌ 🆑 👨‍💼 Клик по кнопке закрытия попапа профиля.
closePopupProfileBtn.addEventListener("click", () => {
  closePopup(popupProfile);
});

// 👍 Обработчик «отправки» формы UserProfile (без вызова, просто функция)
function handleFormSubmitUserProfile(evt) {
  evt.preventDefault(); // без перезагрузки страницы
  userNameElement.textContent = userNameInput.value; // из формы в страницу
  userJobElement.textContent = userJobInput.value; // из формы в страницу
  closePopup(popupProfile); // закладываю функцию сокрытия попапа
}

// Клик по кнопке СОХРАНИТЬ в форме профиля
//   1) Добавляю обработчик к ФОРМЕ (не к кнопке):
//   2) Он следит за событием “submit”, а НЕ "клик"
//   3) Он запустит функцию с букетом инструкций, а не одно действие.
formElementUserProfile.addEventListener("submit", handleFormSubmitUserProfile);
//
// ПОПАП ДОБАВЛЕНИЯ МЕСТА
//
// кнопка добавления места
const addPlaceBtn = document.querySelector(".profile__add-place-btn");

// Весь попап добаления места
const popupAddPlace = document.querySelector(".popup_type_new-place");

// Форма добавления места, а не весь попап, для отправки формы.
const formElementAddPlace = popupAddPlace.querySelector(".popup__form_type_add-place");

// Поле ввода названия места
const placeNameInput = formElementAddPlace.querySelector(".popup__input_type_place-name");

// Поле ввода URL места
const pleceUrlInput = formElementAddPlace.querySelector(".popup__input_type_place-url");

// клик по кнопке добавления места
addPlaceBtn.addEventListener("click", () => {
  placeNameInput.value = ""; // опустошаю поле ввода формы
  pleceUrlInput.value = ""; // опустошаю поле ввода формы
  openPopup(popupAddPlace); // открытие попапа
});

// ❌ 🍿 Крестик - кнопка закрытия попапа места
const closePopupAddPlaceBtn = popupAddPlace.querySelector(".popup__close-button_type_place");

// клик по крестику - кнопке закрытия попапа места
closePopupAddPlaceBtn.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

// Обработчик «отправки» формы нового места (без вызова, просто функция)
function handleFormSubmitAddPlace(evt) {
  evt.preventDefault(); // без перезагрузки страницы

  // клонирую содержимое шаблона из переменной cardTemplate в переменную cardElement,
  // найдя по классу контейнера внутри шаблона, а не по элементу шаблона.
  const cardElement = cardTemplate.querySelector(".gallery__element").cloneNode(true);

  // переношу данные из полей ввода в клонированный нод.
  cardElement.querySelector(".gallery__text").textContent = placeNameInput.value;
  cardElement.querySelector(".gallery__img").src = pleceUrlInput.value;
  cardElement.querySelector(".gallery__img").alt = placeNameInput.value;

  // ZOOM-попап для добавленных юзером картинок (в процессе сабмита)
  // картинка карточки
  const imgPlace = cardElement.querySelector(".gallery__img");

  // функция зумирования картинки отображает попап
  function zoom() {
    // нахожу попап, запихиваю в переменную
    const zoomPopup = document.querySelector(".popup_type_zoom-image");

    // наполняю попап данными из полей ввода
    zoomPopup.querySelector(".popup__image-zoom").src = pleceUrlInput.value;
    zoomPopup.querySelector(".popup__image-zoom").alt = placeNameInput.value;
    zoomPopup.querySelector(".popup__caption").textContent = placeNameInput.value;

    // нахожу кнопку закрытия попапа, запихиваю в переменную.
    const closeZoomPopupBtn = zoomPopup.querySelector(".popup__close-button_type_zoom-image");

    // вешаю на кнопку обработчик события
    closeZoomPopupBtn.addEventListener("click", () => {
      closePopup(zoomPopup); // вызов функции с агмументом (переменная с попапок)
    });

    // отображаю ZOOM-попап
    zoomPopup.classList.add("popup_opened");
  }
  // вешаю обработчик на саму картинку в карточке (в момент создания карточки)
  imgPlace.addEventListener("click", () => {
    zoom();
  });

  // 🗑️ кнопка удаления
  const deletePlaceBtm = cardElement.querySelector(".gallery__delete");

  // 🗑️ функция удаления
  function deleteCardElement() {
    cardElement.remove();
  }
  // 🗑️ действие удаления по клику на кнопке удаления
  deletePlaceBtm.addEventListener("click", () => {
    deleteCardElement();
  });

  // 💛 кнопка лайка
  const likeBtn = cardElement.querySelector(".gallery__like");

  // 💛 функция лайка
  function likeCardElement() {
    likeBtn.classList.toggle("gallery__like_active");
  }

  // 💛 действие лайка по клику на кнопке лайка
  likeBtn.addEventListener("click", () => {
    likeCardElement();
  });
  gallery.prepend(cardElement); // добавлю заполненный узел в дом.
  closePopup(popupAddPlace); // закладываю функцию сокрытия попапа
}
// Клик по кнопке СОХРАНИТЬ в форме добавления места
formElementAddPlace.addEventListener("submit", handleFormSubmitAddPlace);

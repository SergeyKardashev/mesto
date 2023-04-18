import { initialCards } from "./content.js";

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

// 🧢  функция открытия указанного попапа.
function openPopup(popupName) {
  popupName.classList.add("popup_opened"); // добавление класса ОТКРЫТО для попапа
}
// 🧢 функция закрытия указанного попапа.
function closePopup(popupName) {
  popupName.classList.remove("popup_opened"); // убираю класс, делающий попап видимым
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
  // ищу окошко папапа
  const zoomPopup = document.querySelector(".popup_type_zoom-image");

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

  openPopup(zoomPopup); // Открываю окошко папапа
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
// 🧢 Функция сабмита формы нового места (без вызова, просто функция). Сбор инфы из полей в объект cardData,
// который скормлю функции создания карточек. Создание карточки функцией. Отрисовка карточки (рендер) - отправка в ДОМ
function handleFormSubmitAddPlace(event) {
  event.preventDefault(); // без перезагрузки страницы

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

// Слушатель кнопки добавления места
addPlaceBtn.addEventListener("click", () => {
  placeNameInput.value = ""; // опустошаю поле ввода формы
  pleceUrlInput.value = ""; // опустошаю поле ввода формы
  openPopup(popupAddPlace); // открытие попапа
});

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

// слушатель кнопки сабмита формы профиля = СОХРАНИТЬ в форме профиля
popupUser.form.addEventListener("submit", handleFormSubmitUserProfile);

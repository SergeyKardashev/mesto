import {
  validationConfig,
  popupUser,
  addPlaceButton,
  editProfileBtn,
  editAvatarBtn,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirm } from "../components/PopupWithConfirmation.js";

import "./index.css"; // импорт главного файла стилей. Такая запись только для вебпака

/*  Универсальная функцию сабмита любых форм. Принимает:
    - функцию запроса,
    - экземпляр попапа
    - строку лейбла во время загрузки (опционально), т.к. есть дефолтное значение   */

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  //
  // Изменяем лейбл кнопки до запроса (методом класса PopupWithForm).
  // Аргументы: булево значение параметра isLoading и опционально лейбак.
  popupInstance.renderLoading(true, loadingText);

  // запускаем запрос, переданный аргументом
  request()
    .then(() => {
      popupInstance.close(); // закрывать попап нужно только в `then`
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    // возвращаю начальный лейбл методом (isLoading=false)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// 🧢  функция открытия попапа ЗУМа - функция зумирования
const handleCardClick = (cardData) => zoomPopup.open(cardData);
//
//
//// 🧢 колбек по конфирму (сабмит попапа с подтверждением).
// Отдаю его при создании карточки классу Card.
function handleDelete(card) {
  confirmPopup.open(() => {
    api
      .delete(card.cardData._id)
      .then(() => {
        card.handleDelete();
        confirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
//
const confirmPopup = new PopupWithConfirm(".popup_type_confirm-del");
confirmPopup.setEventListeners();
//
//
// 🧢 🔴 Функция создания заполненной разметки карточки. Функция создает, но не возвращает инстанс класса.
// Возвращает рез-т работы метода getCard каласса Card, т.е. заполненную разметку карточки
// const createCard = (...args) => new Card(...args).getCard();
// занесли все аргументы передаваемые в функцию в массив ...args. Перечитать и тренировать rest, spread

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-72",
  headers: {
    authorization: "ae5a51f8-81eb-4b98-b197-2ef227e48cb1",
    "Content-Type": "application/json",
  },
});

function handleLike(card) {
  if (card.isLiked) {
    api
      .removeLike(card)
      .then((res) => {
        card.updateLikes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLike(card)
      .then((res) => {
        card.updateLikes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

let userID = "";

function createCard(data) {
  const cardElement = new Card(
    data,
    "#card",
    handleCardClick,
    handleDelete,
    handleLike,
    myUserInfo.data._id
  );

  return cardElement.getCard();
}
// 🧢 Функция-колбэк добавления карточи. Декларация. НЕ вызов. Используется форычом.
const renderCard = (data) => {
  // в var тащу результат работы функции = разметку, а НЕ объект
  const cardToAdd = createCard(data);
  cardSection.addItem(cardToAdd);
};

// ПОЛУЧАЮ ИЗНАЧАЛЬНЫЕ КАРТОЧКИ
const cardSection = new Section(renderCard, ".gallery");

const promiseInitialUserInfo = api.setInitialUserInfo();
const promiseInitialCards = api.getInitialCards();

// жду пока оба запроса вернутся чтобы сличать мой айди и понимать ставить ли корзину на карточку
Promise.all([promiseInitialUserInfo, promiseInitialCards])
  .then(([responseInitialUserInfo, responseInitialCards]) => {
    // userID - переменная в глобальном скоупе.
    // Ее отдаю классу Card для сличения айдишников
    userID = responseInitialUserInfo._id;
    console.log(responseInitialUserInfo);
    myUserInfo.setUserInfo(responseInitialUserInfo);

    // responseInitialCards - массив объектов карточек для отрисовки
    // renderItems- колбэк. Создает+наполняет разметку аргументом.
    // Отдает ее вставить.
    cardSection.renderItems(responseInitialCards);
  })
  .catch((err) => {
    console.log(err);
  });

// Экземпляр класса UserInfo создается единожды
export const myUserInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar-edit-btn",
});

// // 🧢 описываю функцию-колбэк сабмита профиля заранее
// const handleSubmitProfile = ({ name, about }) => {
//   // Редактирование профиля - данные идут на сервер.
//   return api
//     .editProfile(name, about)
//     .then((data) => {
//       myUserInfo.setUserInfo(data);
//       popupProfile.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// пример оптимизации обработчика сабмита формы профиля
const handleSubmitProfile = (inputValues) => {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // `return` позволяет продолжать цепочку `then, catch, finally`
    return api.editProfile(inputValues).then((userData) => {
      myUserInfo.setUserInfo(userData);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, popupProfile);
};

// попапу профиля передаю функцию сабмита профиля колбэком при создании инстанса попапа
const popupProfile = new PopupWithForm(
  ".popup_type_user-profile",
  (inputVaues) => {
    handleSubmitProfile(inputVaues);
  }
);

// вешаю слушатели попапу профиля
popupProfile.setEventListeners();
//
// 🧢 👨‍💼 колбэк кнопки редактирования профиля - откроет попап
const editProfile = () => {
  formValidators["profile-form"].resetValidation();
  popupProfile.setInputValues(myUserInfo.getUserInfo());
  popupProfile.open();
};

// 👨‍💼
editProfileBtn.addEventListener("click", () => editProfile());

// 🧢 колбэк слушателя сабмита карточки
const handleSubmitAddPlace = (formData) => {
  // formValidators["add-place-form"].resetValidation(); При сабмите формы не нужно вызывать resetValidation, так как это не имеет смысла. Нужно делать это только при открытии теперь. И оно уже там есть

  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    return api
      .addCard({ name: formData.placeName, link: formData.placeUrl })
      .then((cardDataFromApi) => {
        const card1by1 = createCard(cardDataFromApi);
        cardSection.addItem(card1by1);
      });
  }
  // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, addPlacePopup);
};

// срарая версия. Заменил на предложенную ревьювером.
// const handleSubmitAddPlace = (formData) => {
//   // formValidators["add-place-form"].resetValidation(); При сабмите формы не нужно вызывать resetValidation, так как это не имеет смысла. Нужно делать это только при открытии теперь. И оно уже там есть
//   api
//     .addCard({ name: formData.placeName, link: formData.placeUrl })
//     .then((cardDataFromApi) => {
//       const card1by1 = createCard(cardDataFromApi);
//       cardSection.addItem(card1by1);
//     })
//     .then(() => {
//       addPlacePopup.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const addPlacePopup = new PopupWithForm(
  ".popup_type_new-place",
  handleSubmitAddPlace
);

// комменты от Артёма "ты передаешь не асинхронную функцию" и т.д.
// const addPlacePopup = new PopupWithForm(".popup_type_new-place", (formData) => {
//   handleSubmitAddPlace(formData);
// });

addPlacePopup.setEventListeners();

addPlaceButton.addEventListener("click", (evt) => {
  formValidators["add-place-form"].resetValidation();
  addPlacePopup.open();
});

const zoomPopup = new PopupWithImage(".popup_type_zoom-image");

zoomPopup.setEventListeners();

const formValidators = {}; // создаю константу с пустысм объектом.

// 🧢 описываю функцию валитатор
const enableValidation = (validationConfig) => {
  // Собираю массив форм (массив кусков разметки, а не имён)
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation(); // вызов метода класса, а не рекурсия
  });
};

enableValidation(validationConfig); // вызов функции

// 🧢 👨‍💼 колбэк кнопки редактирования аватара - откроет попап
function editAvatar() {
  formValidators["avatar-form"].resetValidation();
  popupAvatar.open();
}

// слушатель на аватар
editAvatarBtn.addEventListener("click", () => editAvatar());

// 🧢 👨‍💼 колбэк сабмита аватара
function handleAvatarEdit(inputValue) {
  // создаю функцию, она возвращает промис, т.к. любой запрос возвращает его
  function makeRequest() {
    // `return` позволяет продолжать цепочку `then, catch, finally`
    return api.avatarEdit(inputValue).then((newAvatarLink) => {
      myUserInfo.setUserInfo(newAvatarLink);
    });
  }
  // вызываю универ. функцию, передавая ей запрос, экземпляр попапа и лейбл кнопки (если нужен не `"Сохранение..."`)
  handleSubmit(makeRequest, popupAvatar);
}

// старая функция, заменил на ревьюверскую
// // 🧢 👨‍💼 колбэк сабмита аватара
// function handleAvatarEdit(inputValue) {
//   console.log("launched avatar handler. It's values: ");
//   console.log(inputValue);
//   return api
//     .avatarEdit(inputValue)
//     .then((newAvatarLink) => {
//       console.log("ответ на апдейт авы с апи: ", newAvatarLink);
//       myUserInfo.setUserInfo(newAvatarLink);
//       popupAvatar.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// popup AVATAR URL
const popupAvatar = new PopupWithForm(".popup_type_avatar", (inputValue) => {
  handleAvatarEdit(inputValue);
});

popupAvatar.setEventListeners();

// test git 2023-07-27 at 14:27

import {
  // initialCards,
  validationConfig,
  popupUser,
  addPlaceButton,
  editProfileBtn,
  likeNumber,
  editAvatarBtn,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

import "./index.css"; // импорт главного файла стилей. Такая запись только для вебпака

// 🧢  функция открытия попапа ЗУМа - функция зумирования
const handleCardClick = (cardData) => zoomPopup.open(cardData);
//
//
//// 🧢 колбек по конфирму (сабмит попапа с подтверждением).
// Отдаю его при создании карточки классу Card.
function handleDelete(card) {
  confirmPopup.open(() => {
    api
      .delete(card._cardData._id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка удаления: ${res.status}`);
      })
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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "200161f1-5909-4319-b9ce-fec02ac5663d",
    "Content-Type": "application/json",
  },
});

function handleLike(cardInstance) {
  if (cardInstance.isLiked) {
    api.removeLike(cardInstance._cardData).then((cardData) => {
      cardInstance._likesElement.textContent = cardData.likes.length;
      cardInstance._likeButton.classList.toggle("gallery__like_active");
    });
  } else {
    api.addLike(cardInstance._cardData).then((cardData) => {
      cardInstance._likesElement.textContent = cardData.likes.length;
      cardInstance._likeButton.classList.toggle("gallery__like_active");
    });
  }
}

let userID = "";

// 🧢 Функция-колбэк добавления карточи. Декларация. НЕ вызов. Используется форычом.
const renderCard = (data) => {
  // в var тащу результат работы функции = разметку, а НЕ объект
  const cardToAdd = new Card(
    data,
    "#card",
    handleCardClick,
    handleDelete,
    handleLike,
    myUserInfo.data._id
  ).getCard();

  cardSection.addItem(cardToAdd);
};

// ПОЛУЧАЮ ИЗНАЧАЛЬНЫЕ КАРТОЧКИ
const cardSection = new Section(renderCard, ".gallery");

const promiseInitialUserInfo = api.setInitialUserInfo();
const promiseInitialCards = api.getInitialCards();

Promise.all([promiseInitialUserInfo, promiseInitialCards])
  .then(([responseInitialUserInfo, responseInitialCards]) => {
    // userID - переменная в глобальном скоупе.
    // Ее отдаю классу Card для сличения айдишников
    userID = responseInitialUserInfo._id;
    // console.log(responseInitialUserInfo);
    // console.log("filled userID in promise ", userID);

    // const userData = {};
    // userData.name = responseInitialUserInfo.name;
    // userData.about = responseInitialUserInfo.about;
    // userData.id = responseInitialUserInfo._id;
    // userData.avatar = responseInitialUserInfo.avatar;
    myUserInfo.setUserInfo(responseInitialUserInfo);

    // myUserInfo._name = "";
    // myUserInfo._name = "";
    // myUserInfo.data = responseInitialUserInfo;

    // console.log(responseInitialCards);
    // console.log("%c myUserInfo ", "background: darkblue", myUserInfo);
    // console.log("%c user_id ", " color: lime", myUserInfo.data._id);

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
});

// 🧢 описываю функцию-колбэк сабмита профиля заранее
const handleSubmitProfile = ({ name, about }) => {
  // 3. Редактирование профиля - данные идут на сервер.
  api
    .editProfile(name, about)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка сабмита: ${res.status}`);
    })
    .then((data) => {
      console.log("дата патча профиля: ", data);
      myUserInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });
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

// 🧢 👨‍💼 колбэк кнопки редактирования профиля - откроет попап
const editProfile = () => {
  formValidators["profile-form"].resetValidation();
  // Наполняю поля формы данными со страницы через метод класса UserInf

  // деструктуризация. Переменные не покинут пределы слушателя
  const { name, about } = myUserInfo.getUserInfo();

  popupUser.nameInput.value = name;
  popupUser.aboutInput.value = about;

  popupProfile.open();
};

// 👨‍💼
editProfileBtn.addEventListener("click", () => editProfile());

// 🧢 колбэк слушателя сабмита карточки
const handleSubmitAddPlace = (formData) => {
  formValidators["add-place-form"].resetValidation();
  api
    .addCard({ name: formData.placeName, link: formData.placeUrl })
    .then((res) => {
      if (res) {
        return res.json();
      }
      return Promise.reject(`Ошибка создания карточки: ${res.status}`);
    })
    .then((cardDataFromApi) => {
      console.log("cardDataFromApi ", cardDataFromApi);
      const card1by1 = new Card(
        cardDataFromApi,
        "#card",
        handleCardClick,
        handleDelete,
        handleLike,
        myUserInfo.data._id
      );
      cardSection.addItem(card1by1.getCard());
      addPlacePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

const addPlacePopup = new PopupWithForm(".popup_type_new-place", (formData) => {
  handleSubmitAddPlace(formData);
});

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

//
//

// 🔴🔴🔴🔴🔴🔴🔴🔴🔴

// 🧢 описываю функцию-колбэк сабмита профиля заранее
// const handleSubmitProfile = ({ name, about }) => {
//   // 3. Редактирование профиля - данные идут на сервер.
//   api
//     .editProfile(name, about)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка сабмита: ${res.status}`);
//     })
//     .then((data) => {
//       console.log("дата патча профиля: ", data);
//       myUserInfo.setUserInfo(data);
//       popupProfile.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// 🧢 👨‍💼 колбэк кнопки редактирования аватара - откроет попап
function editAvatar() {
  formValidators["avatar-form"].resetValidation();
  popupAvatar.open();
}

// вешаю слушатель на аватар
editAvatarBtn.addEventListener("click", () => editAvatar());

// 🧢 👨‍💼 колбэк сабмита аватара
function handleAvatarEdit(inputValue) {
  api
    .avatarEdit(inputValue)
    .then((newAvatarLink) => {
      console.log("ответ на апдейт авы с апи: ", newAvatarLink);
    })
    .catch((err) => {
      console.log(err);
    });
  // это уйдет в then
  // myUserInfo.setUserInfo(newAvatarLink);
}

// popup AVATAR URL
const popupAvatar = new PopupWithForm(".popup_type_avatar", handleAvatarEdit);
popupAvatar.setEventListeners();

// index.js;
// Можно лучше
// Если интересно, посмотрите, как можно избавиться от дублирования изменения текста кнопки сабмита,
// отлова ошибок и закрытия попапа в каждом запросе:

/*

можно сделать универсальную функцию, которая принимает:
- функцию запроса,
- экземпляр попапа
- и текст во время загрузки (опционально)

*/

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  //
  // изменяем текст кнопки до вызова запроса
  popupInstance.renderLoading(true, loadingText);

  request()
    .then(() => {
      // закрывать попап нужно только в `then`
      popupInstance.close();
    })
    .catch((err) => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// пример оптимизации обработчика сабмита формы профиля
function handleProfileFormSubmit(inputValues) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.editProfile(inputValues).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, profilePopup);
}

// написана на строке 139 где catch
// 🧢 описываю функцию-колбэк сабмита профиля заранее
// const handleSubmitProfile = ({ name, about }) => {
//   // Редактирование профиля - данные идут на сервер.
//   return api
//     .editProfile(name, about)
//     .then((data) => {
//       myUserInfo.setUserInfo(data);
//       popupProfile.close();
//     })
//     .catch((err) => {

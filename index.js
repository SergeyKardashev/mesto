const profileEditBtn = document.querySelector(".profile__edit-btn");

const popupProfileEdit = document.querySelector(".popup_profile-edit");

profileEditBtn.addEventListener("click", function () {
  popupProfileEdit.classList.add("popup_open");
});

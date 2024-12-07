import "../pages/index.css";
import * as card from "../scripts/card.js";
import * as modal from "../scripts/modal.js";
import * as validation from "../scripts/validation.js";
import * as api from "../scripts/api.js";

// ------------------------------------------- constants -----------------------------------------

const cardTemplate = document.querySelector("#card-template").content;
const cardLists = document.querySelector(".places__list");

const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileLogoButton = document.querySelector(".profile__image");
const logoEditPopup = document.querySelector(".popup_type_edit-avatar");
const logoInput = document.querySelector(".popup__input_type_avatar-url");

const popupTypeImage = document.querySelector(".popup_type_image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const formElementCard = newCardPopup.querySelector(".popup__form");
const formElementProfile = profileEditPopup.querySelector(".popup__form");
const formElementLogo = logoEditPopup.querySelector(".popup__form");

// Переменная, хранящая обьект профиля
let profileData;

// ------------------------------------------- functions -----------------------------------------

function closeByButtonValidationPopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  const form = openedPopup.querySelector(
    validation.validationConfig.formSelector
  );
  validation.clearValidation(form, validation.validationConfig);
  modal.closeModal();
  const popupClose = openedPopup.querySelector(".popup__close");

  popupClose.removeEventListener("click", closeByButtonValidationPopup);

  document.removeEventListener("keydown", closeByEscapeValidationPopup);

  openedPopup.removeEventListener("click", closeByOverlayValidationPopup);
}
function closeByButtonPopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  modal.closeModal();
  const popupClose = openedPopup.querySelector(".popup__close");

  popupClose.removeEventListener("click", closeByButtonPopup);

  document.removeEventListener("keydown", closeByEscapePopup);

  openedPopup.removeEventListener("click", closeByOverlayPopup);
}

function closeByEscapeValidationPopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    const form = openedPopup.querySelector(
      validation.validationConfig.formSelector
    );
    validation.clearValidation(form, validation.validationConfig);
    modal.closeModal();
    const popupClose = openedPopup.querySelector(".popup__close");

    popupClose.removeEventListener("click", closeByButtonValidationPopup);

    document.removeEventListener("keydown", closeByEscapeValidationPopup);

    openedPopup.removeEventListener("click", closeByOverlayValidationPopup);
  }
}

function closeByEscapePopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    modal.closeModal();
    const popupClose = openedPopup.querySelector(".popup__close");

    popupClose.removeEventListener("click", closeByButtonPopup);

    document.removeEventListener("keydown", closeByEscapePopup);

    openedPopup.removeEventListener("click", closeByOverlayPopup);
  }
}

function closeByOverlayValidationPopup(evt) {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector(".popup_is-opened");
    const form = openedPopup.querySelector(
      validation.validationConfig.formSelector
    );
    validation.clearValidation(form, validation.validationConfig);
    modal.closeModal();

    const popupClose = openedPopup.querySelector(".popup__close");

    popupClose.removeEventListener("click", closeByButtonValidationPopup);

    document.removeEventListener("keydown", closeByEscapeValidationPopup);

    openedPopup.removeEventListener("click", closeByOverlayValidationPopup);
  }
}

function closeByOverlayPopup(evt) {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector(".popup_is-opened");
    modal.closeModal();
    const popupClose = openedPopup.querySelector(".popup__close");

    popupClose.removeEventListener("click", closeByButtonPopup);

    document.removeEventListener("keydown", closeByEscapePopup);

    openedPopup.removeEventListener("click", closeByOverlayPopup);
  }
}

function animateModal(popupObject) {
  popupObject.classList.add("popup_is-animated");
}

function showImagePopup(element) {
  modal.openModal(popupTypeImage);

  const popupClose = popupTypeImage.querySelector(".popup__close");

  popupClose.addEventListener("click", closeByButtonPopup);

  document.addEventListener("keydown", closeByEscapePopup);

  popupTypeImage.addEventListener("click", closeByOverlayPopup);

  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupCaption.textContent = element.name;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = profileEditPopup.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  const profileDataLocal = { name: nameInput.value, about: jobInput.value };
  api.patchUserProfile(profileDataLocal).then((data) => {
    modal.closeModal(profileEditPopup);
    const form = newCardPopup.querySelector(
      validation.validationConfig.formSelector
    );
    validation.clearValidation(form, validation.validationConfig);
    profileData = data;
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    submitButton.textContent = "Сохранить";
  });
}

function handleLogoFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = logoEditPopup.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  const avatarLocal = logoInput.value;
  api.patchUserAvatar(avatarLocal).then((data) => {
    modal.closeModal(logoEditPopup);
    const form = logoEditPopup.querySelector(
      validation.validationConfig.formSelector
    );

    validation.clearValidation(form, validation.validationConfig);
    profileData = data;
    console.log(data);
    profileLogoButton.style.backgroundImage = "url(" + data.avatar + ")";
    submitButton.textContent = "Сохранить";
  });
}

function handleCardFormSubmit(evt) {
  const submitButton = newCardPopup.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  api.postCard(createNewCard(evt, newCardPopup)).then((cardData) => {
    cardLists.insertBefore(
      card.createCard(
        cardData,
        profileData,
        cardTemplate,
        card.likeCard,
        card.deleteCard,
        showImagePopup
      ),
      cardLists.firstChild
    );
    submitButton.textContent = "Сохранить";
    modal.closeModal(newCardPopup);
    const form = newCardPopup.querySelector(
      validation.validationConfig.formSelector
    );
    validation.clearValidation(form, validation.validationConfig);
  });
}

function createNewCard(evt, popupObject) {
  const popupCardName = popupObject.querySelector(
    ".popup__input_type_card-name"
  );
  const popupCardUrl = popupObject.querySelector(".popup__input_type_url");
  evt.preventDefault();

  const element = {
    name: popupCardName.value,
    link: popupCardUrl.value,
  };

  evt.target.reset();

  return element;
}

// --------------------------------------- main ------------------------------------------------

animateModal(newCardPopup);
animateModal(profileEditPopup);
animateModal(popupTypeImage);
animateModal(logoEditPopup);

Promise.all([api.getUserProfile(), api.getCards()]).then((data) => {
  validation.enableValidation(validation.validationConfig);

  // 1. update lending info
  profileData = data[0];
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileLogoButton.style.backgroundImage = "url(" + profileData.avatar + ")";

  data[1].forEach((element) => {
    cardLists.append(
      card.createCard(
        element,
        profileData,
        cardTemplate,
        card.likeCard,
        card.deleteCard,
        showImagePopup
      )
    );
  });
  // 2. Add event lstener
  formElementCard.addEventListener("submit", handleCardFormSubmit);
  formElementProfile.addEventListener("submit", handleProfileFormSubmit);
  formElementLogo.addEventListener("submit", handleLogoFormSubmit);

  profileAddButton.addEventListener("click", () => {
    modal.openModal(newCardPopup);
    const popupClose = newCardPopup.querySelector(".popup__close");

    popupClose.addEventListener("click", closeByButtonValidationPopup);

    document.addEventListener("keydown", closeByEscapeValidationPopup);

    newCardPopup.addEventListener("click", closeByOverlayValidationPopup);
  });

  profileEditButton.addEventListener("click", () => {
    nameInput.value = profileData.name;
    jobInput.value = profileData.about;
    modal.openModal(profileEditPopup);
    const popupClose = profileEditPopup.querySelector(".popup__close");

    popupClose.addEventListener("click", closeByButtonValidationPopup);

    document.addEventListener("keydown", closeByEscapeValidationPopup);

    profileEditPopup.addEventListener("click", closeByOverlayValidationPopup);
  });
  profileLogoButton.addEventListener("click", () => {
    logoInput.value = profileData.avatar;
    modal.openModal(logoEditPopup);
    const popupClose = logoEditPopup.querySelector(".popup__close");

    popupClose.addEventListener("click", closeByButtonValidationPopup);

    document.addEventListener("keydown", closeByEscapeValidationPopup);

    logoEditPopup.addEventListener("click", closeByOverlayValidationPopup);
  });
});

// cardAddButton.addEventListener("click", () => {
//   const validationConfig = {
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__button_disabled",
//     inputErrorClass: "form__input_type_error",
//     errorClass: "form__input-error_active",
//   };
//   validation.enableValidation(validationConfig);
//   modal.openModal(newCardPopup);
// });

// profileEditButton.addEventListener("click", () => {
//   validation.enableValidation({
//     formSelector: ".popup_type_edit",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__button_disabled",
//     inputErrorClass: "form__input_type_error",
//     errorClass: "form__input-error_active",
//   });
//   modal.openModal(popupEditProfile);
// });

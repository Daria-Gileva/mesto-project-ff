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
const profileLogo = document.querySelector(".profile__image");

const popupTypeImage = document.querySelector(".popup_type_image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const formElementCard = newCardPopup.querySelector(".popup__form");
const formElementProfile = profileEditPopup.querySelector(".popup__form");

// Переменная, хранящая обьект профиля
let profileData;

// ------------------------------------------- functions -----------------------------------------

function animateModal(popupObject) {
  popupObject.classList.add("popup_is-animated");
}

function showImagePopup(element) {
  modal.openModal(popupTypeImage);
  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupCaption.textContent = element.name;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

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
  });
}

function handleCardFormSubmit(evt) {
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
    modal.closeModal(newCardPopup);
    const form = newCardPopup.querySelector(
      validation.validationConfig.formSelector
    );
    validation.clearValidation(form, validation.validationConfig);
  });
}

function createNewCard(evt, popupObject) {
  console.log(popupObject);
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

Promise.all([api.getUserProfile(), api.getCards()]).then((data) => {
  // 1. update lending info
  profileData = data[0];
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileLogo.src = profileData.avatar;

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
  profileAddButton.addEventListener("click", () => {
    modal.openModal(newCardPopup);
  });
  profileEditButton.addEventListener("click", () => {
    document.querySelector(".popup__input_type_name").placeholder =
      profileTitle.textContent;
    document.querySelector(".popup__input_type_description").placeholder =
      profileDescription.textContent;
    modal.openModal(profileEditPopup);
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

validation.enableValidation(validation.validationConfig);

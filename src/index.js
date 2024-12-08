import "../pages/index.css";
import * as card from "../scripts/card.js";
import * as modal from "../scripts/modal.js";
import * as validation from "../scripts/validation.js";
import * as api from "../scripts/api.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

let profileData;

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
  const submitButton = profileEditPopup.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  const profileDataLocal = { name: nameInput.value, about: jobInput.value };
  api
    .patchUserProfile(profileDataLocal)
    .then((data) => {
      modal.closeModal(profileEditPopup);
      const form = newCardPopup.querySelector(validationConfig.formSelector);
      validation.clearValidation(form, validationConfig);
      profileData = data;
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

function handleLogoFormSubmit(evt) {
  evt.preventDefault();
  const form = logoEditPopup.querySelector(validationConfig.formSelector);
  const submitButton = logoEditPopup.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  const avatarLocal = logoInput.value;

  api
    .patchUserAvatar(avatarLocal)
    .then((data) => {
      profileData = data;
      profileLogoButton.style.backgroundImage = "url(" + data.avatar + ")";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      modal.closeModal(logoEditPopup);
      validation.clearValidation(form, validationConfig);
      submitButton.textContent = "Сохранить";
    });
}

function handleCardFormSubmit(evt) {
  const submitButton = newCardPopup.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  const form = newCardPopup.querySelector(validationConfig.formSelector);
  api
    .postCard(createNewCard(evt, newCardPopup))
    .then((cardData) => {
      cardList.insertBefore(
        card.createCard(
          cardData,
          profileData,
          cardTemplate,
          card.likeCard,
          card.deleteCard,
          showImagePopup
        ),
        cardList.firstChild
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      modal.closeModal(newCardPopup);
      validation.clearValidation(form, validationConfig);
      submitButton.textContent = "Сохранить";
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

animateModal(newCardPopup);
animateModal(profileEditPopup);
animateModal(popupTypeImage);
animateModal(logoEditPopup);

Promise.all([api.getUserProfile(), api.getCards()]).then((data) => {
  validation.enableValidation(validationConfig);
  const [profileDataLocal, cardListLocal] = data;
  // 1. update lending info
  profileData = profileDataLocal;
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileLogoButton.style.backgroundImage = "url(" + profileData.avatar + ")";

  cardListLocal.forEach((element) => {
    cardList.append(
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
    const form = newCardPopup.querySelector(validationConfig.formSelector);
    validation.clearValidation(form, validationConfig);
    modal.openModal(newCardPopup);
  });

  profileEditButton.addEventListener("click", () => {
    nameInput.value = profileData.name;
    jobInput.value = profileData.about;
    const form = profileEditPopup.querySelector(validationConfig.formSelector);
    validation.clearValidation(form, validationConfig);
    modal.openModal(profileEditPopup);
  });
  profileLogoButton.addEventListener("click", () => {
    logoInput.value = profileData.avatar;
    const form = logoEditPopup.querySelector(validationConfig.formSelector);
    validation.clearValidation(form, validationConfig);
    modal.openModal(logoEditPopup);
  });
});

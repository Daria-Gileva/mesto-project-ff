import "../pages/index.css";
import * as cards from "../scripts/cards.js";
import * as modal from "../scripts/modal.js";

const addIconImage = new URL("../images/add-icon.svg", import.meta.url);
const avatarImage = new URL("../images/avatar.jpg", import.meta.url);
const cardFirstImage = new URL("../images/card_1.jpg", import.meta.url);
const cardSecondImage = new URL("../images/card_2.jpg", import.meta.url);
const cardThirdImage = new URL("../images/card_3.jpg", import.meta.url);
const closeImage = new URL("../images/close.svg", import.meta.url);
const deleteIconImage = new URL("../images/delete-icon.svg", import.meta.url);
const editIconImage = new URL("../images/edit-icon.svg", import.meta.url);
const likeActivImage = new URL("../images/like-active.svg", import.meta.url);
const likeInActivImage = new URL(
  "../images/like-inactive.svg",
  import.meta.url
);
const logoImage = new URL("../images/logo.svg", import.meta.url);

const whoIsTheGoat = [
  { name: "add-icon", link: addIconImage },
  { name: "avatar", link: avatarImage },
  { name: "card_1", link: cardFirstImage },
  { name: "card_2", link: cardSecondImage },
  { name: "card_3", link: cardThirdImage },
  { name: "close", link: closeImage },
  { name: "delete-icon", link: deleteIconImage },
  { name: "edit-icon", link: editIconImage },
  { name: "like-active", link: likeActivImage },
  { name: "like-inactive", link: likeInActivImage },
  { name: "logo", link: logoImage },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardLists = document.querySelector(".places__list");

const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");

const popupTypeImage = document.querySelector(".popup_type_image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

document.querySelector('[placeholder="Имя"]').placeholder =
  profileTitle.textContent;
document.querySelector('[placeholder="Занятие"]').placeholder =
  profileDescription.textContent;

function animateModal(popupObject) {
  popupObject.classList.add("popup_is-animated");
}

animateModal(newCardPopup);
animateModal(popupEditProfile);
animateModal(popupTypeImage);

cards.initialCards.forEach((element) => {
  cardLists.append(
    cards.createCard(
      element,
      cardTemplate,
      cards.likeCard,
      cards.deleteCard,
      showImagePopup
    )
  );
});

function showImagePopup(element) {
  const popupImage = popupTypeImage.querySelector(".popup__image");
  const popupCaption = popupTypeImage.querySelector(".popup__caption");

  modal.openModal(popupTypeImage);
  popupImage.src = element.link;
  popupCaption.textContent = element.name;
}

profileAddButton.addEventListener("click", () => {
  modal.openModal(newCardPopup);
  const formElement = newCardPopup.querySelector(".popup__form");
  formElement.addEventListener("submit", cardFormSubmit);
});

profileEditButton.addEventListener("click", () => {
  modal.openModal(popupEditProfile);

  const formElement = popupEditProfile.querySelector(".popup__form");
  formElement.addEventListener("submit", profileFormSubmit);
});

function profileFormSubmit(evt) {
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  modal.closeModal(popupEditProfile);
  popupEditProfile.removeEventListener("submit", profileFormSubmit);
}

function cardFormSubmit(evt) {
  cardLists.insertBefore(
    cards.createCard(
      modal.createNewCard(evt, newCardPopup),
      cardTemplate,
      cards.likeCard,
      cards.deleteCard
    ),
    cardLists.firstChild
  );
  modal.closeModal(newCardPopup);
  newCardPopup.removeEventListener("submit", cardFormSubmit);
}

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCard(
  element,
  cardTemplate,
  likeCard,
  deleteCard,
  showImagePopup
) {
  const cardCopy = cardTemplate.cloneNode(true);
  const cardItem = cardCopy.querySelector(".places__item");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardImage = cardItem.querySelector(".card__image");
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");

  cardTitle.textContent = element.name;
  cardImage.setAttribute("src", element.link);
  cardImage.setAttribute("alt", element.name);

  deleteButton.addEventListener("click", () => {
    deleteCard(cardItem);
  });
  likeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => {
    showImagePopup(element);
  });

  return cardCopy;
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function deleteCard(cardItem) {
  cardItem.remove();
}

import * as api from "./api.js";

export function createCard(
  element,
  profileData,
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
  const likeCounter = cardItem.querySelector(".card__like-counter");
  deleteButton.style.display = "none";
  const likeButton = cardItem.querySelector(".card__like-button");

  if (element.owner._id == profileData._id) {
    deleteButton.style.display = "flex";
    deleteButton.addEventListener("click", () => {
      deleteCard(cardItem, element._id);
    });
  }

  element.likes.forEach((element) => {
    if (element._id == profileData._id) {
      likeButton.classList.add("card__like-button_is-active");
      return;
    }
  });
  likeCounter.textContent = element.likes.length;

  cardTitle.textContent = element.name;
  cardImage.setAttribute("src", element.link);
  cardImage.setAttribute("alt", element.name);

  likeButton.addEventListener("click", (event) => {
    likeCard(event, likeCounter, element._id);
  });

  cardImage.addEventListener("click", () => {
    showImagePopup(element);
  });

  return cardCopy;
}

export function likeCard(event, likeCounter, _id) {
  let isLiked = event.target.classList.contains("card__like-button_is-active");

  if (isLiked) {
    api
      .dislikeCard(_id)
      .then((data) => {
        event.target.classList.remove("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likeCard(_id)
      .then((data) => {
        event.target.classList.add("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteCard(cardItem, id) {
  api
    .deleteCard(id)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

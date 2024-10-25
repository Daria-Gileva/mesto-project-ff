// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const cardItem = cardTemplate.querySelector(".places__item");

// @todo: Функция создания карточки
function createCard(element) {
  const cardCopy = cardTemplate.cloneNode(true);
  const cardItem = cardCopy.querySelector(".places__item");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardImage = cardItem.querySelector(".card__image");
  const deleteButton = cardItem.querySelector(".card__delete-button");

  cardTitle.textContent = element.name;
  cardImage.setAttribute("src", element.link);
  cardImage.setAttribute("alt", element.name);

  // @todo: Функция удаления карточки
  deleteButton.addEventListener("click", function () {
    cardItem.remove();
  });

  cardList.append(cardCopy);
}

initialCards.forEach(createCard);

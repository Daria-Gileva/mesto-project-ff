export function showPopup(popupObject) {
  const popupClose = popupObject.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    popupObject.classList.remove("popup_is-opened");
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      popupObject.classList.remove("popup_is-opened");
    }
  });
  popupObject.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      popupObject.classList.remove("popup_is-opened");
    }
  });
  formElement.addEventListener("submit", (evt) => {
    profileFormSubmit(evt, popupObject);
  });
}

export function openModal(popupObject) {
  popupObject.classList.add("popup_is-opened");

  const popupClose = popupObject.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    closeModal(popupObject);
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(popupObject);
    }
  });
  popupObject.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closeModal(popupObject);
    }
  });
}

export function closeModal(popupObject) {
  popupObject.classList.remove("popup_is-opened");
}

export function createNewCard(evt, popupObject) {
  const popupCardName = popupObject.querySelector(
    ".popup__input_type_card-name"
  );
  const popupCardUrl = popupObject.querySelector(".popup__input_type_url");
  evt.preventDefault();

  return {
    name: popupCardName.value,
    link: popupCardUrl.value,
  };
}

export function openModal(popupObject) {
  popupObject.classList.add("popup_is-opened");

  const popupClose = popupObject.querySelector(".popup__close");

  popupClose.addEventListener("click", closeByButtonPopup);

  document.addEventListener("keydown", closeByEscapePopup);

  popupObject.addEventListener("click", closeByOverlayPopup);
}

export function closeModal(popupObject) {
  popupObject.classList.remove("popup_is-opened");
  const popupClose = popupObject.querySelector(".popup__close");

  popupClose.removeEventListener("click", closeByButtonPopup);

  document.removeEventListener("keydown", closeByEscapePopup);

  popupObject.removeEventListener("click", closeByOverlayPopup);
}

function closeByEscapePopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function closeByOverlayPopup(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
}

function closeByButtonPopup(evt) {
  closeModal(evt.target.closest(".popup"));
}

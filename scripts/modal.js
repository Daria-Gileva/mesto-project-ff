export function openModal(popupObject) {
  popupObject.classList.add("popup_is-opened");

  const popupClose = popupObject.querySelector(".popup__close");

  popupClose.addEventListener("click", closeByButtonPopup);

  document.addEventListener("keydown", closeByEscapePopup);

  popupObject.addEventListener("click", closeByOverlayPopup);
}

export function closeModal() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
  const popupClose = openedPopup.querySelector(".popup__close");

  popupClose.removeEventListener("click", closeByButtonPopup);

  document.removeEventListener("keydown", closeByEscapePopup);

  openedPopup.removeEventListener("click", closeByOverlayPopup);
}

function closeByEscapePopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal();
    const popupClose = openedPopup.querySelector(".popup__close");

    popupClose.removeEventListener("click", closeByButtonPopup);

    document.removeEventListener("keydown", closeByEscapePopup);

    openedPopup.removeEventListener("click", closeByOverlayPopup);
  }
}

function closeByOverlayPopup(evt) {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal();
    const popupClose = openedPopup.querySelector(".popup__close");

    popupClose.removeEventListener("click", closeByButtonPopup);

    document.removeEventListener("keydown", closeByEscapePopup);

    openedPopup.removeEventListener("click", closeByOverlayPopup);
  }
}

function closeByButtonPopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal();
  const popupClose = openedPopup.querySelector(".popup__close");

  popupClose.removeEventListener("click", closeByButtonPopup);

  document.removeEventListener("keydown", closeByEscapePopup);

  openedPopup.removeEventListener("click", closeByOverlayPopup);
}

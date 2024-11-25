export function openModal(popupObject) {
  popupObject.classList.add("popup_is-opened");

  const popupClose = popupObject.querySelector(".popup__close");

  popupClose.addEventListener("click", closeByButton);

  document.addEventListener("keydown", closeByEscape);

  popupObject.addEventListener("click", closeByOverlay);
}

export function closeModal() {
  const openedPopup = document.querySelector(".popup_is-opened");
  const popupClose = openedPopup.querySelector(".popup__close");

  openedPopup.classList.remove("popup_is-opened");

  popupClose.removeEventListener("click", closeByButton);

  document.removeEventListener("keydown", closeByEscape);

  openedPopup.removeEventListener("click", closeByOverlay);
}

function closeByButton(evt) {
  closeModal();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

function closeByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal();
  }
}

import { clearValidation, validationConfig } from "./validation";

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
  const openedPopup = document.querySelector(".popup_is-opened");
  const form = openedPopup.querySelector(validationConfig.formSelector);
  clearValidation(form, validationConfig);
  closeModal();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    const form = openedPopup.querySelector(validationConfig.formSelector);
    clearValidation(form, validationConfig);
    closeModal();
  }
}

function closeByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector(".popup_is-opened");
    const form = openedPopup.querySelector(validationConfig.formSelector);
    clearValidation(form, validationConfig);
    closeModal();
  }
}

export function openModal(popupObject) {
  popupObject.classList.add("popup_is-opened");
}

export function closeModal() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
}

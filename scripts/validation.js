const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    let validErrStr;
    if (inputElement.validity.patternMismatch) {
      validErrStr = inputElement.dataset.errorMessage
        ? inputElement.dataset.errorMessage
        : inputElement.validationMessage;
    } else {
      validErrStr = inputElement.validationMessage;
    }
    showInputError(formElement, inputElement, validErrStr, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

export const toggleButtonState = (
  inputList,
  buttonElement,
  validationConfig
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

export const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formPopups = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formPopups.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
};

export const clearValidation = (form, validationConfig) => {
  const inputForms = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  console.log(form);

  const elementForms = Array.from(
    form.querySelectorAll("." + validationConfig.errorClass)
  );
  console.log(elementForms, validationConfig.errorClass);
  inputForms.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    inputElement.value = "";
  });
  elementForms.forEach((errorElement) => {
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  });

  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );
  submitButton.classList.add("popup__button_disabled");
};

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

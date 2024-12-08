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
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
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
    setEventListeners(form, validationConfig);
  });
};

export const clearValidation = (form, validationConfig) => {
  const inputForms = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );

  inputForms.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig);
    inputElement.value = "";
  });
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputForms, submitButton, validationConfig);
};

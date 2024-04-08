import { isEscapeKey } from './util';
const body = document.querySelector('body');
const dataError = document.querySelector('#data-error').content;
const ERROR_TEXT_SHOW_TIME = 5000;

const formPicture = document.querySelector('.img-upload__form');
const buttonSubmit = formPicture.querySelector('.img-upload__submit');
const successMessage = body.querySelector('#success').content;
const errorMessage = body.querySelector('#error').content;

//Пoказывает сообщение ошибки при загрузки с сервера
const showErrorMessage = (message) => {
  const dataErrorTemplate = dataError.cloneNode(true);

  if(message) {
    dataErrorTemplate.querySelector('.data-error__title').textContent = message;
  }
  body.append(dataErrorTemplate);

  const errorDataTemplate = body.querySelector('.data-error');

  setTimeout(() => {
    errorDataTemplate.remove();
  }, ERROR_TEXT_SHOW_TIME);
};

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const disabledButtonSubmit = (text) => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = text;
};

const enableButtonSubmit = (text) => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = text;
};

body.appendChild(successMessage);
const messageOfSuccess = body.querySelector('.success');
messageOfSuccess.classList.add('hidden');
const successInner = messageOfSuccess.querySelector('.success__inner');
const successButton = successInner.querySelector('.success__button');

body.appendChild(errorMessage);
const messageOfError = body.querySelector('.error');
messageOfError.classList.add('hidden');
const errorInner = messageOfError.querySelector('.error__inner');
const errorButton = errorInner.querySelector('.error__button');

const closeSuccessfulByClick = (evt) => {
  if (messageOfSuccess === evt.target) {
    messageOfSuccess.classList.add('hidden');
  }
};

const closeErrorByClick = function (evt) {
  if (messageOfError === evt.target) {
    messageOfError.classList.add('hidden');
    removeErrorListeners();
  }
};

const closeSuccessfulByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    messageOfSuccess.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    messageOfError.classList.add('hidden');
    removeErrorListeners();
  }
};

const bySuccessButton = () => {
  messageOfSuccess.classList.add('hidden');
  removeSuccessListeners();
};

const byErrorButton = () => {
  messageOfError.classList.add('hidden');
  removeErrorListeners();
};

const handleSuccessMessage = function () {
  document.addEventListener('click', closeSuccessfulByClick);
  document.addEventListener('keydown', closeSuccessfulByKeydown);
  successButton.addEventListener('click', bySuccessButton);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeSuccessfulByClick);
  document.removeEventListener('keydown', closeSuccessfulByKeydown);
  successButton.removeEventListener('click', bySuccessButton);
}

const handleErrorMessage = function () {
  document.addEventListener('click', closeErrorByClick);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorButton.addEventListener('click', byErrorButton);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeErrorByClick);
  document.removeEventListener('keydown', closeErrorByKeydown);
  errorButton.removeEventListener('click', byErrorButton);
}


export {showErrorMessage, disabledButtonSubmit, enableButtonSubmit, submitButtonText, handleErrorMessage, handleSuccessMessage, messageOfError, messageOfSuccess};



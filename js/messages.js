import { isEscapeKey } from './util';
const body = document.querySelector('body');
const dataError = document.querySelector('#data-error').content;
const ERROR_TEXT_SHOW_TIME = 5000;

const formPicture = document.querySelector('.img-upload__form');
const buttonSubmit = formPicture.querySelector('.img-upload__submit');
const imgUpploadOverlay = formPicture.querySelector('.img-upload__overlay');

const successMessage = body.querySelector('#success').content.querySelector('section');
const errorMessage = body.querySelector('#error').content.querySelector('section');

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

const enabledButtonSubmit = (text) => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = text;
};

const messageOfSuccess = successMessage.cloneNode(true);
const successInner = messageOfSuccess.querySelector('.success__inner');
const successButton = messageOfSuccess.querySelector('.success__button');


const messageOfError = errorMessage.cloneNode(true);
const errorInner = messageOfError.querySelector('.error__inner');
const errorButton = messageOfError.querySelector('.error__button');

const addErrorMessage = () => {
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorByKey);
  document.addEventListener('click', clickOutsideErrorMessage);
  document.body.appendChild(messageOfError);
};

function closeErrorMessage () {
  messageOfError.remove();
  document.removeEventListener('keydown', closeErrorByKey);
  document.removeEventListener('click', clickOutsideErrorMessage);
}

function closeErrorByKey(evt){
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeErrorMessage();
    imgUpploadOverlay.classList.remove('hidden');
  }
}

function clickOutsideErrorMessage (part) {
  const outsideErrorMessage = part.composedPath().includes(errorInner);
  if(!outsideErrorMessage) {
    messageOfError.remove();
  }
}

const addSuccessMessage = () => {
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessByKey);
  document.addEventListener('click', clickOutsideSuccessMessage);

  document.body.appendChild(messageOfSuccess);
};

function closeSuccessMessage () {
  messageOfSuccess.remove();
  document.removeEventListener('keydown', closeSuccessByKey);
  document.removeEventListener('click', clickOutsideSuccessMessage);
}

function closeSuccessByKey(evt){
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeSuccessMessage();
  }
}

function clickOutsideSuccessMessage (part) {
  const outsideSuccessMessage = part.composedPath().includes(successInner);
  if(!outsideSuccessMessage) {
    messageOfSuccess.remove();
  }
}

export {showErrorMessage, disabledButtonSubmit, enabledButtonSubmit, submitButtonText, addErrorMessage, addSuccessMessage};



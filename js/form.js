import {isEscapeKey} from './util.js';
import { effectChange } from './img-effects.js';
import { addScale, removeScale } from './scale.js';
import { submitForm } from './text-image.js';

const formPicture = document.querySelector('.img-upload__form');
const uploadInput = formPicture.querySelector('.img-upload__input');
const uploadOverlay = formPicture.querySelector('.img-upload__overlay');
const uploadCancel = formPicture.querySelector('.img-upload__cancel');
const hashtagInput = formPicture.querySelector('.text__hashtags');
const description = formPicture.querySelector('.text__description');
const img = formPicture.querySelector('.img-upload__preview');
const effectList = formPicture.querySelector('.effects__list');
const effectLevel = formPicture.querySelector('.img-upload__effect-level');

//Закрытие формы для загрузки фотографий
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === description) {
      evt.stopPropagation();
    } else {
      formPicture.reset();
      closeForm();
    }
  }
};

const closeFormClick = () => {
  closeForm ();
};

function closeForm () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadInput.value = '';
  img.style.filter = 'none';
  effectLevel.classList.add('hidden');

  uploadCancel.removeEventListener('click', closeFormClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  removeScale ();
}

//Открытие формы для загрузки фотографий
uploadInput.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  effectList.addEventListener('click', effectChange);
  addScale();

  uploadCancel.addEventListener('click', closeFormClick);
  document.addEventListener('keydown', onDocumentKeydown);
});


submitForm ();

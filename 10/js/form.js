import {isEscapeKey} from './util.js';
import { effectChange } from './img-effects.js';
const STEP_SCALE = 0.25;
const MAX_SYMBOL = 20;
const MAX_HASHTAGS = 5;
const formPicture = document.querySelector('.img-upload__form');
const uploadInput = formPicture.querySelector('.img-upload__input');
const uploadOverlay = formPicture.querySelector('.img-upload__overlay');
const uploadCancel = formPicture.querySelector('.img-upload__cancel');
const img = formPicture.querySelector('.img-upload__preview img');
const controlSmaller = formPicture.querySelector('.scale__control--smaller');
const controlBigger = formPicture.querySelector('.scale__control--bigger');
const controlValue = formPicture.querySelector('.scale__control--value');
const effectList = formPicture.querySelector('.effects__list');
const hashtagInput  = formPicture.querySelector('.text__hashtags');
const description = formPicture.querySelector('.text__description');
let scale = 1;

//Открытие формы для загрузки фотографий
uploadInput.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');

  uploadCancel.addEventListener('click', closeFormClick);
  document.addEventListener('keydown', onDocumentKeydown);
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};
//Закрытие формы для загрузки фотографий
const closeFormClick = () => {
  closeForm ();
}

function closeForm () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadInput.value = '';

  uploadCancel.removeEventListener('click', closeFormClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

//Изменение размера изображения
const onSmallerButton = () => {
  if (scale > STEP_SCALE) {
    scale -= STEP_SCALE;
    img.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
};

const onBiggerButton = () => {
  if (scale < 1) {
    scale += STEP_SCALE;
    img.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
};

const pristine = new Pristine(formPicture, {
  classTo: 'img-upload__field-wrapper',
  errorclass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});


pristine.addValidator(
  description, (value) => {
    const hasNumber= value.length <= 140;
    return hasNumber;
  },
  'Не более 140 символов'
)


let errorMessage = '';

const error = () => errorMessage;
const validateHashtag = (value) => {
  errorMessage = '';

  const textInputHashtags = value.toLowerCase().trim();
  const textInput = textInputHashtags.split(/\s+/);

  if(textInputHashtags === 0 ){
    return true;
  };

  const rules = [
    {
      check: textInput.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с \'#\'.',
    },
    {
      check: textInput.some((item) => item === '#'),
      error: 'Хештег должен содержать текст после \'#\'(решетки).'
    },
    {
      check: textInput.some((item) => item.length > MAX_SYMBOL),
      error: `Хештег может состоять ${MAX_SYMBOL} символов, включая решетку.`,
    },
    {
      check: textInput.some((item) => item.slice(1).includes('#')),
      error: 'Между хештегами должен быть пробел.'
    },
    {
      check: textInput.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег может состоять только из букв и чисел.'
    },
    {
      check: textInput.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не быть одинаковыми.'
    },
    {
      check: textInput.length > MAX_HASHTAGS,
      error: `Хештегов должно быть не больше ${MAX_HASHTAGS}.`
    },
  ]

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(hashtagInput,validateHashtag,error);

formPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    formPicture.submit();
  };
});

controlSmaller.addEventListener('click', onSmallerButton);
controlBigger.addEventListener('click', onBiggerButton);

effectList.addEventListener('change', effectChange);


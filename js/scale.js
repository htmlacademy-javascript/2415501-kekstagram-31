const STEP_SCALE = 0.25;

const formPicture = document.querySelector('.img-upload__form');
const img = formPicture.querySelector('.img-upload__preview img');
const controlValue = formPicture.querySelector('.scale__control--value');
const controlSmaller = formPicture.querySelector('.scale__control--smaller');
const controlBigger = formPicture.querySelector('.scale__control--bigger');

let scale = 1;

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

function addScale () {
  controlSmaller.addEventListener('click', onSmallerButton);
  controlBigger.addEventListener('click', onBiggerButton);
}

function removeScale () {
  controlSmaller.removeEventListener('click', onSmallerButton);
  controlBigger.removeEventListener('click', onBiggerButton);
}

const resetScale = () => {
  scale = 1;
  controlValue.value = '100%';
  img.style.transform = 'scale(1)';
};

export {addScale, removeScale, resetScale};

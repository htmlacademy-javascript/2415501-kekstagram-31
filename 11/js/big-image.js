import { photos } from './miniatures.js';
import {isEscapeKey} from './util.js';
import { deletedComments, renderNewComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const imgPicture = bigPicture.querySelector('.big-picture__img img');
const likesCountPicture = bigPicture.querySelector('.likes-count');
const descriptionPicture = document.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const pictureList = document.querySelector('.pictures');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPictureClick = () => {
  closeBigPicture();
};

const openBigPicture = (pictureID) => {
  const currentPicture = photos.find((photo) => photo.id === Number(pictureID));

  imgPicture.src = currentPicture.url;
  likesCountPicture.textContent = currentPicture.likes;
  descriptionPicture.textContent = currentPicture.description;

  renderNewComments(currentPicture.comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', closeBigPictureClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const openPicture = () => {
  pictureList.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      evt.preventDefault();
      openBigPicture(currentPicture.dataset.pictureId);
    }
  });
};

function closeBigPicture () {
  deletedComments();
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeBigPictureClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openPicture};

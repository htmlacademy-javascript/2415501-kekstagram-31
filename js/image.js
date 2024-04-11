import { isEscapeKey } from './util.js';
import { deletedComments, renderNewComments } from './render-comments.js';


const bigPicture = document.querySelector('.big-picture');
const imgPicture = bigPicture.querySelector('.big-picture__img img');
const likesCountPicture = bigPicture.querySelector('.likes-count');
const descriptionPicture = document.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const pictureList = document.querySelector('.pictures');
const miniaturesPicture = document.querySelector('#picture').content.querySelector('.picture');

let photoDesk;

const renderingThumbnails = (photos) => {
  const accountFragment = document.createDocumentFragment();
  photoDesk = photos;

  photos.forEach(({id, url, description, likes, comments}) => {
    const profile = miniaturesPicture.cloneNode(true);
    profile.dataset.pictureId = id;
    profile.querySelector('.picture__img').src = url;
    profile.querySelector('.picture__img').alt = description;
    profile.querySelector('.picture__likes').textContent = likes;
    profile.querySelector('.picture__comments').textContent = comments.length;
    accountFragment.appendChild(profile);
  });

  pictureList.appendChild(accountFragment);
};

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
  const currentPicture = photoDesk.find((photo) => photo.id === Number(pictureID));

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
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeBigPictureClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openPicture, renderingThumbnails};

import { photos } from "./miniatures.js";
import {isEscapeKey} from "./util.js";

const bigPicture = document.querySelector('.big-picture');
const imgPicture = bigPicture.querySelector('.big-picture__img img');
const likesCountPicture = bigPicture.querySelector('.likes-count');
const commentsCountShow =  bigPicture.querySelector('.social__comment-shown-count');
const commentsCount =  bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
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
  const socialCommentsFragment = document.createDocumentFragment();

  imgPicture.src = currentPicture.url;
  likesCountPicture.textContent = currentPicture.likes;
  commentsCountShow.taxtContent = currentPicture.comments.length;
  socialComments.innerHTML='';

  currentPicture.comments.forEach((comment) => {
    const commentNode = socialComment.cloneNode(true);
    commentNode.querySelector('.social__picture').src = comment.avatar;
    commentNode.querySelector('.social__picture').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(commentNode);
  })

  socialComments.appendChild(socialCommentsFragment);
  descriptionPicture.textContent = currentPicture.description;

  bigPicture.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', closeBigPictureClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

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
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeBigPictureClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openPicture};

import {createPublication} from '../js/data.js';

const miniaturesPicture = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const photos = createPublication();

const accountFragment = document.createDocumentFragment();

photos.forEach(({id, url, description, likes, comments}) => {
  const profile = miniaturesPicture.cloneNode(true);
  profile.dataset.pictureId = id;
  profile.querySelector('.picture__img').src = url;
  profile.querySelector('.picture__img').alt = description;
  profile.querySelector('.picture__likes').textContent = likes;
  profile.querySelector('.picture__comments').textContent = comments.length;
  accountFragment.appendChild(profile);
});

pictures.appendChild(accountFragment);

export {pictures, photos};

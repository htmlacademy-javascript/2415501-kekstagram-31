import {create} from '../js/data.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createAccount = create();

const accountFragment = document.createDocumentFragment();

createAccount.forEach(({url, description, likes, comments}) => {
  const profile = template.cloneNode(true);
  profile.querySelector('.picture__img').src = url;
  profile.querySelector('.picture__img').alt = description;
  profile.querySelector('.picture__likes').textContent = likes;
  profile.querySelector('.picture__comments').textContent = comments;
  accountFragment.appendChild(profile);
});

pictures.appendChild(accountFragment);

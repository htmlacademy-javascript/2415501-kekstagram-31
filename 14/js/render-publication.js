import { renderingThumbnails } from './miniatures.js';

const conteinerPictures = document.querySelector('.pictures');

let pictures = [];

const deleatePictures = () => {
  conteinerPictures.querySelectorAll('.picture').forEach((item) => item.remove());
};

const createPictures = (picturesData) => {
  deleatePictures ();
  pictures = picturesData;
  renderingThumbnails (pictures);
};

export {createPictures};

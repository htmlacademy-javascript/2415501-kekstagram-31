import '../js/miniatures.js';
import {submitForm, closeForm} from '../js/form.js';
import {openPicture} from './big-image.js';
import '../js/api.js';
import { getData } from '../js/api.js';
import { renderingThumbnails } from '../js/miniatures.js';
import { showErrorMessage } from './messages.js';
import { configFilter } from './filters.js';

getData()
  .then((photos) => {
    renderingThumbnails(photos);
    configFilter(photos);
  })
  .catch((error) => {
    showErrorMessage(error.message);
  });

const filters = document.querySelector('.img-filters');
filters.classList.remove('img-filters--inactive');
openPicture();

submitForm (closeForm);

import { submitForm, closeForm } from './form.js';
import { openPicture, renderingThumbnails } from './image.js';
import { getData } from './api.js';
import { showErrorMessage } from './messages.js';
import { configFilter } from './filters.js';
import { choosePhoto } from './photos.js';

getData()
  .then((photos) => {
    renderingThumbnails(photos);
    configFilter(photos);
  })
  .catch((error) => {
    showErrorMessage(error.message);
  });


openPicture();
choosePhoto();
submitForm (closeForm);

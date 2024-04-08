import '../js/miniatures.js';
import '../js/data.js';
import {submitForm, closeForm} from '../js/form.js';
import {openPicture} from './big-image.js';
import '../js/api.js'
import { getData } from '../js/api.js';
import { photoDesk, renderingThumbnails } from '../js/miniatures.js';
import { showErrorMessage } from './messages.js';

getData()
  .then((photos) => {renderingThumbnails(photos)})
  .catch((error) => showErrorMessage(error.message));
openPicture();

submitForm (closeForm);

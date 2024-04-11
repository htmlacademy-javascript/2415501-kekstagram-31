import { createPictures } from './render-publication.js';
import { debounce } from './util.js';

const MAX_PICTURES_NUMBER = 10;
const ACTIVE_BUTTON = 'img-filters__button--active';
const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const SORTFUNCTION = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length
};

const debounceRender = debounce(createPictures);
const imgFilters = document.querySelector('.img-filters');

let pictures = [];
let filterActive = FILTERS.default;
imgFilters.classList.add('hidden');

const useFilters = () => {
  let filteringPictures = [];

  switch(filterActive) {
    case FILTERS.default:
      filteringPictures = pictures;
      break;
    case FILTERS.random:
      filteringPictures = pictures.toSorted(SORTFUNCTION.random).slice(0, MAX_PICTURES_NUMBER);
      break;
    case FILTERS.discussed:
      filteringPictures = pictures.toSorted(SORTFUNCTION.discussed);
      break;
  }
  debounceRender(filteringPictures);
};

const changingFilter = (evt) => {
  const targetButton = evt.target;
  const currentButton = document.querySelector(`.${ACTIVE_BUTTON}`);

  if (!targetButton.matches('button')) {
    return;
  }

  if (currentButton === targetButton) {
    return;
  }

  currentButton.classList.toggle(ACTIVE_BUTTON);
  targetButton.classList.toggle(ACTIVE_BUTTON);
  filterActive = targetButton.getAttribute('id');
  useFilters();
};

function configFilter (picturesData) {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', changingFilter);
  imgFilters.classList.remove('hidden');
  pictures = picturesData;
}

export {configFilter};



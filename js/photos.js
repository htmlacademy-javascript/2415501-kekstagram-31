const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const chooseFile = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview > img');
const imgEffectsPreview = document.querySelectorAll('.effects__preview');

const choosePhoto = () => {
  chooseFile.addEventListener('change', () => {
  const file = chooseFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it)=> fileName.endsWith(it));

  if(matches) {
    const url = URL.createObjectURL(file);
    imgPreview.src = url;
    imgEffectsPreview.forEach((item) => {
      item.style.backgroundImage =`url(${url})`;
    });
    } else {
    return;
  }
  })
};

export {choosePhoto};

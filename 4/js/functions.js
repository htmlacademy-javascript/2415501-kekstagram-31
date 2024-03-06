let text;
let numberLetters;

function getMassage(text,numberLetters) {
  if(text.length <= numberLetters){
    return true;
  }
  return false;
};

const newText = (string) => {
  string = string.toLowerCase();
  string = string.replaceAll(' ', '');

  let back = '';

  for (let i = string.length - 1; i >= 0; i --) {
    back += string[i];
  };
  return string === back ? 'Палиндром' : 'Совсем не то';
}

const DESCRIPTIONS = [
  'Иметь мягкое сердце в жестоком мире — это сила, а не слабость',
  'Смысл жизни состоит в том, чтобы умереть молодым ... как можно позже',
  'Отдыхайте так, чтобы вы забывали брать телефон в руки',
  'У вас никогда не заканчиваются вещи, которые могут пойти не так',
  'Пятница — мое второе любимое слово',
  'Когда вы не можете найти солнечный свет, станьте им сами',
  'Будьте счастливы. Это сводит людей с ума',
  'Скажи `да` новым приключениям',
  'Каждый день может быть не очень хорошим, но в каждом дне есть хорошее',
  'Сегодня лучший день',
  'Будьте тем человеком, с которым вы хотите провести всю жизнь',
  'Моя жизнь не идеальна, но это лучшее, что когда-либо случалось со мной',
  'Мечтай по-крупному, малыш!',
  'В мире 7 миллиардов улыбок, а твоя — моя любимая',
  'Вы делаете потрясающие вещи, не осознавая этого',
  'Не взрослей... Это ловушка!',
  'Не останавливайся, забудь что это такое',
  'Быть взрослым — это все равно, что складывать простыню. Никто не знает, как это сделать',
  'Я не ленивый. Я нахожусь в режиме энергосбережения',
  'Сегодня утром я собирался захватить мир, но проспал. Отложим на завтра',
  'Я никогда не делаю одну и ту же ошибку дважды. Я делаю это пять или шесть раз – для уверенности',
  'Спи, как будто никто не смотрит',
  'Друзья — это семья, которую мы выбираем сами',
  'Некоторые люди приходят и оказывают такое сильное влияние на нашу жизнь, что мы не можем представить, какой была бы жизнь без них',
  'Хороший друг может знать ваши дикие истории, но ваш лучший друг был вместе с вами в этих историях'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Анна',
  'Александра',
  'Татьяна',
  'Алексей',
  'Александр',
  'Михаил',
  'Владимир',
  'Ева',
  'Мария',
  'Виктория',
  'Максим',
  'Давид',
  'Георгий',
  'Евгений',
  'Денис',
  'Антон',
  'Игорь',
  'Юрий',
  'Вячеслав',
  'Василий'
];

// Генератор случайных чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createID (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getComments = () => {
  const createComment = {
    id: getRandomInteger (20,500),
    avatar: `../img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  }
  return createComment;
};



const createPublication = () => {
  const numberID = createID(1, 25)();
  const commentsNumber = createID(1,30) ();

  let photo = {
    id: numberID,
    url:`../photos/${numberID}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: commentsNumber}, getComments),
  };
  return photo;
};


const create = Array.from({length:25}, createPublication);
console.log(create);

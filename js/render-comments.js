const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const commentsCountShow = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');
socialComments.innerHTML = '';

const renderCommentsNext = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderComment = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderCommentLength = renderComment.length + currentCount;

  renderComment.forEach((comment) => {
    const commentNode = socialComment.cloneNode(true);
    commentNode.querySelector('.social__picture').src = comment.avatar;
    commentNode.querySelector('.social__picture').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(commentNode);
  });

  socialComments.appendChild(socialCommentsFragment);
  commentsCountShow.textContent = renderCommentLength;
  commentsTotalCount.textContent = comments.length;

  if(renderCommentLength >= comments.length){
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};

const deletedComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', renderCommentsNext);
};

const renderNewComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderCommentsNext();
  commentsLoader.addEventListener('click', renderCommentsNext);
};

export {deletedComments, renderNewComments};

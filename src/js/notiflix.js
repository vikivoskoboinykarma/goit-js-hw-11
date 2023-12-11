import Notiflix from 'notiflix';

export const showFailureNotification = () => {
  Notiflix.Notify.failure('Error fetching images. Please try again.');
};

export const showEndOfResultsNotification = () => {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
};

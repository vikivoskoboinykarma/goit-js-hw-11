import { searchImages } from './pixabay.js';
import { showFailureNotification, showEndOfResultsNotification } from './notiflix.js';
import { initializeLightbox } from './lightbox.js';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

const lightbox = initializeLightbox('#gallery a');

const apiKey = '41159342-05b89f98d270da49e2c68fdb1';
const perPage = 40;
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  currentPage = 1; // Reset page number on new search
  currentQuery = event.target.searchQuery.value.trim();

  if (currentQuery.trim() !== '') {
    try {
      const { images } = await searchImages(apiKey, currentQuery, currentPage, perPage);
      
      if (images.length > 0) {
        const { height: cardHeight } = document.querySelector('.photo-card').getBoundingClientRect();

        images.forEach(image => {
          const card = createImageCard(image);
          gallery.appendChild(card);
        });

        loadMoreBtn.style.display = images.length >= perPage ? 'block' : 'none';

        // Smooth scroll
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      } else {
        loadMoreBtn.style.display = 'none';
        showEndOfResultsNotification();
      }
    } catch (error) {
      showFailureNotification();
    }
  }
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage += 1;
  try {
    const { images } = await searchImages(apiKey, currentQuery, currentPage, perPage);

    if (images.length > 0) {
      const { height: cardHeight } = document.querySelector('.photo-card').getBoundingClientRect();

      images.forEach(image => {
        const card = createImageCard(image);
        gallery.appendChild(card);
      });

      loadMoreBtn.style.display = images.length >= perPage ? 'block' : 'none';

      // Smooth scroll
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    } else {
      loadMoreBtn.style.display = 'none';
      showEndOfResultsNotification();
    }
  } catch (error) {
    showFailureNotification();
  }
});

function createImageCard(image) {
  // реалізація createImageCard
}

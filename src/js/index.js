import { searchImages } from './pixabay';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createImageCard } from './markup';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

const apiKey = '41159342-05b89f98d270da49e2c68fdb1';
const perPage = 40;
let currentPage = 1;
let currentQuery = '';

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', function (event) {
  event.preventDefault();
  currentQuery = event.target.searchQuery.value.trim();

  if (!currentQuery) {
    // Показати помилку, якщо поле пошуку пусте
    Notiflix.Notify.failure('All fields must be filled!');
    return; // Припинити виконання функції
  }

  currentPage = 1;
  updateGallery(currentQuery);
});

loadMoreBtn.addEventListener('click', function () {
  currentPage += 1;
  updateGallery(currentQuery);
});

function updateGallery(query) {
  searchImages(apiKey, query, currentPage, perPage)
    .then(images => {
      if (currentPage === 1) {
        gallery.innerHTML = '';
      }

      if (images.length === 0) {
        if (currentPage === 1) {
          Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        } else {
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
        loadMoreBtn.style.display = 'none';
        return;
      }

      images.forEach(image => {
        const card = createImageCard(image);
        gallery.appendChild(card);
      });

      lightbox.refresh();

      if (images.length < perPage) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } else {
        loadMoreBtn.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      Notiflix.Notify.failure('Error fetching images. Please try again.');
    });
}

// index.js
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

export let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const apiKey = '41159342-05b89f98d270da49e2c68fdb1'; // Replace with your Pixabay API key
const perPage = 40; // Number of images per page
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', function (event) {
  event.preventDefault();
  currentPage = 1; // Reset page number on new search
  currentQuery = event.target.searchQuery.value.trim();
  if (currentQuery !== '') {
    searchImages(currentQuery, currentPage);
  }
});

loadMoreBtn.addEventListener('click', function () {
  currentPage += 1;
  searchImages(currentQuery, currentPage);
});

function searchImages(query, page) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  axios
    .get(url)
    .then(response => {
      const images = response.data.hits;
      if (page === 1) {
        gallery.innerHTML = ''; 
        loadMoreBtn.style.display = 'none'; // Clear gallery on the first page
      }

      if (images.length > 0) {
        images.forEach(image => {
          const card = createImageCard(image);
          gallery.appendChild(card);
        });
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      Notiflix.Notify.failure('Error fetching images. Please try again.');
    });
}

function displayTotalHits(lightbox) {
    Notiflix.Notify.success(`Hooray! We found ${lightbox} images.`);
  }

 
function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const link = document.createElement('a');
  link.href = image.largeImageURL;
  link.setAttribute('data-lightbox', 'gallery');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  link.appendChild(img);
  card.appendChild(link);

  // Додаємо інформацію про зображення
  const info = document.createElement('div');
  info.classList.add('info');

  const likes = document.createElement('p');
  likes.classList.add('info-item');
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement('p');
  views.classList.add('info-item');
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement('p');
  comments.classList.add('info-item');
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement('p');
  downloads.classList.add('info-item');
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  card.appendChild(info);

  return card;
}
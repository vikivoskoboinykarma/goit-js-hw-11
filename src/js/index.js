import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './pixabay';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const apiKey = '41159342-05b89f98d270da49e2c68fdb1'; // Replace with your Pixabay API key
const perPage = 40; // Number of images per page
let currentPage = 1;
let currentQuery = '';

// Приховуємо кнопку "Load more" при відкритті сторінки
loadMoreBtn.style.display = 'none';

form.addEventListener('submit', function (event) {
  event.preventDefault();
  currentPage = 1; // Скидаємо номер сторінки при новому пошуку
  currentQuery = event.target.searchQuery.value.trim();
  if (currentQuery !== '') {
    searchImages(apiKey, currentQuery, currentPage, perPage, gallery, loadMoreBtn);
  }
});

loadMoreBtn.addEventListener('click', function () {
  currentPage += 1;
  searchImages(apiKey, currentQuery, currentPage, perPage, gallery, loadMoreBtn);
});

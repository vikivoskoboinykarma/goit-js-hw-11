import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.card-link', {
    captionsData: 'alt',
    captionDelay: 250,
  });
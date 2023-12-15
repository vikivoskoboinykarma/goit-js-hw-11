import axios from 'axios';

export function searchImages(apiKey, query, page, perPage) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  return axios.get(url)
    .then(response => response.data.hits)
    .catch(error => {
      throw error;
    });
}

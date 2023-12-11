import axios from 'axios';

export const searchImages = async (apiKey, query, page, perPage) => {
  try {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    const response = await axios.get(url);
    const images = response.data.hits;

    return { images };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Error fetching images. Please try again.');
  }
};

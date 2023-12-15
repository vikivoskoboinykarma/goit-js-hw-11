
export function createImageCard(image) {
    // Створення розмітки картки зображення з використанням шаблонного рядка
    const cardHTML = `
      <div class="photo-card">
        <a href="${image.largeImageURL}" data-lightbox="gallery">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${image.likes}</p>
          <p class="info-item"><b>Views:</b> ${image.views}</p>
          <p class="info-item"><b>Comments:</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
    `;
  
    // Створення елемента та вставка HTML
    const card = document.createElement('div');
    card.innerHTML = cardHTML;
  
    // Повернення першого дочірнього елемента, що є фактичною карткою
    return card.firstElementChild;
  }
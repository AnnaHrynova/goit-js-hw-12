import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function renderGallery(imgs) {
    
    loader.style.display = 'none';

    if (imgs.length === 0) {
        iziToast.show({
    message: 'Sorry, there are no images matching </br> your search query. Please try again!',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    iconColor: 'white',
    close: true,
    displayMode: 1,
    timeout: 3000
});
        return;
    }

    imgs.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <li><a href="${img.largeImageURL}" data-lightbox="gallery">
                <img src="${img.webformatURL}" alt="${img.tags}">
            </a>
            <div>
            <p> <span>Likes:</span> <br/> ${img.likes}</p>
            <p> <span>Views:</span> <br/> ${img.views}</p>
            <p> <span>Comments:</span> <br/> ${img.comments}</p>
            <p> <span>Downloads:</span> <br/> ${img.downloads}</p>
            </div>
            </li>
        `;
        gallery.appendChild(card);
    });

    lightbox.refresh();

}

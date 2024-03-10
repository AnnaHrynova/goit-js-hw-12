import { searchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const form = document.querySelector('.form');
const searchImg = document.getElementById('search-img');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

loader.style.display = 'none';

form.addEventListener('submit', async function (e) {

    e.preventDefault();
    const searchInput = searchImg.value.trim();

    if (searchInput === '') {
        iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'Please enter a search term'
        });
        return;
    }

    loader.style.display = 'block';
    gallery.innerHTML = '';

    searchImages(searchInput)
        .then(function (imgs) {
            renderGallery(imgs);
            searchImg.value = '';
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
            iziToast.error({
                title: 'Error',
                position: 'topRight',
                message: 'An error occurred. Please try again.'
            });
        })
        .finally(function () {
            loader.style.display = 'none';
        });
});

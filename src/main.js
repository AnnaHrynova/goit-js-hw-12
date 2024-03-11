import { searchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.form');
const searchImg = document.getElementById('search-img');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-btn');

let page = 1;
let perPage = 15;
const totalPages = Math.ceil(100 / perPage);

loader.style.display = 'none';
loadButton.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a');

loadButton.addEventListener('click', async function () {

    if (page > totalPages) {
         loadButton.style.display = 'none';
    return iziToast.error({
      position: "topRight",
      message: "We're sorry, there are no more posts to load"
    });
  }
  
        
    try {
        const searchInput = searchImg.value.trim();
        const imgs = await searchImages(searchInput, page); 
        renderGallery(imgs);
        page++; 
        checkLoadButtonVisibility(imgs);
        lightbox.refresh();
    } catch (error) {
        console.error('Error fetching data:', error);
        iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'An error occurred. Please try again.'
        });
    }
});

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

    try {
        const imgs = await searchImages(searchInput, page);
        renderGallery(imgs);
        searchImg.value = '';
        checkLoadButtonVisibility(imgs);
        lightbox.refresh();
    } catch (error) {
        console.error('Error fetching data:', error);
        iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'An error occurred. Please try again.'
        });
    } finally {
        loader.style.display = 'none';
    }
});

function checkLoadButtonVisibility(imgs) {
    if (imgs.length === 15) { 
        loadButton.style.display = 'block';
    } else {
        loadButton.style.display = 'none';
    }
}

// window.scrollBy({
//       top: scrollValue,
//       behavior: 'smooth',
//     });
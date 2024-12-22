import '/public/styles/style.scss'
import { setupCounter } from './js/counter.js'
import { initTabs } from './js/tabs.js'
import { hotels } from "./js/hotels.js";
import { generateHotels } from './js/generate-hotels.js';
import { initSwipers } from './js/swiper.js';

const counter = document.querySelector('.counter');
if (counter) {
  setupCounter(counter);
}

const paths = [
  `/assets/vectors/sprite.svg#shield`,
  `/assets/vectors/sprite.svg#shield2`,
  `/assets/vectors/sprite.svg#shield2`,
  `/assets/vectors/sprite.svg#shield2`,
  `/assets/vectors/sprite.svg#shield2`,
  `/assets/vectors/sprite.svg#shield2`,
]

function createSVG(path) {
  return `
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <use href="${path}"></use>
        </svg>
  `;
}

function insertInlineSVG() {

  const title = document.querySelector('.title');
  if (title) {
    paths.forEach(path => {
      title.insertAdjacentHTML('beforeend', createSVG(path));
    })
  } else {
    console.error("Element with class 'title' not found.");
  }
}

// generateHotels(hotels);

document.addEventListener('DOMContentLoaded', () => {

  initTabs();
  insertInlineSVG();
  initSwipers();

});
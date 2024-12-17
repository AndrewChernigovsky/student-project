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

// generateHotels(hotels);
initTabs();

document.addEventListener('DOMContentLoaded', initSwipers);
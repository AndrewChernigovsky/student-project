import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const swiperIntro = document.querySelector('.swiper-intro');
const swiperIntroGallery = document.querySelectorAll('.swiper-intro-gallery');
const swiperIntroGalleryThumbs = document.querySelectorAll('.swiper-intro-gallery-thumbs');

export function initSwipers() {
  if (swiperIntro) {
    const swiper = new Swiper(swiperIntro, {
      modules: [Pagination],
      noSwiping: false,
      pagination: {
        el: '.swiper-pagination',
      },
      draggable: true,
    });
  }
  if (swiperIntroGallery.length > 0) {
    swiperIntroGallery.forEach((gallery, index) => {
      const thumbs = swiperIntroGalleryThumbs[index];

      const galleryThumbs = new Swiper(thumbs, {
        slidesPerView: 2,
        spaceBetween: 10,
        centeredSlides: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        draggable: true,
        noSwiping: false, nested: true,
      })

      const gallerySwiper = new Swiper(gallery, {
        draggable: true,
        noSwiping: false,
        nested: true,
        thumbs: {
          swiper: galleryThumbs
        }
      })

      galleryThumbs.on('slideChange', () => {
        gallerySwiper.slideTo(galleryThumbs.activeIndex)
      })
      gallerySwiper.on('slideChange', () => {
        galleryThumbs.slideTo(gallerySwiper.activeIndex)
      })
    })
  }
}
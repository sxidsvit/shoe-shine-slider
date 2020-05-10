
/* eslint-disable no-undef */

// Initialize Swiper

// eslint-disable-next-line no-undef

const firstSliderNumber = Math.trunc((jQuery('.cleaner--container').length) / 2)
console.log('firstSliderNumber: ', firstSliderNumber)

var swiper = new Swiper('.swiper-container', {
  // loop: true,
  effect: 'coverflow',
  initialSlide: firstSliderNumber,
  // grabCursor: true,
  grabCursor: false,
  centeredSlides: true,
  slidesPerView: 3,
  loop: true,
  loopedSlides: 0,
  updateOnWindowResize: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 700,
    modifier: 1,
    slideShadows: false
  },
  pagination: {
    el: '.slider-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    // when window width is >= 320px
    380: {
      slidesPerView: 1,
      spaceBetween: 20,
      modifier: 0
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
      modifier: 3
    },
    // when window width is >= 920px
    920: {
      slidesPerView: 3,
      spaceBetween: 40,
      modifier: 2
    }
  },
  on: {
    init: function () {
      console.info('swiper initialized')
    },
    resize: function () {
      this.update()
    }
  }
})

swiper.on('slideChangeTransitionEnd', () => {
  // swiper.detachEvents()
  window.requestAnimationFrame(cleanDirty)
  window.requestAnimationFrame(verticalLineSliding)
  console.log('slide has been changed')
})
window.addEventListener('resize',
  () => {
    window.requestAnimationFrame(cleanDirty)
    window.requestAnimationFrame(verticalLineSliding)
    console.log('window has been resized')
  }
)

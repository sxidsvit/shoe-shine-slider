/* eslint-disable no-undef */

//  вертикальная шторка со стрелками

const lineWithCircle = (o, circleWithArrows) => {
  //  текущие размеры блока со шторкой
  const box = o.getBoundingClientRect()
  // штрина картинки , которая накладывается на шторку
  circleWithArrows.style.display = 'block'
  const width = circleWithArrows.getBoundingClientRect().width

  const left = (box.right - width / 2) + 'px'
  const top = (box.bottom - box.height / 2 - width / 2 + pageYOffset) + 'px'

  circleWithArrows.style.cssText = `left: ${left}; top: ${top}; display: block; position: absolute; z-index: 10; `
}

// хендлер перемещения мышки по центральному слайду

const verticalLineSliding = () => {
  const swiperSlideAll = document.querySelectorAll('.swiper-slide')
  swiperSlideAll.forEach(item => jQuery(item).off())

  if (jQuery('.cleaner--container').length) {
    const swiperSlideActive = document.querySelectorAll('.swiper-slide-active')
    const o = swiperSlideActive[0].querySelector('.cleaner-img--dirty')
    const circleWithArrows = document.querySelector('.circle-with-arrows')
    lineWithCircle(o, circleWithArrows)

    if (jQuery(window).width() > 320) {
      swiperSlideActive.forEach(item => {
        var e
        var t = jQuery(item).width()
        jQuery(item).on('mouseenter', function (n) {
          e = jQuery(item).offset().left
        })
        jQuery(item).on('mouseleave', function (n) {
          e = null
        })
        jQuery(item).on('mousemove', function (n) {
          const o = item.querySelector('.cleaner-img--dirty')
          const a = n.clientX - e
          var i = 100 * a / t
          jQuery(o).css({ width: i + '%' })
          lineWithCircle(o, circleWithArrows)
        })
      })
    }
  }
  console.log('verticalLineSliding has been called')
}

// --------------------------------------------------

const cleaner = (container) => {
  let firstPartOfSlides = true
  container.forEach(item => {
    if (item.classList.contains('swiper-slide-active')) {
      jQuery(item).find('.cleaner-img--dirty').css({ width: 50 + '%', borderRight: '4px solid #6446EE' })
      var e
      var t = jQuery(item).width()
      jQuery(item).on('mouseenter', function (n) {
        e = jQuery(item).offset().left
      })
      jQuery(item).on('mouseleave', function (n) {
        e = null
      })
      jQuery(item).on('mousemove', function (n) {
        var o = jQuery(item).find('.cleaner-img--dirty')
        var a = n.clientX - e
        var i = 100 * a / t
        jQuery(o).css({ width: i + '%' })
      })
      firstPartOfSlides = false
    } else {
      if (firstPartOfSlides) {
        jQuery(item).find('.cleaner-img--dirty').css({ width: 100 + '%', borderRight: '0px solid #6446EE' })
      } else {
        jQuery(item).find('.cleaner-img--dirty').css({ width: 0 + '%', borderRight: '0px solid #6446EE' })
      }
    }
  })
}

const cleanDirty = () => {
  // console.log('cleanDirty started ...')
  const cleanerContainer = document.querySelectorAll('.swiper-slide')

  if (cleanerContainer.length) {
    if (jQuery(window).width() > 320) {
      cleaner(cleanerContainer)
    } else {
      // удаляем хендлеры перемещения мыши на малентуих экранах
      cleanerContainer.forEach(item => {
        jQuery(item).off()
        // item.removeEventListener()
      })
    }
    // eslint-disable-next-line no-multi-spaces
  }  // end .swiper-slide
  console.log('cleanDirty has been called')
}

cleanDirty()
verticalLineSliding()

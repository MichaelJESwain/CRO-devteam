const utils = window['optimizely'].get('utils')

utils.waitForElement('[class*="auto-play-carousel_"]').then(function () {
  triggerExperiment()
})

utils.observeSelector('[data-testid="search__form--header"]', () => {
  triggerExperiment()
})

function triggerExperiment() {
  if (sessionStorage.getItem('uspBarDisplay') === 'false') {
    closeBanner()
  } else {
    sessionStorage.setItem('uspBarDisplay', true)
    createButton()
  }
}

function createButton() {
  const bannerCloseButton_Icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`

  const bannerCloseButton = document.createElement('button')
  bannerCloseButton.setAttribute('class', 'Button')
  bannerCloseButton.innerHTML = `<span>${bannerCloseButton_Icon}</span>`
  bannerCloseButton.id = 'closeBtnId'

  const btnStyle = {
    background: 'none',
    border: 'none',
    padding: '0',
    margin: '0',
    height: 'auto',
    width: 'auto',
    right: '1.25rem',
    top: '0',
    zIndex: '300',
    position: 'fixed',
    cursor: 'pointer',
  }
  Object.assign(bannerCloseButton.style, btnStyle)

  document.body.appendChild(bannerCloseButton)

  bannerCloseButton.addEventListener('click', function () {
    closeBanner()
    adobeEvent()
  })
}

const observeElement = (cssSelector, callback) => {
  if (
    cssSelector &&
    callback &&
    document.querySelector(cssSelector) &&
    !window[`observe${cssSelector}`]
  ) {
    const config = { attributes: true, childList: true, subtree: true }
    const element = document.querySelector(cssSelector)

    const callbackWrapper = (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        // If the element contains the attribute 'data-is-expanded' && the element doesn't have a class of 'top', then the top class has been removed and we need to add it again
        if (
          document
            .querySelector(cssSelector)
            .getAttribute('data-is-expanded') === '' &&
          !document.querySelector(cssSelector).classList.contains('top')
        ) {
          callback()
        }
      }
    }
    window[`observe${cssSelector}`] = new MutationObserver(callbackWrapper)

    window[`observe${cssSelector}`].observe(element, config)
  }
}

let counter = 0

const addCss = function (css) {
  var s = document.createElement('style')
  s.innerHTML = css
  var h = document.querySelector('head')
  h.appendChild(s)
  counter = 1
  return s
}

function closeBanner() {
  sessionStorage.setItem('uspBarDisplay', false)
  utils.waitUntil('#closeBtnId').then(function () {
    document.querySelector('#closeBtnId').style.display = 'none'
    document.querySelector('#closeBtnId').remove()
    console.log('the btn was removed')
  })

  const css = `
    div[class*=auto-play-carousel_]{
        display: none;
    }

    @media (min-width: 768px) {
        header[class*=header--header-banner_]{
            height: 105px;
        }
    }

    @media (max-width: 768px){
        body:not(.menu-open_l0RAc) .search__form_bjQh8:before {
            top: 0 !important;
        }

        header[class*=header--header-banner_]{
            height: 50px;
        }

        [class*="nav__toggle-label_"] {
            top: -35px !important;
        }
    }

    @media (max-width: 1023px) and (max-width: 740px) {
        .nav__toggle-label_xBFXP {
            top: -25px;
            left: 12px;
        }
    }
  `

  // document.querySelector("[class*='auto-play-carousel_']").style.display =
  //   'none'

  // if (document.querySelector('[data-testid="nav-toggle-label"]') !== null) {
  //   document
  //     .querySelector('[data-testid="nav-toggle-label"]')
  //     .classList.add('smallDeviceStyle')
  // }

  // document
  //   .querySelector('[data-testid="search__form--header"]')
  //   .classList.add('top')
  if (counter === 0) addCss(css)

  // remove excess height from header so it expands to fit the content inside
  // document.querySelector('header').style.height = 'fit-content'

  // observe any changes that occur on the element
  // observeElement('[data-testid="search__form--header"]', () => {
  //   document
  //     .querySelector('[data-testid="search__form--header"]')
  //     .classList.add('top')
  // })
}

// Adobe event
function adobeEvent() {
  utils
    .waitUntil(function () {
      return window.s && window.s.tl
    })
    .then(function () {
      //console.log('closed!!!');
      window.s.tl(this, 'o', 'TH148-Click-Close-USP-Bar')
    })
  closeBanner()
}

// observe if the colour of product changed in a pdp
utils.observeSelector(
  '[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]',
  () => {
    //console.log("Changed the color");
    triggerExperiment()

    observeElement('[data-testid="search__form--header"]', () => {
      triggerExperiment()
    })
  }
)
/* ----- Helper ------ */
function isInViewport(el) {
    if (!document.querySelector('[data-testid="newsletter-footer--success"]')) {
       var rect = el.getBoundingClientRect();
      
       return rect.bottom > 0 && rect.right > 0 &&
              rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
              rect.top < (window.innerHeight || document.documentElement.clientHeight);
          }
}

/* ----- Custom Goals ------ */
const utils = window["optimizely"].get("utils");

const fireAdobeEvent = (eventName) => {
   utils.waitUntil(function(){ return window.s && window.s.tl; }).then(function() {
      window.s.tl(this,"o", eventName);
  });
};

const fireOptimizelyEvent = (eventName) => {
  window['optimizely'] = window['optimizely'] || [];

  window['optimizely'].push({
    type: 'event',
    eventName: eventName,
  });
};

const fireBothEvents = (eventName, isAuto) => {
  fireAdobeEvent(eventName);
  fireOptimizelyEvent(eventName);
};

utils.waitForElement('[data-testid="newsletter-footer--success"]').then(function() {
	fireBothEvents('TH153-Cart-page-footer-e-mail-sign-ups');
});

function checkBannerVisible(){
    const elementBanner = document.querySelector("[data-testid='NewsletterFooter']");
    if(isInViewport(elementBanner)){
        fireBothEvents('TH153-Newsletter-Is-Visible');
        document.removeEventListener('scroll', checkBannerVisible);
    }
}

document.addEventListener('scroll', checkBannerVisible);

// TH153 - Cart page coupon code additions - event

utils.waitForElement('[data-testid="promo-code-input-new"]').then(function() {
  document.querySelector('[data-testid="apply-button"]').addEventListener('click', () => {
    if(document.querySelector('[data-testid="apply-button"]')){
      //console.log("ops, wrong promo code");
    } else{
      //console.log("opsss, right promo code");
      fireBothEvents('TH153-Cart-page-coupon-code-additions');
    }
  });
});
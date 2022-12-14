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


// --------------- custom goal #1 - TH150 - Add to bag clicks on wishlist page ------------ //
utils.waitForElement('[data-testid="wishlist-add"]').then(function(){
    document.querySelectorAll('[data-testid="wishlist-add"]').forEach(function(button){
        button.addEventListener('click', function(){
            fireBothEvents('TH150 - Add to bag clicks on wishlist page');
        });
      });
});

// --------------- custom goal #2 - TH150 - Clicks on products in wishlist ------------ //
utils.waitForElement('.wishlist-item').then(function(){
    document.querySelectorAll('.wishlist-item').forEach(function(wishlistProduct) {
        if (!wishlistProduct.classList.contains('exp-wishlist-item')) {
            wishlistProduct.addEventListener('click', function() {
                fireBothEvents('TH150 - Clicks on products in wishlist');
            });
        }
    });
});

// --------------- custom goal #3 - TH150 - Clicks on header on wishlist page ------------ //
utils.waitForElement('header').then(function(){
    document.querySelector('header').addEventListener('click', function() {
        setTimeout(function() {
            if (document.querySelector('.page--wishListPage') && !window.hasClickedVariantButton) {
                fireBothEvents('TH150 - Clicks on header on wishlist page');
            }
            if (window.hasClickedVariantButton) {
                delete window.hasClickedVariantButton;
            }
        }, 500);
    });
});
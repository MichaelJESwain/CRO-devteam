const utils = window.optimizely.get('utils');

// --------- ORIGINAL ---------- //
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

// ----- Metric #1 - CK280 - Click on "continue shopping" CTA ----- //
utils.observeSelector('.exp-wrapper > .continue', function(){
    document.querySelector('.exp-wrapper > .continue').addEventListener("click", () => {
        fireBothEvents('CK280-Click-On-Continue-Shopping-CTA');
    });
}, { once: true});

utils.observeSelector('.cta-continue-mobile', function(){
  document.querySelector('.cta-continue-mobile').addEventListener("click", () => {
      fireBothEvents('CK280-Click-On-Continue-Shopping-CTA-Mobile');
  });
}, { once: true});

// ----- Metric #2 - CK280 - Click on "start/proceed to checkout" CTA ----- //
utils.observeSelector('.exp-checkout', function(){
    document.querySelector('.exp-checkout').addEventListener("click", () => {
        fireBothEvents('CK280-Click-On-Proceed-To-Checkout-CTA');
    });
}, { once: true});

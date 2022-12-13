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

utils.waitForElement('div[class*=right_] picture img').then(function() {
    document.querySelector('div[class*=right_] picture img').addEventListener('click', function() {
        fireBothEvents('TH171 - Clicks on Hero module elevated PLP');
    });
});

utils.waitForElement('.ctaBuy').then(function() {
    document.querySelector('.ctaBuy').addEventListener('click', function() {
        fireBothEvents('TH171 - Clicks on Hero module elevated PLP');
    });
});

utils.waitForElement('.ctaStyle').then(function() {
    document.querySelector('.ctaStyle').addEventListener('click', function() {
        fireBothEvents('TH171 - Clicks on Hero module elevated PLP');
    });
});

//[data-testid="HeroModule"]
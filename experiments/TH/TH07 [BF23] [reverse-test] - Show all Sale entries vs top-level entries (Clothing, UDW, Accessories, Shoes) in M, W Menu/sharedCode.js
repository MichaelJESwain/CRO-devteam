/* TODO add event 'TH07 - Clicked PLP Category' */

const promoOnlySelector = 'li[data-promo="true"] li a';
const promoHoverOnlySelector = 'li[data-promo="true"] [data-testid="Sub-MegaMenu"]';
const promoMobileClickSeenSelector = 'li[data-promo="true"] h6 button';
const megaMenu = document.querySelector('[data-testid="MegaMenu-component"]');

/* Michael please check how to trigger the adobe one */
const utils = window.optimizely.utils;
const fireAdobeEvent = (eventName) => {
  if(utag && utag.link) {
      utag.link({
          "event_name": `${eventName}`
      });
      /* console.log(eventName); */
  } else {
    utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
        utag.link({
            "event_name": `${eventName}`
        });
        /* console.log(eventName); */
    });
  }

};

/* Michael please check how to trigger the optimzely one */
const fireOptimizelyEvent = (eventName, plpCategory) => {
  window['optimizely'] = window['optimizely'] || [];

  window['optimizely'].push({
    type: 'event',
    eventName: eventName,
    tags: {
       plpCategory
    }
  });
};

const fireBothEventsTH07 = (eventName, plpCategory) => {
    fireAdobeEvent(`TH07 - Clicked ${plpCategory} Category`);
    fireOptimizelyEvent(eventName, plpCategory);
};

/* Click event */
const clickCallback = (e) => { 
  const {target} = e;
  // react to child event when set condition is passed
  if(target.closest(promoOnlySelector)) {
    const plpCategory = target.text;
    const eventName = `TH07 - Clicked PLP Category`;
    /* console.log(`TH07 - Clicked PLP Category`); */
    
    fireBothEventsTH07(eventName, plpCategory);
    megaMenu.removeEventListener("click", clickCallback);    
  }
};

megaMenu.addEventListener("click", clickCallback);


let seen = false;

/* Mobile seen event */
const mobileClickSeenCallback = (e) => { 
  const {target} = e;
  // react to child event when set condition is passed
  if(window.matchMedia("(max-width: 1024px)").matches && target.closest(promoMobileClickSeenSelector) && !seen) {
    seen = true;
    const plpCategory = target.text;
    const eventName = `TH07 - Changes seen`;
    optimizely.sendAnalyticsEvents(eventName);
    /* console.log(`TH07 - Changes seen`); */
    megaMenu.removeEventListener("click", mobileClickSeenCallback);
  }
};

megaMenu.addEventListener("click", mobileClickSeenCallback);




/* Desktop seen event */
const hoverCallback = (e) => { 
  const {target} = e;
  // react to child event when set condition is passed
  if(window.matchMedia("(min-width: 1025px)").matches && target.closest(promoHoverOnlySelector) && !seen) {
      seen = true;
      const plpCategory = target.text;
      const eventName = `TH07 - Changes seen`;
      optimizely.sendAnalyticsEvents(eventName);
      /* console.log(`TH07 - Changes seen`); */
      megaMenu.removeEventListener("mouseover", hoverCallback);
  }
};

megaMenu.addEventListener("mouseover", hoverCallback);

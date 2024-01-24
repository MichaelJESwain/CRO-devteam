/* 
Diagnostic goals (to determine the why behind the results)
Clicks on module items
*/
const utils = window["optimizely"].get("utils");

const fireAdobeEvent = (eventName) => {
    if (window.s && window.s.tl) {
      window.s.tl(window, 'o', eventName)
    }
  }
const fireOptimizelyEvent = (eventName) => {
    window['optimizely'] = window['optimizely'] || []
    window['optimizely'].push({
      type: 'event',
      eventName: eventName,
    })
}
const fireBothEvents = (eventName) => {
    if (!window[`hasFiredEvent-${eventName}`]) {
      window[`hasFiredEvent-${eventName}`] = true
      fireAdobeEvent(eventName)
      fireOptimizelyEvent(eventName)
      setTimeout(() => {
        window[`hasFiredEvent-${eventName}`] = false
      }, 100)
    }
};

utils.waitForElement('.THMoreCategories').then(() => {
const links = document.querySelector(".THMoreCategories--teaser__links").childNodes;  
    links.forEach((link) => {
      link.addEventListener("click", () => {
         fireBothEvents('TH220-clicks-on-module-items');
      });
    });
  });
const utils = window["optimizely"].get("utils");
const fireAdobeEvent = (eventName) => {
  utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
      utag.link({
          "event_name": `${eventName}`
      });
  });
};
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
}
// Accordions in viewport - Changes seen - ADOBE NEW: TH279 - Accordions in viewport
 let flag = true;
utils.observeSelector('[data-testid="ProductAccordions-component"]', () => {
    const element = document.querySelector('[data-testid="ProductAccordions-component"]');
 
    const observer = new window.IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          flag = false;
            fireBothEvents('TH279 - Accordions in viewport')
            return
        }
      }, {
        root: null,
        threshold: 0.1, 
      })
    observer.observe(element);
})
// Click on accordion (split out per accordion) - ADOBE NEW: 
// TH279 - Click on accordion - [title of accordion]
utils.observeSelector('[data-testid="ProductAccordions-component"]', () => {
    document.querySelectorAll('[data-testid="ProductAccordions-component"] > div').forEach(function(item){
        item.addEventListener('click', (event) => {
            const target = event.currentTarget;
            const titleAccordion = target.getAttribute('data-testid');
            fireBothEvents(`TH279 - Click on accordion - ${titleAccordion}`)
        })
    })
})
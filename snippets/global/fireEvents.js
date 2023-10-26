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

// ========================================================
// Usage:
// ========================================================
fireBothEvents('CK-ID-event-name')

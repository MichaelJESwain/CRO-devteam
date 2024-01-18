const utils = window.optimizely.get('utils');
const fireAdobeEvent = (eventName) => {
    utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
        utag.link({
            "event_name": `${eventName}`
        });
    });
};
const fireOptimizelyEvent = (eventName) => {
    window['optimizely'] = window['optimizely'] || [];
    window['optimizely'].push({
        type: 'event',
        eventName: eventName
    });
};
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
// === Diagnostic goals ===
utils.observeSelector('[data-test-id="notification-view-sb"]:not([style])', () => {
    document.querySelector('[data-test-id="notification-view-sb"]:not([style])').addEventListener('click', function(){
        fireBothEvents("TH182-click-on-view-shopping-bag");
    })
})

utils.observeSelector('[data-testid="page-notification-transition"] .checkout[href="/checkout/shipping"]', () => {
    document.querySelector('[data-testid="page-notification-transition"] .checkout[href="/checkout/shipping"]').addEventListener('click', function(){
        fireBothEvents("TH182-click-on-checkout");
    })
})

utils.observeSelector('[class*=PageNotification_action__] button', () => {
    document.querySelector('[class*=PageNotification_action__] button').addEventListener('click', function(){
        fireBothEvents("TH182-click-x-button");
    })
})
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
//TH182.2/CK224.3 - Clicks on Product image
utils.observeSelector('[class*=mini_bag_notification_mb_notification_imageContainer__] img', () => {
document.querySelector('[class*=mini_bag_notification_mb_notification_imageContainer__] img').addEventListener('click', function(){
    fireBothEvents('TH182.2-CK224.3 - Clicks on Product image')
})
})
//TH182.2/CK224.3 - Clicks on View shopping bag
utils.observeSelector('[data-test-id="notification-view-sb"]', () => {
    document.querySelector('[data-test-id="notification-view-sb"]').addEventListener('click', function(){
        fireBothEvents('TH182.2-CK224.3 - Clicks on View shopping bag')
    })
})
//TH182.2/CK224.3 - Clicks on close button
utils.observeSelector('[data-testid="pvh-PageNotification-warning-close-button-pvh-icon-button"]', () => {
    document.querySelector('[data-testid="pvh-PageNotification-warning-close-button-pvh-icon-button"]').addEventListener('click', function(){
       fireBothEvents('TH182.2-CK224.3 - Clicks on close button')
    })
})

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
// TH-247-manually-selected-delivery-#DELIVERY NAME#
function handleCheckoutClick(){
    const option = event.target;
    const chosenOption = option.closest('label')
    const text = chosenOption.getAttribute('for')
    fireBothEvents(`TH-247-manually-selected-delivery-${text}`);
  	fireBothEvents(`TH-247-manually-selected-delivery`)
}
utils.observeSelector('[data-testid="tabContent-component"]', () => {
    document.querySelectorAll('[data-testid="tabContent-component"] label[class*=SelectionItem_label]').forEach(function(option){
        option.addEventListener('click', handleCheckoutClick);
    })
})
// TH-247-scrolled
function handleScroll(event){
    fireBothEvents('TH-247-scrolled');
    document.removeEventListener('scroll', handleScroll);
}
document.addEventListener('scroll', handleScroll);

// TH-247-click-on-tab
utils.observeSelector('[data-testid="tabs-component"]', () => {
    document.querySelector('[data-testid="tabs-component"]').addEventListener('click', function(){
        fireBothEvents("TH-247-click-on-tab");
    })
})
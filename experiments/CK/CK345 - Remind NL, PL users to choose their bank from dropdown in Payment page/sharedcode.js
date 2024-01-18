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
// Diagnostic goals
// TH260/CK345 Clicks on bank dropdown     (Clicks on bank dropdown)
utils.observeSelector('[data-testid="ideal-container"] [class*=Select-module_adyen-checkout__dropdown__button]', () => {
    document.querySelector('[data-testid="ideal-container"] [class*=Select-module_adyen-checkout__dropdown__button]').addEventListener('click', function(){
        fireBothEvents('CK345-TH260 Clicks on bank dropdown')
    })
})
utils.observeSelector('[data-testid="onlineBanking_PL-container"] [class*=Select-module_adyen-checkout__dropdown__button]', () => {
    document.querySelector('[data-testid="onlineBanking_PL-container"] [class*=Select-module_adyen-checkout__dropdown__button]').addEventListener('click', function(){
        fireBothEvents('CK345-TH260 Clicks on bank dropdown')
    })
})
// TH260/CK345 Selecting bank in dropdown     (Selecting bank in dropdown)
utils.observeSelector('[data-testid="ideal-container"] ul', () => {
    document.querySelectorAll('[data-testid="ideal-container"] li').forEach(function(bank){
        bank.addEventListener('click', function(){
            fireBothEvents("CK345-TH260 Selecting bank in dropdown")
        })
    })
})
utils.observeSelector('[data-testid="onlineBanking_PL-container"] ul', () => {
    document.querySelectorAll('[data-testid="onlineBanking_PL-container"] li').forEach(function(bank){
        bank.addEventListener('click', function(){
            fireBothEvents("CK345-TH260 Selecting bank in dropdown")
        })
    })
})
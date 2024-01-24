const {waitUntil, waitForElement} = window.optimizely.get('utils');

const fireAdobeEvent = eventName => { 
    waitUntil(function() {
        return typeof window.utag !== 'undefined' && typeof window.utag.link !== 'undefined';
    }).then(function(){
        utag.link({ "event_name": `${eventName}` });
    });
};

const fireOptimizelyEvent = eventName => { 
    window.optimizely = window.optimizely || []; 
    window.optimizely.push({ type: 'event', eventName: eventName });
}; 

const fireBothEvents = eventName => { 
    fireAdobeEvent(eventName); 
    fireOptimizelyEvent(eventName);
};

waitForElement(`[data-testid="split-content-module"] a`)
.then(() => {
    document.querySelector('[data-testid="split-content-module"] a').addEventListener('click', () => {
        fireBothEvents("CK387 - Click on module CTA");
    });
})
.catch(e => {});
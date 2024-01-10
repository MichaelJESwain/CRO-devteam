//Old version
const {waitUntil} = window.optimizely.get('utils');

// send event to Adobe
const fireAdobeEvent = eventName => { 
    waitUntil(function() {
        return typeof window.utag !== 'undefined' && typeof window.utag.link !== 'undefined';
    }).then(function(){
        utag.link({ "event_name": `${eventName}` });
    });
};

// send event to Optimizely
const fireOptimizelyEvent = eventName => { 
    window.optimizely = window.optimizely || []; 
    window.optimizely.push({ type: 'event', eventName: eventName });
}; 

const fireBothEvents = eventName => { 
    fireAdobeEvent(eventName); 
    fireOptimizelyEvent(eventName);
};

// Example call
experimentElement.addEventListener('click', () => {
    fireBothEvents('<exp ID> - <event name>')
});

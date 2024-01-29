// New fancy way to send events to Adobe and Optmizely

const addToBag = document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
addToBag.addEventListener('click', function () {
  optimizely.sendAnalyticsEvents('<Event Name>');
})

// ======================================================

// IntersectionObserver
const observer = new window.IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        console.log(`do somenting`);
        optimizely.sendAnalyticsEvents('<Event Name>');
        return
    }
    //console.log('LEAVE')
  }, {
    root: null,
    threshold: 0.4, // set offset 0.4 means trigger if atleast 40% of element in viewport
  })
  
const element = document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
observer.observe(element);




// ======================================================  
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

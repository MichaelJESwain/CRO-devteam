window.CK295 = {
    fireAdobeEvent: (eventName) => {
      const utils = window["optimizely"].get("utils");
        utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
        utag.link({
            "event_name": `${eventName}`
        });
    });
    },
    fireOptimizelyEvent: (eventName) => {
        window['optimizely'] = window['optimizely'] || []
    
        window['optimizely'].push({
        type: 'event',
        eventName: eventName,
        })
      console.log(`Event fired: ${eventName}`);
    },
    fireBothEvents: (eventName) => {
        if (!window[`hasFiredEvent-${eventName}`]) {
        window[`hasFiredEvent-${eventName}`] = true
        window.CK295.fireAdobeEvent(eventName)
        window.CK295.fireOptimizelyEvent(eventName)
    
        setTimeout(() => {
            window[`hasFiredEvent-${eventName}`] = false
        }, 100)
        }
    },
  	handleAlmostSeenEvent: function(){
        window.CK295.fireBothEvents("CK295-change-seen-event");
    },
    observeElement: function(element){
        const observer = new window.IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {       
            window.CK295.handleAlmostSeenEvent();
            observer.disconnect(element);
          } 
          //not visible
        }, {
          root: null,
          threshold: 0.001, 
        })
        observer.observe(element);
    },
}
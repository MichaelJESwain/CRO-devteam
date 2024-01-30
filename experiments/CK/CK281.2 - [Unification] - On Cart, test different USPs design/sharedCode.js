const utils = window.optimizely.get('utils');
const fireAdobeEvent = (eventName) => {
    utils.waitUntil(function(){ return window.s && window.s.tl; }).then(function() {
        window.s.tl(this,"o", eventName);
    });
  };

const fireOptimizelyEvent = (eventName) => {
  window['optimizely'] = window['optimizely'] || [];

  window['optimizely'].push({
    type: 'event',
    eventName: eventName,
  });
};

const fireBothEvents = (eventName, isAuto) => {
  fireAdobeEvent(eventName);
  fireOptimizelyEvent(eventName);
};

function changesSeen(el) {
    if ('IntersectionObserver' in window) {
        if (el) {
            let observer;
            observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        fireBothEvents('CK281.2-changes-seen');
                        observer.disconnect();
                    }
                });
            }, { root: null,
              threshold: 0.9 });
            observer.observe(el);
        }
    }
}

utils.waitForElement(".cv_usp_div a").then(function() {
  document.querySelectorAll('.cv_usp_div a').forEach(function(item){
    item.addEventListener('click', function() {
      fireBothEvents('CK281.2-click-on-USP');
    });
  });
	
});

utils.waitForElement(".cv_usp_wrapper").then(function(wrapper) { 
	changesSeen(wrapper);
});
window.sharedTH233 = {
    waitForElement: function(cssSelector, cb){
        var t1 = new Date().getTime();
        var dif = 0;
        var reqAnId = window.requestAnimationFrame(lookForElement);
      
        function lookForElement() {
          var t2 = new Date().getTime();
          dif = (t2 - t1) / 1000;
      
          if (dif < 3) {
            if (elementFound()) {
              cb(cssSelector);
              cancelAnimationFrame(reqAnId);
            } else {
              window.requestAnimationFrame(lookForElement);
            }
          } else {
            cancelAnimationFrame(reqAnId);
          }
        }
        function elementFound() {
          var e = document.querySelector(cssSelector);
          if (e) {
            return true;
          } else {
            return false;
          }
        }
    },
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
     },
    addCss: function (css) {
        var s = document.createElement('style');
        s.innerHTML = css;
        var h = document.querySelector('head');
        h.appendChild(s);
        return s;
    },
  icon : `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8.4" stroke="#00174F" stroke-width="1.2"/>
    <path d="M9.59998 12.4C9.59998 12.7314 9.33135 13 8.99998 13C8.6686 13 8.39998 12.7314 8.39998 12.4L8.39998 7.6C8.39998 7.26863 8.66861 7 8.99998 7C9.33135 7 9.59998 7.26863 9.59998 7.6L9.59998 12.4Z" fill="#00174F"/>
    <path d="M9.59998 5.4C9.59998 5.73137 9.33135 6 8.99998 6C8.6686 6 8.39998 5.73137 8.39998 5.4C8.39998 5.06863 8.6686 4.8 8.99998 4.8C9.33135 4.8 9.59998 5.06863 9.59998 5.4Z" fill="#00174F"/>
    </svg>`,
    checkShoppingBag: () => { 
        window.sharedTH233.waitForElement('[data-testid="basket-IconWithBadge-component"]', () => {
          const targetNode = document.querySelector('[data-testid="basket-IconWithBadge-component"]');
          const config = { attributes: false, childList: true, subtree: true };
  
          const callback = (mutationList, observer) => {
            for (let mutation of mutationList) {
                if(mutation.type === 'childList'){
                    if(document.querySelector('[class*=IconWithBadge_IconCount__]') === null){
                        document.querySelector('.ext-bag-wrapper').style.display = "none";
                    }    
                }          
            }
          };
          window.thObs = new MutationObserver(callback);
          window.thObs.observe(targetNode, config);
        });
    },
};
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
const fireBothEvents = (eventName, isAuto) => {
    if (!window.sessionStorage[eventName.split(' ').join('')]) {
        fireAdobeEvent(eventName);
        fireOptimizelyEvent(eventName);
        window.sessionStorage[eventName.split(' ').join('')] = true;
    }
};

// Click on CHANGE-CTA in product card
utils.observeSelector('[data-testid="editOrderItem-pvh-button"]', function(){
    document.querySelectorAll('[data-testid="editOrderItem-pvh-button"]').forEach(function(cta){
      cta.addEventListener('click', function(){
        fireBothEvents("TH233 - Click on CHANGE-CTA in product card");
      });
    });
});
utils.observeSelector('[data-testid="stock-action"] button', function(){
    document.querySelectorAll('[data-testid="stock-action"] button').forEach(function(cta){
      cta.addEventListener('click', function(){
        fireBothEvents("TH233 - Click on CHANGE-CTA in product card");
      });
    });
});
// Click on REMOVE-CTA in product card
utils.observeSelector('[data-testid="deleteOrderItem-pvh-button"]', function(){
    document.querySelectorAll('[data-testid="deleteOrderItem-pvh-button"]').forEach(function(cta){
      cta.addEventListener('click', function(){
        fireBothEvents("TH233 - Click on REMOVE-CTA in product card");
      });
    });
});
utils.observeSelector('[data-testid="basketItem-cross-icon-pvh-icon-button"] svg', function(){
document.querySelectorAll('[data-testid="basketItem-cross-icon-pvh-icon-button"] svg').forEach(function(btn){
    btn.addEventListener('click', function(){
      fireBothEvents("TH233 - Click on REMOVE-CTA in product card");
    });
  });
});

// Changes seen event
function observeChanges(element){
  const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {   
        
        fireBothEvents("TH233 - Changes seen event");
        return;
      } 
      
    }, {
      root: null,
      threshold: 0.9, 
    });
    observer.observe(element);
}
utils.observeSelector('.ext-bag-wrapper', function() {
const element = document.querySelector('.ext-bag-wrapper');
setTimeout(() => {
  observeChanges(element);
}, 500);
});
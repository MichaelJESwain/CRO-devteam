window.sharedCK316 = {
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
    translations: {
        en: 'The items in the shopping bag are not reserved.',
        nl: 'Artikelen in de winkelmand zijn niet gereserveerd.',
        de: 'Artikel im Warenkorb werden nicht reserviert.',
        es: 'Los artículos en la Cesta no están reservados.',
        it: 'Gli articoli nel carrello non vengono riservati.',
        fr: 'Les articles dans le panier ne sont pas réservés.',
        pl: 'Artykuły w koszyku nie są zarezerwowane.',
    },
    icon : `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8.4" stroke="#000000" stroke-width="1.2"/>
    <path d="M9.59998 12.4C9.59998 12.7314 9.33135 13 8.99998 13C8.6686 13 8.39998 12.7314 8.39998 12.4L8.39998 7.6C8.39998 7.26863 8.66861 7 8.99998 7C9.33135 7 9.59998 7.26863 9.59998 7.6L9.59998 12.4Z" fill="#000000"/>
    <path d="M9.59998 5.4C9.59998 5.73137 9.33135 6 8.99998 6C8.6686 6 8.39998 5.73137 8.39998 5.4C8.39998 5.06863 8.6686 4.8 8.99998 4.8C9.33135 4.8 9.59998 5.06863 9.59998 5.4Z" fill="#000000"/>
    </svg>`,
    createMessage: function(){
        const language = window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale;
        const messageArea = document.createElement("div");
        messageArea.innerHTML = `${this.icon}<p class="ext-bag-message">${this.translations[language]}</p>`;
  
        messageArea.classList.add("ext-bag-wrapper");      
        return messageArea;
    },
    checkShoppingBag: () => { 
        window.sharedCK316.waitForElement('[data-testid="basket-IconWithBadge-component"]', () => {
          const targetNode = document.querySelector('[data-testid="basket-IconWithBadge-component"]');
          const config = { attributes: false, childList: true, subtree: true };
  
          const callback = (mutationList, observer) => {
            console.log("in the callback mutation")
            for (let mutation of mutationList) {
                if(mutation.type === 'childList'){
                    if(document.querySelector('[class*=IconWithBadge_IconCount__]') === null){
                        document.querySelector('.ext-bag-wrapper').style.display = "none";
                    }    
                }          
            }
          };
          window.ckObs = new MutationObserver(callback);
          window.ckObs.observe(targetNode, config);
        });
        
    },

};
const utils = window.optimizely.get('utils');  
utils.observeSelector('[data-testid="common-productlist"]', function(){
  if(document.querySelectorAll('[data-testid="basketItem"]').length >= 1){
    const items = document.querySelectorAll('[data-testid="basketItem"]');
    items[items.length - 1].style.borderBottom="1px solid #e4e4e4";
  }
});
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
// Click on CHANGE-CTA in product card
utils.observeSelector('[data-testid="editOrderItem-pvh-button"]', function(){
  document.querySelectorAll('[data-testid="editOrderItem-pvh-button"]').forEach(function(cta){
    cta.addEventListener('click', function(){
      fireBothEvents("CK316 - Click on CHANGE-CTA in product card");
    });
  });
});

// Click on REMOVE-CTA in product card
utils.observeSelector('[data-testid="deleteOrderItem-pvh-button"]', function(){
  document.querySelectorAll('[data-testid="deleteOrderItem-pvh-button"]').forEach(function(cta){
    cta.addEventListener('click', function(){
      fireBothEvents("CK316 - Click on REMOVE-CTA in product card");
    });
  });
});
utils.observeSelector('[data-testid="basketItem-cross-icon-pvh-icon-button"] svg', function(){
document.querySelectorAll('[data-testid="basketItem-cross-icon-pvh-icon-button"] svg').forEach(function(btn){
  btn.addEventListener('touchend', function(){
    fireBothEvents("CK316 - Click on REMOVE-CTA in product card");
  });
});
});

function isInViewport(el) {
  let rect = el.getBoundingClientRect();
  return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
}
function msgView(){
  const element = document.querySelector('.ext-bag-wrapper svg');
  if(isInViewport(element)){
    console.log('Event CK316 - Changes seen event Fired');
    document.removeEventListener("scroll", msgView);
    fireBothEvents("CK316 - Changes seen event");
  }
}
const waitForOptly = setInterval(function() {
  if (window.optimizely) {
      clearInterval(waitForOptly);
    window.optimizely.get('utils').observeSelector('.ext-bag-wrapper svg', function(element) {
      if(isInViewport(element)){
        document.removeEventListener("scroll", msgView);
        fireBothEvents("CK316 - Changes seen event");
      } else{
        document.addEventListener("scroll", msgView);
      } 
          
    }); 
  }
}, 100);
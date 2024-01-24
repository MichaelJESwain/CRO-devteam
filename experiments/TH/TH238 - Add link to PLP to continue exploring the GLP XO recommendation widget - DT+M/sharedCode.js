window.sharedTH238 = {
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
  placeBefore: function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
  },
  translations: {
      uk: 'Shop all',
      nl: 'Shop meer',
      de: 'Shop Alle',
      es: 'Ver más',
      it: 'Scopri di più',
      fr: 'Voir Plus',
      pl: 'Zobacz więcej',
  },
  linksSummer: { //this will change !!!
      women: {
        uk: '/womens-new-arrivals',
  nl: '/dames-nieuw-binnen',
  de: '/damen-neu-eingetroffen',
  es: '/mujeres-novedades',
  it: '/donna-nuovi-arrivi',
  fr: '/tendances-femme',
  pl: '/kobiety-nowosci',
      },
      men: {
        uk: '/men-vacation-store',
        nl: '/vakantieboetiek-heren',
        de: '/urlaubs-store-herren',
        es: '/tienda-vacaciones-hombres',
        it: '/uomini-negozio-vacanze',
        fr: '/homme-boutique-vacances',
        pl: '/mezczyzni-sklep-wakacyjny',
      }
    },
    createLink: function(){
      let pageGender;
      if(document.querySelector('[class*=gender-women_] [class*=nav__list--none-active_] [class*=nav__list-item_][class*=gender-women_]') !== null){
        pageGender = 'women';
      }
      else{
        pageGender = 'men';
      }
      const location = window.location.hostname.split('.')[0];
      return this.linksSummer[pageGender][location];
    },
};

/*
Then, on May 24th, the Women GLP widget only will change to:
 https://uk.tommy.com/womens-new-arrivals-tommy-hilfiger
*/

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

window.fireBothEvents = (eventName) => {
  if (!window[`hasFiredEvent-${eventName}`]) {
    window[`hasFiredEvent-${eventName}`] = true
    fireAdobeEvent(eventName)
    fireOptimizelyEvent(eventName)

    setTimeout(() => {
      window[`hasFiredEvent-${eventName}`] = false
    }, 100)
  }
};

// TH238 Clicks on the PLP tile/CTA in the GLP widget
function desktopTileEvent(){
utils.observeSelector('.ext-link-wrapper', function(){
  document.querySelector('.ProductSlider__keen.keen-slider [data-testid="ProductSlider-slide"]:nth-child(5) picture').addEventListener('click', function(){
      window.fireBothEvents("TH238 - Clicks on the PLP tile in the GLP widget");
    });
  });
}
function mobileTileEvent(){
  utils.observeSelector('.ext-link-wrapper', function(){
    document.querySelector('.ProductSlider__keen.keen-slider [data-testid="ProductSlider-slide"]:nth-child(3) picture').addEventListener('touchend', function(){
      window.fireBothEvents("TH238 - Clicks on the PLP tile in the GLP widget");
    });
  });
}
let device; 
utils.observeSelector('[class*=header__tab-actions_]', function(){
  device = window.__NEXT_DATA__.props.initialState.app.viewType;
  if(device === 'desktop'){
    desktopTileEvent();
  } else if(device === 'mobile'){
    mobileTileEvent();
  }
});
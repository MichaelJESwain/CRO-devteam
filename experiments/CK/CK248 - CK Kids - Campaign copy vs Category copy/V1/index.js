const utils = window["optimizely"].get('utils');

const dictionary = {
    gb: {
      sport: 'Swimwear',
      jump: 'Shoes',
      basics: 'Underwear',
      sportBeforeTranslation: "Kids' Summer",
      jumpBeforeTranslation: 'Jump In',
      basicsBeforeTranslation: "Favourite Underwear",
    },
    nl: {
      sport: 'Badmode',
      jump: 'Schoenen',
      basics: 'Ondergoed',
      sportBeforeTranslation: "Een zomer voor kids",
      jumpBeforeTranslation: 'Speeltijd',
      basicsBeforeTranslation: "Favoriet ondergoed",
    },
    de: {
      sport: 'Bademode',
      jump: 'Schuhe',
      basics: 'Unterwäsche',
      sportBeforeTranslation: "Sommer fpür Kids",
      jumpBeforeTranslation: 'Absprung',
      basicsBeforeTranslation: "Unterwäsche-Favoriten",
    },
    fr: {
      sport: 'Maillots De Bain',
      jump: 'Chaussures',
      basics: 'Sous-Vêtements',
      sportBeforeTranslation: "L’été des enfants",
      jumpBeforeTranslation: 'À Vos Marques',
      basicsBeforeTranslation: "Vos sous-vêtements préférés",
    },
    it: {
      sport: 'Costumi',
      jump: 'Scarpe',
      basics: 'Intimo',
      sportBeforeTranslation: "L’Estate dei Bambini",
      jumpBeforeTranslation: 'Fai un Salto',
      basicsBeforeTranslation: "L’Intimo Più Amato",
    },
    pl: {
      sport: 'Odzież Kąpielowa',
      jump: 'Obuwie',
      basics: 'Bielizna',
      sportBeforeTranslation: "Letnia kolekcja dla dzieci",
      jumpBeforeTranslation: 'Chwila Przerwy',
      basicsBeforeTranslation: "Twoja ulubiona bielizna",
    },
    es: {
      sport: 'Trajes De Baño',
      jump: 'Zapatos',
      basics: 'Ropa Interior',
      sportBeforeTranslation: "Chapuzón de verano",
      jumpBeforeTranslation: '¡Salta!',
      basicsBeforeTranslation: "Favoritos underwear",
    },
  };

utils.waitForElement("[class='kids --active'], [class='bambini --active'],[class='kinderen --active'], [class='kinder --active'],[class='enfants --active'], [class='dzieci --active'],[class='niños --active']").then(function() {      
  //console.log("kids experiment active"); 
  trigger();
});

function trigger(){     
    
    const storeCountry = window.digitalData.site.attributes.storeCountry;
    
    //first child of Module 5
    const titleSport = document.querySelector('[class="Module1Teaser--main-title"] p'); 
    if(titleSport !== null){
        titleSport.innerHTML = `${dictionary[storeCountry].sport}`;
    }
    
    //second child of Module 5
    const titleUnderwear = document.querySelector('[class="Module5__teaser-title"][data-testid="false"] p');
    if(titleUnderwear !== null) {
        titleUnderwear.innerHTML = `${dictionary[storeCountry].basics}`;
    }
    
    // ***Girls and Boys***
    
    //Sporty in menu module 
   const titleSportMenu = document.querySelectorAll(`div.mega-menu__third-level.mega-menu__third-level--categories a[title="${dictionary[storeCountry].sportBeforeTranslation}"] span.e-spots__card__sub-title`); 
    titleSportMenu[0].innerHTML = `${dictionary[storeCountry].sport}`;
    titleSportMenu[1].innerHTML = `${dictionary[storeCountry].sport}`;
    
    //Jump in menu module
    const titleJumpMenu = document.querySelectorAll(`div.mega-menu__third-level.mega-menu__third-level--categories a[title="${dictionary[storeCountry].jumpBeforeTranslation}"] span.e-spots__card__sub-title`);
    titleJumpMenu[0].innerHTML = `${dictionary[storeCountry].jump}`; 
    titleJumpMenu[1].innerHTML = `${dictionary[storeCountry].jump}`;
    
    //basics element in menu module
    const titleBasicsMenu = document.querySelectorAll(`div.mega-menu__third-level.mega-menu__third-level--categories a[title="${dictionary[storeCountry].basicsBeforeTranslation}"] span.e-spots__card__sub-title`);
  	  
    titleBasicsMenu[0].innerHTML = `${dictionary[storeCountry].basics}`;
    titleBasicsMenu[1].innerHTML = `${dictionary[storeCountry].basics}`;    

}

//  ***Adobe event***

function adobeFireEvent() {
  utils
    .waitUntil(function () {
    	//console.log('Adobe event was fired 1');
      return window.s && window.s.tl;
    })
    .then(function () {
    	//console.log('Adobe event was fired 2');
      window.s.tl(this, 'o', 'CK248 - Campaign CTR - click on campaign image');
    });
}

function addingEventListeners(images) {
  images.forEach((image) => {
    if (image.className === 'e-spots__card__image') {
      image.addEventListener('click', adobeFireEvent);
      image.classList.add('EXT_Class');
      //console.log('Adobe function was added');
    }
  });
}

let device = window.digitalData.site.attributes.siteDeviceVersion;

if (device === 'desktop' && !window.ckObs) {
  const config = { attributes: true, childList: true, subtree: true };
  const elements = document.querySelectorAll('#mega-menu__second-level');
  const element = elements[2];

  // ==========
  const callbackWrapper = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      const imagesCampaign = document.querySelectorAll('#eSpot > a > div > img');
      if (imagesCampaign && imagesCampaign.length > 0) {
        const imagesCampaign = document.querySelectorAll('#eSpot > a > div > img');
        
        if(imagesCampaign.length === 6){
        	window.ckObs.disconnect();
        } 
        
        addingEventListeners(imagesCampaign);
      }
    }
  };
  // ==========

  window.ckObs = new MutationObserver(callbackWrapper);
  window.ckObs.observe(element, config);
}

// For the PDP pages
utils.observeSelector('.colour-swatch-selectors__selectors', () => {
    //console.log("the color changed");    
    trigger();
});

const {waitUntil, waitForElement, observeSelector} = window.optimizely.get('utils');

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

const variant = {
    _25238100508: {
        module: '[data-testid="Recommendations-component-pdp_rec_injection2"]',
        moduleTile: '[data-testid="Recommendations-component-pdp_rec_injection2"] [data-testid="ProductTile-component"] a',
        moduleForm: '[data-testid="Recommendations-component-pdp_rec_injection2"] [data-testid="ProductTile-component"] [data-testid="SingleSelectForm-component"]',
    },
    _25261140534: {
        module: ".TH282_reccGrid_container",
        moduleTile: '.TH282_reccGrid_container [data-testid="ProductTile-component"] a',
        moduleForm: '.TH282_reccGrid_container [data-testid="SingleSelectForm-component"]',
        loadMoreBtn: ".TH282_reccGrid_button"
    },
    _25228390440: {
        module: ".TH282_reccGrid_container",
        moduleTile: '.TH282_reccGrid_container [data-testid="ProductTile-component"] a',
        loadMoreBtn: ".TH282_reccGrid_button"
    }
}[`_${window.optimizely.get("state").getExperimentStates()['25253660216'].variation.id}`];

// Changes seen event
//Ana's idea

//
waitForElement(variant.module)
    .then(module2 => {
        let options = {
            root: null,
            rootMargin: "-100px",
            threshold: 0,
          };
        
          let callback = (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                fireBothEvents("TH282 PDP Widget 2 in viewport");
                observer.disconnect();
              }
            });
          };          
          let observer = new IntersectionObserver(callback, options);
            observer.observe(module2);
    });


 // clicks on product
waitForElement(variant.moduleTile)
    .then(() => {
        const tileLinks = document.querySelectorAll(variant.moduleTile);

        tileLinks.forEach(link => {
            link.addEventListener("click", () => {
                fireBothEvents('TH282 PDP Widget 2 - clicks on product');
            }, {once: true});
        });
    });

// Clicks on "Load more" button
if (variant.loadMoreBtn) {
    waitForElement(".TH282_reccGrid_button")
    .then(reccGridBtn => {
        reccGridBtn.addEventListener("click", () => {
            fireBothEvents("TH282 PDP Widget 2 - Load more");
        }, {once: true});
    });
}

if (variant.moduleForm) {
    observeSelector(variant.moduleForm, module2Form => {
        // select size
        const callback = (mutationList, observer) => {
          for (const mutation of mutationList) {
            if (mutation.type === "attributes" && mutation.attributeName === "value") {
                fireBothEvents('TH282 PDP Widget 2 - select size');
                observer.disconnect();
            }
          }
        };
        const config = { attributes: true, childList: true, subtree: true };
        const targetNode = module2Form.querySelector('[data-testid="Recommendations-size-selectInput-inputField"]');
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    
        // Add to bag
        const button = module2Form.querySelector('[data-testid*="Recommendations-add-button-pdp_rec_injection2"]');
        button.addEventListener("click", () => {
            if (targetNode.getAttribute("value") !== "") {
                fireBothEvents('TH282 PDP Widget 2 - Add to bag');
            }
        });
    });
}
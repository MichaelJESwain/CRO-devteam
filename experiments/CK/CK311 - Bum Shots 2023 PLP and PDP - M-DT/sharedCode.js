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
const fireBothEvents = (eventName) => {
    fireAdobeEvent(eventName);
    fireOptimizelyEvent(eventName);
};

function observeSlider(element, productId){
    const config = { attributes: true, subtree: true, attributeFilter: ["class"], };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "attributes" && mutation.attributeName === 'class' && mutation.target.getAttribute('class') === 'slick-active') {
            fireBothEvents('CK311 - Swipe through available images on PLP');
          }
        }
      };
      if (optimizely[productId]) {
        optimizely[productId].disconnect();
      }
      optimizely[productId] = new MutationObserver(callback);
    optimizely[productId].observe(element, config);
}

let mousePos_start;
let mousePos_end;

window.optimizely.get('utils').observeSelector('.products__item .slick-dots ul', slider => {
    slider.closest('.product-list__product').addEventListener('mousedown', function(event) {
      mousePos_start = event.clientX;
  });
  
    slider.closest('.product-list__product').addEventListener('mouseup', function(event) {
      mousePos_end = event.clientX;
  });
  
  slider.addEventListener('mouseover', function() {
  	
  });
  
      const productId = slider.closest('.product-list__product').getAttribute('id');
	observeSlider(slider, productId);
});

optimizely.handleClickOnBumShot = function(ev) {
  let isNotSwipe = Math.abs(mousePos_start - mousePos_end) < 20 ? true : false;
 
  if (ev.target.classList && 
      !ev.target.classList.contains('slick-arrow') && 	
      !ev.target.parentElement.classList.contains('slick-arrow') &&
      !ev.target.parentElement.parentElement.classList.contains('slick-arrow') &&
      !ev.target.classList.contains('wishlist-icon--add') && 
    !ev.target.parentElement.classList.contains('wishlist-icon--add') &&
     isNotSwipe) {
		fireBothEvents('CK311 - Click on product card bum shot');
  }
};

window.optimizely.get('utils').observeSelector('.CK311_changed_product', function(product) {
	product.setAttribute('onclick', 'optimizely.handleClickOnBumShot(event)');

});

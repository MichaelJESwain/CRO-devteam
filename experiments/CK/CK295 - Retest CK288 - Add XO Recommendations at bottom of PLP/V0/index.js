// Event: Click on product on carousel
const utils = window["optimizely"].get("utils");

function handleClick(){
    window.CK295.fireBothEvents('CK295-click-product-carousel');
}
utils.waitForElement('[data-testid="recommendations-container recentlyViewed"]').then(function(){
    document.querySelectorAll('.recommendation-item').forEach(function(item){
        item.addEventListener('click', handleClick);
    });
});

// Change seen event
utils.waitForElement('[data-testid="recommendations-container recentlyViewed"]').then(function(){
  const element = document.querySelector('[data-testid="recommendations-container recentlyViewed"]');
    window.CK295.observeElement(element);
});
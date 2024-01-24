function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;
		function checkPage(){
      if(
document.querySelector('[class*=gender-women_] [class*=nav__list--none-active_] [class*=nav__list-item_][class*=gender-women_]') ||
document.querySelector('[class*=gender-men_] [class*=nav__list--none-active_] [class*=nav__list-item_][class*=gender-men_]')
      ){
        return true;
      } else{
        return false;
      }
    }
    function check() {
      if (document.querySelector('[data-testid="glp-page"]') !== null &&
      checkPage() &&
      document.querySelector('[data-testid="THAbTest"] .ProductSlider__container') &&
      document.querySelector('[data-testid="THAbTest"] .ProductSlider__title') &&
      document.querySelectorAll('.ResponsiveImage img') &&
      document.querySelectorAll('.ResponsiveImage img').length >= 1 &&
document.querySelectorAll('[data-testid="THAbTest"] .ProductSlider__keen.keen-slider .ProductSlider__keen__slide-data') && document.querySelectorAll('[data-testid="THAbTest"] .ProductSlider__keen.keen-slider .ProductSlider__keen__slide-data').length >= 1 && document.querySelectorAll('.ResponsiveImage.ProductSlider__keen__slide__hover-image') && document.querySelectorAll('.ResponsiveImage.ProductSlider__keen__slide__hover-image').length >= 1 && document.querySelectorAll('[data-testid="wishlist__toggle--container"]') && document.querySelectorAll('[data-testid="wishlist__toggle--container"]').length >= 1 && document.querySelectorAll('.ProductSlider__keen__slide__content-wrapper') &&
document.querySelectorAll('.ProductSlider__keen__slide__content-wrapper').length >= 1 && window.__NEXT_DATA__.props.initialState.app.viewType !== null 
         ) {
        return true;
      } else {
        return false;
      }
    }
    
    var interval = setInterval(function () {
      var t2 = new Date().getTime();
      dif = (t2 - t1) / 1000;
  
      if (dif > maxSeconds) {
        clearInterval(interval);
      } else if (check()) {
        clearInterval(interval);
        activate();
      }
    }, 100);
      
}
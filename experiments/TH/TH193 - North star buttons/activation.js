function callbackFn(activate) {
    const utils = window.optimizely.get('utils');
    
    utils.waitUntil(function() {
    return !window.location.href.includes('wishlist') && !window.location.href.includes('checkout');
      }).then(function() {
        activate();
      });
}

// URL Match:
// (pl|nl|de|es|uk|fr|it|be|cz|dk|hr|ie|lv|lt|lu|hu|at|pt|ch|si|sk|fi|se).tommy.com
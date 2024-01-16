// TH173.2 Scroll through - recommendations
optimizely.utils.observeSelector('[class*=Recommendations_NavButton__]', (element) => {
    element.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
            optimizely.sendAnalyticsEvents('TH173.2 Scroll through - recommendations')
        })
    })
})
// TH173.2 click on product - recommendations
optimizely.utils.observeSelector('[data-testid="Recommendations-component-glp_rec_injection1"]', (element) => {
    element.querySelectorAll('[data-testid="CarouselItem"] a').forEach(function (product) {
        product.addEventListener('click', function () {
            optimizely.sendAnalyticsEvents('TH173.2 click on product - recommendations');
        })
    })
})
// TH173.2 add to wishlist - recommendations
optimizely.utils.observeSelector('[data-testid="Recommendations-component-glp_rec_injection1"]', (element) => {
   element.querySelectorAll('[data-testid="WishListAdornment-component"]').forEach(function (product){
        product.addEventListener('click', function () {
            optimizely.sendAnalyticsEvents('TH173.2 add to wishlist - recommendations');
        })
    })
})
// TH173.2 Changes seen
optimizely.utils.observeSelector('[data-testid="Recommendations-component-glp_rec_injection1"] h2', (element) => {
    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        optimizely.sendAnalyticsEvents('TH173.2 Changes seen');
        observer.disconnect();
        return
      }
    }, {
      root: null,
      threshold: 1,
    })
    observer.observe(element);
})
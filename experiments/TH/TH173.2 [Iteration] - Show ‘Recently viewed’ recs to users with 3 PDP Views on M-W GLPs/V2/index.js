const th173 = {
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    },
    events: function () {
        const widgets = document.querySelectorAll('[data-testid="Recommendations-component-glp_rec_injection1"]');
        const recommendations = widgets[1];
        const recentlyWidget = document.querySelector('.exp-active-exp')
 recommendations.querySelectorAll('[data-testid="carousel-arrow-nav"] button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                optimizely.sendAnalyticsEvents('TH173.2 Scroll through - recommendations')
            })
        })
        recommendations.querySelectorAll('[data-testid="CarouselItem"] a').forEach(function (product) {
            product.addEventListener('click', function () {
                optimizely.sendAnalyticsEvents('TH173.2 click on product - recommendations');
            })
        })
        recommendations.querySelectorAll('[data-testid="WishListAdornment-component"]').forEach(function (product) {
            product.addEventListener('click', function () {
                optimizely.sendAnalyticsEvents('TH173.2 add to wishlist - recommendations');
            })
        })
        recentlyWidget.querySelectorAll('[data-testid="carousel-arrow-nav"] button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                optimizely.sendAnalyticsEvents('TH173.2 Scroll through - recently viewed')
            })
        })
        recentlyWidget.querySelectorAll('[data-testid="CarouselItem"] a').forEach(function (product) {
            product.addEventListener('click', function () {
                optimizely.sendAnalyticsEvents('TH173.2 click on product - recently viewed');
            })
        })
document.querySelectorAll('.exp-active-exp [data-testid="WishListAdornment-component"]').forEach(function (product) {
                product.addEventListener('click', function () {
                    optimizely.sendAnalyticsEvents('TH173.2 add to wishlist - recently viewed');
                })
            })
   
  optimizely.utils.observeSelector('.exp-active-exp h2', (element) => {
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
    },
    mainFunction: function () {
        const widgets = document.querySelectorAll('[data-testid="Recommendations-component-glp_rec_injection1"]');
        const recommendations = widgets[0];
        const recentlyWidget =document.querySelector('.exp-active-exp');
 let refRecommend;
 if(document.querySelector('[data-testid="split-container"]') != null){
    refRecommend = document.querySelector('[data-testid="split-container"]').parentElement;
} 
       
        th173.placeAfter(recommendations, refRecommend);
        recentlyWidget.classList.remove('exp-hide');
      optimizely.utils.waitForElement('.exp-active-exp [data-testid="WishListAdornment-component"]').then(function(){
       th173.events();
      })
       
    }
}
optimizely.utils.observeSelector('.exp-active-exp', () => {
th173.mainFunction();
})
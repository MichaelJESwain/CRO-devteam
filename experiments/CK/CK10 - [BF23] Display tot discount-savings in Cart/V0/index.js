const optimizelyTools = window.optimizely.optimizelyTools || null;

const ck10Original = () => {
  
  if(!optimizelyTools || !optimizelyTools.restyleElements || !optimizelyTools.elementSeenCallback) {
    return false;
  }
	
	const selectorPath = `[data-testid="BasketOverview-Discount-PriceText"], [data-testid="BasketOverview-ProductDiscount-PriceText"]`;
    optimizely.get('utils').observeSelector(selectorPath, function(discountPrice) {
    	
    	
      // set tracking listener
      const observer = new IntersectionObserver(optimizelyTools.elementSeenCallback, optimizelyTools.options);
      const totSavingsBanner = document.querySelector('[data-testid="tot-savings-BannerCard"]');
      optimizelyTools.languageCheck(totSavingsBanner);
      const isTracked = totSavingsBanner.getAttribute("data-tagged");
      if(!isTracked) {
      	discountPrice.setAttribute("data-tagged", true);
        observer.observe(totSavingsBanner);
			}
    });
};

ck10Original();
const optimizelyTools = window.optimizely.optimizelyTools || null;
  
const ck10v2 = () => {
  
  if(!optimizelyTools || !optimizelyTools.restyleElements) {
    return false;
  }
  
	const selectorPath = `[data-testid="BasketOverview-Discount-PriceText"], [data-testid="BasketOverview-ProductDiscount-PriceText"]`;
	optimizely.get('utils').observeSelector(selectorPath, function(discountPrice) {
    	
    	// restlye discount price
    	optimizelyTools.restyleElements(discountPrice, null, 'v2');
    	
    	// hide banner
    	const totSavingsBanner = document.querySelector('[data-testid="tot-savings-BannerCard"]');
    	if(totSavingsBanner) {
    		totSavingsBanner.remove();
    	}
    
    	// set tracking
      const observer = new IntersectionObserver(optimizelyTools.elementSeenCallback, optimizelyTools.options);
      const isTracked = discountPrice.getAttribute("data-tagged");
      if(!isTracked) {
      	discountPrice.setAttribute("data-tagged", true);
        observer.observe(discountPrice);
			}
    	
	});
};

ck10v2();
const optimizelyTools = window.optimizely.optimizelyTools || null;

const th09v1 = () => {

  if(!optimizelyTools || !optimizelyTools.restyleElements) {
    return false;
  }
	
	const selectorPath = `[data-testid="BasketOverview-Discount-PriceText"], [data-testid="BasketOverview-ProductDiscount-PriceText"]`;
    optimizely.get('utils').observeSelector(selectorPath, function(discountPrice) {
    	// restyle banner and price
			const totSavingsBanner = document.querySelector('[data-testid="tot-savings-BannerCard"]');
      optimizelyTools.languageCheck(totSavingsBanner);
    	optimizelyTools.restyleElements(discountPrice, totSavingsBanner, 'v1');
      
      // set tracking listener
      const observer = new IntersectionObserver(optimizelyTools.elementSeenCallback, optimizelyTools.options);
      const isTracked = totSavingsBanner.getAttribute("data-tagged");
      if(!isTracked) {
      	totSavingsBanner.setAttribute("data-tagged", true);
        observer.observe(totSavingsBanner);
			}
    	
    });
};

th09v1();
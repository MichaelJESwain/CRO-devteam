function callbackFn(activate, options) {
    const selectorPath = `[data-testid="BasketOverview-Discount-PriceText"], [data-testid="BasketOverview-ProductDiscount-PriceText"]`;
    optimizely.get('utils').waitForElement(selectorPath).then(data => {
      activate();
      });
  }
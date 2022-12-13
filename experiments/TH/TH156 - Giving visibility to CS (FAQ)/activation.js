function callbackFn(activate) {
    var elementInterval;
  
    function check() {
      if (
        window &&
        window.digitalData &&
        window.digitalData.site &&
        window.digitalData.site.attributes &&
        window.digitalData.site.attributes.storeCountry &&
        document.querySelector('[data-testid="sign-in-button"]') &&
        document.querySelector('[data-testid="WishlistCount__icon"]') &&
        document.querySelector('[data-testid="MiniBasketToggle__link"] > span')
      ) {
        clearInterval(elementInterval);
				activate();
      }
    }
  
    elementInterval = setInterval(check, 100);
  }

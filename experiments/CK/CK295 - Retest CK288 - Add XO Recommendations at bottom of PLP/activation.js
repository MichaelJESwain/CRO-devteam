function callbackFn(activate, options) {
    var mainInterval = setInterval(check, 50);
  
    function check() {
      if (
        window.digitalData &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        (window.digitalData.page.category.pageType === 'plp' || window.digitalData.page.category.pageType === 'search results page') &&
        document.querySelector('[data-testid="recommendations-container recentlyViewed"]')
      ) {
        activate();
        clearInterval(mainInterval);
      }
    }
}
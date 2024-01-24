function callbackFn(activate, options) {
    var t1 = new Date().getTime()
    var dif = 0

    var interval = setInterval(function () {
      var t2 = new Date().getTime()
      dif = (t2 - t1) / 1000
  
      if (dif > 5) {
        clearInterval(interval)
      } else if (
        window &&
        window.digitalData &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        window.digitalData.page.category.pageType === "glp" &&
        document.querySelector('[data-testid="THMoreCategories--teaser"]') &&
        document.querySelector('.THMoreCategories .cta-blue-border-transparent') &&
        document.querySelector('.THMoreCategories--teaser__links .cta')
        ){
        clearInterval(interval);
        activate();
      }
    }, 100);
}
function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;
  
  function isShoppingCartPage(){
      if(document.querySelector('[data-testid="ShoppingBagContainer__cta"]') && 
        document.querySelector(".SectionHeader") &&
        document.querySelector('[data-testid="startCheckoutBtn"]') &&
        window.location.href.indexOf("shopping-bag") > -1 &&
        document.querySelector("[data-testid='basket-count']")
        ){
        return true;
      } else {
      	return false;
      }
    }
    function isCheckoutPage(){
      if(document.querySelector('[data-testid="CheckoutBreadCrumb"]')){
        return true;
      } else {
        return false;
      }
    }
  
    function check() {
      if (
        window &&
        window.digitalData &&
        window.digitalData.site &&
        window.digitalData.site.attributes &&
        window.digitalData.site.attributes.storeLanguage &&
        window.digitalData.site.attributes.storeLanguage[0] &&
        window.digitalData.site.attributes.storeLanguage[1] &&
        window.digitalData.site.attributes.siteDeviceVersion &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        (window.digitalData.page.category.pageType === 'cart' ||
        window.digitalData.page.category.pageType === 'checkout - details' ||
        window.digitalData.page.category.pageType === 'checkout - delivery' ||
        window.digitalData.page.category.pageType === 'checkout - payment') &&
        (isShoppingCartPage() || isCheckoutPage()) 
                 
      ) {
        return true;
      } else {
        return false;
      }
    }
  
    var interval = setInterval(function () {
      var t2 = new Date().getTime();
      dif = (t2 - t1) / 1000;
  
      if (dif > maxSeconds) {
        clearInterval(interval);
      } else if (check()) {
        clearInterval(interval);
        //console.log("my page is working")
        activate();
      }
    }, 100);
  const waitForPagetype = (pagetype, callback) => {
      const waitForRouter = (cb) => {
        var t1 = new Date().getTime()
        var dif = 0
        var reqAnId = window.requestAnimationFrame(lookForElement)
    
        function lookForElement() {
          var t2 = new Date().getTime()
          dif = (t2 - t1) / 1000
    
          if (dif < 3) {
            if (elementFound()) {
              cb()
              cancelAnimationFrame(reqAnId)
            } else {
              window.requestAnimationFrame(lookForElement)
            }
          } else {
            cancelAnimationFrame(reqAnId)
          }
        }
    
        function elementFound() {
          if (
            window &&
            window.next &&
            window.next.router &&
            window.next.router.events &&
            window.next.router.events.on &&
            typeof window.next.router.events.on === 'function' &&
            window.digitalData &&
            window.digitalData.page &&
            window.digitalData.page.category &&
            window.digitalData.page.category.pageType
          ) {
            return true
          } else {
            return false
          }
        }
      }
    
      if (!pagetype || !typeof pagetype === 'string') {
        throw new Error('Invalid pagetype, must be string')
      }
    
    //  if (window[`check-${pagetype}`]) {
    //    throw new Error('Already listening')
   //   } else {
        window[`check-${pagetype}`] = true
    
        waitForRouter(() => {
          if (window.next.router.route === pagetype) {
            callback()
            window.next.router.events.on('routeChangeComplete', function (route) {
              if (route === pagetype) {
                callback()
              }
            })
          } else {
            window.next.router.events.on('routeChangeComplete', function (route) {
              if (route === pagetype) {
                callback()
              }
            })
          }
        })
    //  }
    }
    waitForPagetype('/shopping-bag', activate);
    waitForPagetype('/checkout/payment', activate);
  
  const waitForElement = (cssSelector, cb) => {
    var t1 = new Date().getTime();
    var dif = 0;
    var reqAnId = window.requestAnimationFrame(lookForElement);

    function lookForElement() {
      var t2 = new Date().getTime();
      dif = (t2 - t1) / 1000;

      if (dif < 3) {
        if (elementFound()) {
          cb(cssSelector);
          cancelAnimationFrame(reqAnId);
        } else {
          window.requestAnimationFrame(lookForElement);
        }
      } else {
        cancelAnimationFrame(reqAnId);
      }
    }
    function elementFound() {
      var e = document.querySelector(cssSelector);
      if (e) {
        return true;
      } else {
        return false;
      }
    }
  };

  waitForElement('[data-testid="notification"]', () => {
  	activate();
  });
}
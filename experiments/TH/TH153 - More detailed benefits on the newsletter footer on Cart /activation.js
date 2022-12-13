function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;
  
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
        window.digitalData.site.attributes.siteDeviceVersion.length > 0 &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        window.digitalData.page.category.pageType === 'cart' &&
        window.location.href.indexOf("shopping-bag") > -1 &&
        document.querySelector('[data-testid="startCheckoutBtn"]') &&
        document.querySelector('[class*=newsletter-footer_]') &&
        document.querySelector('[data-testid="Button-contrast"]') &&
        document.querySelector('[data-testid="NewsletterFooter"]') &&
        document.querySelector('[data-testid="shoppingBagUspBanner"]')
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
        //console.log("my page is working");
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
    
      if (window[`check-${pagetype}`]) {
        throw new Error('Already listening')
      } else {
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
      }
    }
    waitForPagetype('/shopping-bag', activate);
  }  
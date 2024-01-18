function callbackFn(activate) {
    var elementInterval;
  
    function check() {
      if (
        window &&
        window.digitalData &&
        window.next &&
        window.next.router &&
        window.next.router.events &&
        typeof window.next.router.events.on === 'function' &&
        typeof window.requestAnimationFrame === 'function' &&
        document.querySelector('[data-testid="ShippingOptionWithTabs-component"]')
      ) {
        clearInterval(elementInterval);
  
        if (window.next.router.route === '/checkout/shipping') {
          activate();
        } else {
          window.next.router.events.on('routeChangeComplete', function (route) {
            if (route === '/checkout/shipping') {
              activate();
            }
          });
        }
      }
    }

    elementInterval = setInterval(check, 100);
  }
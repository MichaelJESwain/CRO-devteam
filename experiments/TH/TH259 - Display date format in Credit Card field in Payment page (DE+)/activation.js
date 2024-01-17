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
        document.querySelector('label.adyen-checkout__label [data-id="encryptedExpiryDate"]') &&
        document.querySelectorAll('[data-testid="paymentMethods-wrapper"] > div').length > 1
      ) {
        clearInterval(elementInterval);
  
        if (window.next.router.route === '/checkout/payment') {
          activate();
        } else {
          window.next.router.events.on('routeChangeComplete', function (route) {
            if (route === '/checkout/payment') {
              activate();
            }
          });
        }
      }
    }

    elementInterval = setInterval(check, 100);
  }
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
        document.querySelector('[data-testid="payments-wrapper"]') &&
        document.querySelector('[class*="PaymentMethods_PaymentsAdditionalText__"]') &&
        document.querySelector('[class*="SelectionItem_titleTextWrapper__"]') &&
        document.querySelectorAll('[data-testid="paymentMethods-wrapper"] label')
      ) {
        clearInterval(elementInterval);
  
        if (window.next.router.route === '/checkout/payment') {
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

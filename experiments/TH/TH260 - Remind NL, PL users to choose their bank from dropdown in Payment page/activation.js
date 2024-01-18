function callbackFn(activate) {
    var elementInterval;
  
    function check() {
      if (
        window &&
        window.digitalData &&
        window.__NEXT_DATA__.props.pageProps &&
        window.next &&
        window.next.router &&
        window.next.router.events &&
        typeof window.next.router.events.on === 'function' &&
        typeof window.requestAnimationFrame === 'function' &&
        document.querySelector('[data-testid="payments-wrapper"]') &&
        document.querySelectorAll('[data-testid="paymentMethods-wrapper"] label') &&
        (document.querySelector('[data-testid="ideal-payment-method"]') ||
        document.querySelector('[data-testid="onlineBanking_PL-pvh-selectionItem"]')) &&
        (document.querySelector('[data-testid="ideal-container"]') || 
        document.querySelector('[data-testid="onlineBanking_PL-container"]')) 
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
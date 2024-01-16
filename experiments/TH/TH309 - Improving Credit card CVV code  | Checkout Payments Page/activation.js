function callbackFn(activate, options) {
    optimizely.utils.waitUntil(() => {
            return window &&
            document.querySelector('[data-testid="paymentMethods-wrapper"]') &&
            document.querySelector('[data-testid="revealContent-scheme-payment-method"]') &&
            document.querySelector('.adyen-checkout__card__form') &&
            document.querySelector('.adyen-checkout__card__exp-cvc') &&
            window.next &&
            window.next.router &&
            window.next.router.events &&
            typeof window.next.router.events.on === 'function' &&
            typeof window.requestAnimationFrame === 'function' ;
        }).then(() => {
            if (window.next.router.route === '/checkout/payment') {
                console.log("TH309 active")
              activate();
            } else {
              window.next.router.events.on('routeChangeComplete', function (route) {
                if (route === '/checkout/payment') {
                    console.log("TH309 active")
                  activate();
                }
              });
            }
        })
    
}
function callbackFn(activate) {
    var elementInterval;
  
    function check() {
      if (
        window &&
        window.digitalData &&
        document.querySelector('[data-testid="NewsletterBanner-component"] [data-testid="split-image-module"]') &&
        document.querySelector('[data-testid="NewsletterSignUpForm-component"] p') &&
        document.querySelector('[data-testid="MembershipBenefits-component"] h4') &&
        window.next &&
        window.next.router &&
        window.next.router.events &&
        typeof window.next.router.events.on === 'function' &&
        typeof window.requestAnimationFrame === 'function' 
       
      ) {
        clearInterval(elementInterval);
  
        if (window.next.router.route === '/shopping-bag') {
          activate();
        } else {
          window.next.router.events.on('routeChangeComplete', function (route) {
            if (route === '/shopping-bag') {
              activate();
            }
          });
        }
      }
    }
    elementInterval = setInterval(check, 100);
  }
function callbackFn(activate) {
    let elementInterval;
    
    function checkOrigin(){
        if(document.referrer === ''){
          return true;
        } else if(document.referrer.includes('tommy') === true){
          return true
        }
      }
    function check() {         
        if (
            window &&
            checkOrigin() &&
            window.digitalData &&
            window.digitalData.cart &&
            window.digitalData.cart.item &&
            window.digitalData.cart.item.length > 0 &&
            document.querySelector('[data-testid="page-notification-transition"]') &&
           document.querySelector('[class*=mini_bag_notification_mb_notification_imageContainer__]') &&
            window.digitalData.cart.item[0].productCombi &&
            window.digitalData.cart.item[0].productName
        ) {
            clearInterval(elementInterval);
            activate();
        }
    }
    elementInterval = setInterval(check, 100);
}
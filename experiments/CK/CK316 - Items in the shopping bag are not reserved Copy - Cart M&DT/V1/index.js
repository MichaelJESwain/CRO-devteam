const CK316 = {
    mainFunction: () => {
     if(document.querySelector(".ext-bag-class") === null && document.querySelector('[data-testid="ShoppingBagProducts-GridItem"]') !== null){
      const messageArea = window.sharedCK316.createMessage();
      messageArea.classList.add("ext-bag-class");
      let reference;    
  
  window.digitalData.site.attributes.siteDeviceVersion === 'desktop' ? reference = document.querySelector('[data-testid="filledShoppingBagTopCtas"]') :
              reference = document.querySelector('[class*=FilledShoppingBag_FilledShoppingBagMobileHeader__]');
              
      window.sharedCK316.waitForElement(`[data-testid="ShoppingBagProducts-GridItem"]`, () => {
         window.sharedCK316.placeAfter(messageArea, reference);
      });
            
      } 
      },
      start: function(){
     this.mainFunction();
     window.sharedCK316.checkShoppingBag();
    }
  
  };
  const utils = window.optimizely.get('utils');
  utils.observeSelector(`[data-testid="filledShoppingBagTopCtas"]`, function(){
    CK316.start();
  });
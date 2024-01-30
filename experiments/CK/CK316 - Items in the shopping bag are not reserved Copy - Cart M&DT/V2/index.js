const CK316 = {
    handleAddToBag: function(){
     const message = document.querySelector(".ext-bag-wrapper");
     window.sharedCK316.waitForElement('[data-testid="common-productlist"] [data-testid="basketItem"]:last-child', () => {
     const reference = document.querySelector('[data-testid="common-productlist"] [data-testid="basketItem"]:last-child');
      window.sharedCK316.placeAfter(message, reference);
      });
      },
      checkItems: function(){ 
          window.sharedCK316.waitForElement('[data-testid="ShoppingBagProducts-GridItem"]', () => {
            const targetNode = document.querySelector('[data-testid="ShoppingBagProducts-GridItem"]');
            const config = { attributes: false, childList: true, subtree: true };
    
            const callback = (mutationList, observer) => {
              for (let mutation of mutationList) {
                if(mutation.type === 'childList'){
                  setTimeout(() => {
                    this.handleAddToBag();
                  }, 2500);
                }       
              }
            };
            window.ck316Obs1 = new MutationObserver(callback);
            window.ck316Obs1.observe(targetNode, config);
          });
          
      },
     mainFunction: () => {
       if(document.querySelector(".ext-bag-class") === null && document.querySelector('[data-testid="ShoppingBagProducts-GridItem"]') !== null){
        const messageArea = window.sharedCK316.createMessage();
        messageArea.classList.add("ext-bag-class");
        let reference;
  
        window.sharedCK316.waitForElement('[data-testid="common-productlist"] [data-testid="basketItem"]:last-child', () =>{
  reference = document.querySelector('[data-testid="common-productlist"] [data-testid="basketItem"]:last-child');
        window.sharedCK316.placeAfter(messageArea, reference);
         });
              
     } else {
        document.querySelector(".ext-bag-wrapper").classList.remove("ext-bag-class");
        document.querySelector(".ext-bag-wrapper").style.display = "none";
       }
      },
      start: function(){
          CK316.mainFunction();
          window.sharedCK316.checkShoppingBag();
          CK316.checkItems();
      }
  };
  
const utils = window.optimizely.get('utils');
utils.observeSelector(`[data-testid="filledShoppingBagTopCtas"]`, function(){
    CK316.start();
});
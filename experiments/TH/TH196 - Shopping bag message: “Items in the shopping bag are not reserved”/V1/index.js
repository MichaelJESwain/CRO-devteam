const Experiment = (() => {    
    const checkShoppingBag = () => {         
        window.TH196.waitForElement('[data-testid="MiniBasketToggle"]', () => {
        const targetNode = document.querySelector('[data-testid="MiniBasketToggle"]');
        const config = { attributes: true, childList: true, subtree: true };
  
        const callback = (mutationList, observer) => {
          console.log("in the callback mutation");
          for (let mutation of mutationList) {
            if(document.querySelector('[data-testid="basket-count"]') === null){
              document.querySelector('.ext-bag-wrapper').style.display = "none";
              Experiment.mainTest();
            }              
          }
        };
        window.thObs = new MutationObserver(callback);
        window.thObs.observe(targetNode, config);
      });
    };
   
    const mainTest = () => { 
      if(document.querySelector(".ext-bag-class") === null && document.querySelector('[data-qa="ProductList"]') !== null){
        const messageArea = window.TH196.createMessage();
        messageArea.classList.add("ext-bag-class");
        
        window.TH196.waitForElement(`.ShoppingBagContainer [data-qa="section-header"]`, () => {
            const reference = document.querySelector('.ShoppingBagContainer [data-qa="section-header"]');
            window.TH196.placeAfter(messageArea, reference);
        });
      } else {
        document.querySelector(".ext-bag-wrapper").classList.remove("ext-bag-class");
        document.querySelector(".ext-bag-wrapper").style.display = "none";
        Experiment.mainTest();
      }
        checkShoppingBag();
    };  
    
    return { mainTest };
  })();  
  const utils = window["optimizely"].get("utils");
  utils.observeSelector('[data-qa="ProductList"]', () => {
   Experiment.mainTest();
  });  
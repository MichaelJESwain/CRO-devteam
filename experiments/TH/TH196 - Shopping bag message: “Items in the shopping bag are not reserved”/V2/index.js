const Experiment = (() => {            
    function handleAddToBag(){
      const message = document.querySelector(".ext-bag-class");
      window.TH196.waitForElement('[data-qa="ProductList"] [data-testid="ProductItem"]:last-child', () => {
        const reference = document.querySelector('[data-qa="ProductList"] [data-testid="ProductItem"]:last-child');
        window.TH196.placeAfter(message, reference);
      });
    }
    const checkItems = () => {         
        window.TH196.waitForElement('[data-qa="ProductList"]', () => {
        const targetNode = document.querySelector('[data-qa="ProductList"]');
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationList, observer) => {
          for (let mutation of mutationList) {
            if(mutation.type === 'childList'){
              setTimeout(() => {
                handleAddToBag();
              }, 2500);
            }       
          }
        };
        window.thObs1 = new MutationObserver(callback);
        window.thObs1.observe(targetNode, config);
      });
    };
    const checkShoppingBag = () => {         
        window.TH196.waitForElement('[data-testid="MiniBasketToggle"]', () => {
        const targetNode = document.querySelector('[data-testid="MiniBasketToggle"]');
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationList, observer) => {
          for (let mutation of mutationList) {
            if(document.querySelector('[data-testid="basket-count"]') === null){
              document.querySelector('.ext-bag-wrapper').style.display = "none";
              Experiment.start();
            } else if(document.querySelector('[data-testid="basket-count"]') !== null){
                setTimeout(() => {
                    handleAddToBag();
                }, 2500);          
            }              
          }
        };
        window.thObs1 = new MutationObserver(callback);
        window.thObs1.observe(targetNode, config);
      });
    };
   
    const mainTest = () => { 
      if(document.querySelector(".ext-bag-class") === null && document.querySelector('[data-qa="ProductList"]') !== null){
        const messageArea = window.TH196.createMessage();
        messageArea.classList.add("ext-bag-class");
        let reference;
        window.TH196.waitForElement(`[data-qa="ProductList"] [data-testid="ProductItem"]:last-child`, () => {
          if(window.digitalData.site.attributes.siteDeviceVersion === 'desktop'){
             reference = document.querySelector('[data-qa="ProductList"] [data-testid="ProductItem"]:last-child');
              } else if(window.digitalData.site.attributes.siteDeviceVersion === 'mobile'){
                reference = document.querySelector('[data-qa="ProductList"]');
              }            
              window.TH196.placeAfter(messageArea, reference);
          });
      } else {
            document.querySelector(".ext-bag-wrapper").classList.remove("ext-bag-class");
            document.querySelector(".ext-bag-wrapper").style.display = "none";
            Experiment.start();
        }
    };  
    const start = () => {
      if(document.querySelector('[data-qa="ProductList"]') ) {
        mainTest();
        checkShoppingBag();
        checkItems();
      }          
    };
    return { start };
  })();  
  const utils = window["optimizely"].get("utils");
  utils.observeSelector('[data-qa="ProductList"]', () => {
   Experiment.start();
  });  
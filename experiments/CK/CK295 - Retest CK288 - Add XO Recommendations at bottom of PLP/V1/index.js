const Experiment = (() => {
    const utils = window["optimizely"].get("utils");   
    const mainFunction = () => {
    utils.waitForElement('[data-testid="recommendations-container recentlyViewed"]').then(function(){
        document.querySelector('[data-testid="recommendations-container recentlyViewed"]').style.visibility="hidden";  
        document.querySelector('[data-testid="recommendations-container recentlyViewed"]').style.height="0";  
        document.querySelector('[data-testid="recommendations-container recentlyViewed"]').style.margin="0"; 
    });
    
    };
    const fireEvent = () => {
    utils.waitForElement('[data-testid="recommendations-container recentlyViewed"]').then(function(recommendationsContainer){
        window.CK295.observeElement(recommendationsContainer);   
    });
      
    };
    
        const start = () => {
          mainFunction();
          fireEvent();
        };
        return { start };
    })();
    Experiment.start();
const utils = window["optimizely"].get("utils");
const TH259 = {
    init: function(){
        this.mainFunction();
    },
    observeField: function(){
        const observerTarget = document.querySelector('[data-id="encryptedExpiryDate"]');
        const config = {
            childList: true,
            subtree: true,
            attributes: true,
        };
        const callback = (mutationList) => {
            for (const mutation of mutationList) {
              if (mutation.type === "childList") {
                if(document.querySelector('[data-id="encryptedExpiryDate"]').childNodes.length > 1){
                 document.querySelector('[data-id="encryptedExpiryDate"]').textContent = "MM/JJ";
                }
              }
            }
        };
          
        const observer = new MutationObserver(callback);
        observer.observe(observerTarget, config);
    },
    mainFunction: function(){
      document.querySelector('[data-id="encryptedExpiryDate"]').textContent = "MM/JJ";
      this.observeField();
    }
}
utils.observeSelector('[data-id="encryptedExpiryDate"]', () => {
    TH259.init();
})
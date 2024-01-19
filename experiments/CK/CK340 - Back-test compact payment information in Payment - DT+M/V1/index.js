const utils = window.optimizely.get('utils');
const CK340 = {
    init: function(){
        CK340.mainFunction();
    },
    mainFunction: function(){
        let text, reference;
        
        document.querySelectorAll('[data-testid="paymentMethods-wrapper"] label').forEach(function(option){
            text = option.querySelector('[class*="PaymentMethods_PaymentsAdditionalText__"]').innerText;
            reference = option.querySelector('[class*="SelectionItem_titleTextWrapper__"]');
            let placeText = document.createElement("div");
            placeText.classList.add('exp-show-text');
            placeText.innerHTML= `<span>${text}</span>`;
            reference.appendChild(placeText);
        })
       document.querySelectorAll('[class*="SelectionItem_revealBox__"] [class*="PaymentMethods_PaymentMethodDescription__"]').forEach(function(method){
            method.style.display = "none";
        })
    }

}
utils.observeSelector('[data-testid="payments-wrapper"]', () => {
    CK340.init();
});
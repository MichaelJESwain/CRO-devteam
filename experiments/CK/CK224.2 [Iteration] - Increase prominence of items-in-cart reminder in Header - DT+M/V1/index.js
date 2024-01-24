const utils = window.optimizely.get('utils');
const TH182 = {
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    },   
    translations: {
        en: "Proceed to checkout",
        de: "Weiter zur Kasse",
        pl: "Przejdź do kasy",
        es: "Proceder al pago",
        it: "Procedi all'acquisto",
        fr: "Valider la commande",
        nl: "Verder met bestellen"
    },   
    init: function(){
        console.log("TH182 started")
        TH182.mainFunction();
    },
    createSecondaryBTN: function(text){
        const language = window.digitalData.site.attributes.storeLanguage.split('_')[0];
        const checkoutText = TH182.translations[language];
        const btnWrapper = document.createElement('div');
        btnWrapper.innerHTML = `
        <a class="exp-cta-th182 cart" data-test-id="notification-view-sb" href="/shopping-bag" type="button">
        <span class="exp-link-text text-cart">${text}</span></a>
        <a class="exp-cta-th182 checkout" data-testid="proceed-to-checkout-pvh-button" href="/checkout/shipping" type="button">
        <span class="exp-link-text text-checkout">${checkoutText}</span></a>
        `;
        return btnWrapper;
    },
    mainFunction: function(){
        utils.waitForElement('[data-test-id="notification-view-sb"]').then(function(){
            const text = document.querySelector('[data-test-id="notification-view-sb"]').innerHTML;

            document.querySelector('[data-test-id="notification-view-sb"]').style.display="none";
            const secondary = TH182.createSecondaryBTN(text);
            const reference = document.querySelector('[data-testid="page-notification-transition"]');
            reference.appendChild(secondary);
        })
    },
}
utils.observeSelector('[data-testid="MiniBagNotification-component"]', () => {
    TH182.init();
})
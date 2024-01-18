const utils = window.optimizely.get('utils');
const TH182 = {
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    },    
    init: function(){
        console.log("TH182 started")
        TH182.mainFunction();
    },
    createSecondaryBTN: function(text){
        const btnWrapper = document.createElement('div');
        btnWrapper.innerHTML = `
        <a class="exp-link-th182" data-test-id="notification-view-sb" href="/shopping-bag" type="button">
        <span class="exp-link-text">${text}</span></a>
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
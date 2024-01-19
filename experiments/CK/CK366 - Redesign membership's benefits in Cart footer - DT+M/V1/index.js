const utils = window["optimizely"].get("utils");
const CK366 = {
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    mainFunction: function(){
        utils.observeSelector('[data-testid="NewsletterBanner-component"]', () => {
        // hide paragraph
       document.querySelector('[data-testid="NewsletterSignUpForm-component"] p').style.display = "none";
       // fix success padding
       utils.observeSelector('[data-testid="NewsletterSignUpSuccess-component"]', () => {
           if(window.digitalData.site.attributes.siteDeviceVersion === 'mobile'){
            document.querySelector('[data-testid="split-container"]').style.padding="30px 20px";
           }
       })
       //change benefits position
        const benefits = document.querySelector('[data-testid="MembershipBenefits-component"]');
        const reference = document.querySelector('[data-testid="NewsletterSignUpForm-component-title"]');
       this.placeAfter(benefits, reference);
       });
       
    }

}
utils.observeSelector('[data-testid="NewsletterBanner-component"]', () => {
    CK366.mainFunction();
})
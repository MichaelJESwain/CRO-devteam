const utils = window["optimizely"].get("utils");
const TH263 = {
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    mainFunction: function(){

        utils.observeSelector('[data-testid="NewsletterBanner-component"]', () => {
       // hide paragraph
       document.querySelector('[data-testid="NewsletterSignUpForm-component"] p').style.display = "none";
       //change benefits position
        const benefits = document.querySelector('[data-testid="MembershipBenefits-component"]');
        const reference = document.querySelector('[data-testid="NewsletterSignUpForm-component-title"]');
       this.placeAfter(benefits, reference);

        });
       
    }

}

utils.observeSelector('[data-testid="NewsletterBanner-component"]', () => {
    TH263.mainFunction();
})

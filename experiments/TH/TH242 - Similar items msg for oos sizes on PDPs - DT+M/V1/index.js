const utils = window["optimizely"].get("utils");
const TH242 = {
handleClick: function(){
        const reference = document.querySelector('[data-testid="Recommendations-component-pdp_rec_injection1"]');
        reference.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    },
    mainFunction: function(){
        utils.observeSelector('[data-testid="pvh-IconWithText"]', function(){
            const link = window.expTH242.createLink();
            const OOStext = document.querySelector('[data-testid="pvh-IconWithText"]');
            if(!document.querySelector('.exp-link')){
                OOStext.appendChild(link);
                link.addEventListener('click', TH242.handleClick);
            }
           
        })
    },
}
utils.observeSelector('[class*=ProductSize_SizeSelected__][class*=ProductSize_IsOos__]', () => {
TH242.mainFunction();
})
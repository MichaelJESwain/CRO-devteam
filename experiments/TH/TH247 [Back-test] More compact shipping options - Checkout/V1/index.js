const utils = window.optimizely.get('utils');
const TH247 = {
    addCss: function (css) {
        var s = document.createElement('style')
        s.innerHTML = css
        var h = document.querySelector('head')
        h.appendChild(s)
        return s
    },
    init: function(){
        console.log("TH247 started")
        TH247.mainFunction();
    },
    mainFunction: function(){
        document.querySelector('[data-testid="tabs-component"]').style.display = "none";

        const reference = document.querySelector('[data-testid="ShippingOptionWithTabs-component"]');
        reference.querySelectorAll('[data-testid="tabContent-component"]').forEach(function(option){
            option.classList.add("exp-delivery");
        })
      utils.observeSelector('[data-testid="tabContent-component"]', (option) => {
            option.style.display = "flex";
        })

        TH247.addCss(`
        [data-testid="tabs-component"]{
            display: none;
        }
        .exp-delivery{
            display: flex !important;
         }
        `);

    }

};
utils.observeSelector('[data-testid="ShippingOptionWithTabs-component"]', () => {
    TH247.init();
});
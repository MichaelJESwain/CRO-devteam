optimizely.utils.waitForElement('[data-testid="Recommendations-component-glp_rec_injection1"]').then(function(){
    document.querySelectorAll('[data-testid="Recommendations-component-glp_rec_injection1"]')[1].classList.add('exp-hide');
    document.querySelectorAll('[data-testid="Recommendations-component-glp_rec_injection1"]')[1].classList.add('exp-active-exp');   
});
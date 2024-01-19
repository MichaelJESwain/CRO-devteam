const utils = window["optimizely"].get("utils");
const TH276 = {
    translations: {
        uk: 'See more ',
        nl: 'Bekijk meer ',
        de: 'Mehr entdecken ',
        pl: 'Zobacz więcej ',
        it: 'Vedi altri ',
        fr: 'Voir plus de ',
        es: 'Ver más ',
    },
  finalCopy: '',
  checkCopy: function(){
        utils.observeSelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a', (elem) => {
            if(elem.innerText != this.finalCopy){
                elem.innerText = this.finalCopy;
            }
        })
    },
    mainFunction: function () {
     sessionStorage.setItem("TH276-pdp", true); 
     const domain = window.location.hostname.split('.')[0];
     const target = document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a');
const initialText = document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerText;
        if ((domain === 'nl' || domain === 'de') && window.location.href.includes('EN')) {
            target.innerText = `${this.translations.uk}${initialText}`;
        } else {
            target.innerText = `${this.translations[domain]}${initialText}`;
        }
      this.finalCopy = target.innerText;
      setTimeout(() => {
  			TH276.checkCopy();
			}, 500);
      
    }
}
utils.observeSelector('ol[class*=Breadcrumbs_BreadcrumbsList__]', () => {
TH276.mainFunction();
});
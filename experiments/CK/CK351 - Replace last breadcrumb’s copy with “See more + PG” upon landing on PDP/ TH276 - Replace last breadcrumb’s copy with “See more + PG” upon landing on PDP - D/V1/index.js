const utils = window["optimizely"].get("utils");
const CK351 = {
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
        });
    },
    mainFunction: function () {
      sessionStorage.setItem("CK351-pdp", true)
        const arr = window.location.hostname.split('.');
        const domain = arr[arr.length - 1];
    const target = document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a');
        const initialText = document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerText;
        if ((domain === 'nl' || domain === 'de') && window.location.href.includes('EN')) {
            target.innerText = `${this.translations.uk}${initialText}`;
        } else {
            target.innerText = `${this.translations[domain]}${initialText}`;
        }
     CK351.finalCopy = target.innerText;
     setTimeout(() => {
  		 CK351.checkCopy();
		 }, 500);
    
    },
}
utils.observeSelector('ol[class*=Breadcrumbs_BreadcrumbsList__]', () => {
CK351.mainFunction();
});
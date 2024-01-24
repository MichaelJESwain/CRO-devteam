const CK387 = {
    gender: function(){ // 0 : women; 1 : men
        let flag;
        document.querySelectorAll('[class*=MegaMenu_FirstLevelMenuItem__]').forEach(function(title, index) {
            if(title.className.includes('MegaMenu_Selected__')){
                flag = index;
            }
        })
        return flag;
    },
    init: () => {
const dtImageWomen = "https://cdn.optimizely.com/img/8382950752/9721d02cd9e2484abbdf544ea5fe1bd5.jpg"; 
const mbImageWomen = "https://cdn.optimizely.com/img/8382950752/c11091f5f09b461bafd242c0e130c982.jpg";
const dtImageMen = "https://cdn.optimizely.com/img/8382950752/614a142ff1824309ad7a22dc9689bd4b.jpg";
const mbImageMen = "https://cdn.optimizely.com/img/8382950752/344d19ed47b14bc3ad9f2e948ac3a44a.jpg";
const targetModule = document.querySelector('[data-testid="split-image-module"]');
        
        window.optimizely.get('utils').waitForElement(`[data-testid="split-image-module"] picture source`)
        .then(() => {
            if(CK387.gender() === 0){ //women
targetModule.querySelectorAll('[media="(min-width: 1366px)"]')[0].setAttribute('srcset', dtImageWomen);
targetModule.querySelectorAll('[media="(min-width: 1366px)"]')[1].setAttribute('srcset', dtImageWomen);
targetModule.querySelectorAll('[media="(min-width: 1024px)"]')[0].setAttribute('srcset', dtImageWomen);
targetModule.querySelectorAll('[media="(min-width: 1024px)"]')[1].setAttribute('srcset', dtImageWomen);
targetModule.querySelectorAll('[media="(min-width: 768px)"]')[0].setAttribute('srcset', mbImageWomen);
targetModule.querySelectorAll('[media="(min-width: 768px)"]')[1].setAttribute('srcset', mbImageWomen);
targetModule.querySelectorAll('[media="(min-width: 320px)"]')[0].setAttribute('srcset', mbImageWomen);
targetModule.querySelectorAll('[media="(min-width: 320px)"]')[1].setAttribute('srcset', mbImageWomen);
}else{ //men
targetModule.querySelectorAll('[media="(min-width: 1366px)"]')[0].setAttribute('srcset', dtImageMen);
targetModule.querySelectorAll('[media="(min-width: 1366px)"]')[1].setAttribute('srcset', dtImageMen);
targetModule.querySelectorAll('[media="(min-width: 1024px)"]')[0].setAttribute('srcset', dtImageMen);
targetModule.querySelectorAll('[media="(min-width: 1024px)"]')[1].setAttribute('srcset', dtImageMen);
targetModule.querySelectorAll('[media="(min-width: 768px)"]')[0].setAttribute('srcset', mbImageMen);
targetModule.querySelectorAll('[media="(min-width: 768px)"]')[1].setAttribute('srcset', mbImageMen);
targetModule.querySelectorAll('[media="(min-width: 320px)"]')[0].setAttribute('srcset', mbImageMen);
targetModule.querySelectorAll('[media="(min-width: 320px)"]')[1].setAttribute('srcset', mbImageMen);
}
        })
        .catch(e => {});
    }
};
CK387.init();
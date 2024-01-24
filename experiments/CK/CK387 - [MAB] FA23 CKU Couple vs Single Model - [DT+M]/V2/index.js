const CK387 = {
    init: () => {
const dtImgCouple = "//cdn.optimizely.com/img/8382950752/79b084e183c24db5ab829dafbe4621f2.jpg";
const mbImgCouple = "//cdn.optimizely.com/img/8382950752/01670a9e61af488f807c7125c71769ef.jpg";
const targetModule = document.querySelector('[data-testid="split-image-module"]');

        window.optimizely.get('utils').waitForElement(`[data-testid="split-image-module"] picture source`)
            .then(() => {
targetModule.querySelectorAll('[media="(min-width: 1366px)"]')[0].setAttribute('srcset', dtImgCouple);
targetModule.querySelectorAll('[media="(min-width: 1366px)"]')[1].setAttribute('srcset', dtImgCouple);
targetModule.querySelectorAll('[media="(min-width: 1024px)"]')[0].setAttribute('srcset', dtImgCouple);
targetModule.querySelectorAll('[media="(min-width: 1024px)"]')[1].setAttribute('srcset', dtImgCouple);
targetModule.querySelectorAll('[media="(min-width: 768px)"]')[0].setAttribute('srcset', mbImgCouple);
targetModule.querySelectorAll('[media="(min-width: 768px)"]')[1].setAttribute('srcset', mbImgCouple);
targetModule.querySelectorAll('[media="(min-width: 320px)"]')[0].setAttribute('srcset', mbImgCouple);
targetModule.querySelectorAll('[media="(min-width: 320px)"]')[1].setAttribute('srcset', mbImgCouple);
})
            .catch(e => { });
    }
};
CK387.init();
function callbackFn(activate, options) {
    const utils = window.optimizely.get('utils');
    utils.waitForElement('[data-testid="AppWrapper"]').then(function(page) {
        if (page.classList.contains('page--listPage')) {
            utils.waitForElement('[data-testid="plp-page"] [data-testid="category-navigation"]').then(function(plpMenu) {
                let isPlpMenuVisible = false;
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0
                };
                function observerCallback(entries, observer) {
                    entries.forEach(entry => {
                        if(entry.isIntersecting) {
                            isPlpMenuVisible = true;
                        }
                    });
                };
                const observer = new IntersectionObserver(observerCallback, observerOptions);
                plpMenu.style.opacity = '0';
                observer.observe(plpMenu);
                utils.waitUntil(function() {
                    return isPlpMenuVisible;
                }).then(function() {
                    observer.disconnect();
                    activate();
                });
            });
        }    
    });
}

function callbackFn(activate, options) {
    window.optimizely.get('utils').waitUntil(() => {
        return document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection2"] [class*="Carousel_slide_"]').length &&
        !document.querySelector('[data-testid="Recommendations-component-pdp_rec_injection2"] [data-testid="Skeleton-component"]');
    })
        .then(() => {
            activate();
        });
}
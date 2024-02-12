function callbackFn(activate, options) {
    window.optimizely.get('utils').waitUntil(() => {
        return document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection3"] [class*="Carousel_slide_"]').length &&
        !document.querySelector('[data-testid="Recommendations-component-pdp_rec_injection3"] [data-testid="Skeleton-component"]');
    })
        .then(() => {
            activate();
        });
  }
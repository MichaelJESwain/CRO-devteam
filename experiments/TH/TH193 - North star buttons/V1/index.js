const utils = window.optimizely.get('utils');

function addMutationObserver(cta) {
  const targetNode = cta;
  const config = { attributes: true, childList: true, subtree: true, characterData: true, characterOldData: true };

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        mutation.target.textContent = mutation.target.textContent.toLowerCase();
        observer.disconnect();
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

utils.observeSelector('.cta span', function(cta) {
    if (cta.textContent.toUpperCase() === cta.textContent && !cta.parentElement.classList.contains('PromoCode__textbox')) {
        cta.textContent = cta.textContent.toLowerCase();
        addMutationObserver(cta);
    }
});

utils.observeSelector('.Button__btn-content-wrap', function(cta) {
    if (cta.textContent.toUpperCase() === cta.textContent) {
        cta.textContent = cta.textContent.toLowerCase();
        addMutationObserver(cta);
    }
});

utils.observeSelector('.THCTAText', function(cta) {
    if (cta.textContent.toUpperCase() === cta.textContent) {
        cta.textContent = cta.textContent.toLowerCase();
        addMutationObserver(cta);
    }
});
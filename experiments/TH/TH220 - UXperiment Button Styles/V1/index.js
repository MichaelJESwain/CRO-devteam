const utils = window.optimizely.get('utils');

function addMutationObserver(cta) {
  const targetNode = cta;
  const config = { attributes: true, childList: true, subtree: true, characterData: true, 
    characterOldData: true };

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        mutation.target.textContent = mutation.target.textContent.toLowerCase();
        observer.disconnect();
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

utils.observeSelector('.THMoreCategories--teaser__links span', function(cta) {
    if (cta.textContent.toUpperCase() === cta.textContent) {
        cta.textContent = cta.textContent.toLowerCase();
        addMutationObserver(cta);
    }
});

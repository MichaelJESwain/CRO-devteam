const selector = '[data-testid="pdpActionButton-addToBag-pvh-button"]';

// Returns a Promise that is resolved with the first HTMLDomElement that matches the supplied selector.
optimizely.utils.waitForElement(selector);

optimizely.utils.waitForElement(selector).then(function(){
    console.log("The add to bag button is on the page")
});


// Run a callback whenever an element changes. Usually this runs twice
optimizely.utils.observeSelector(selector, callback, options);
// I have never used the "options" parameter

// Wait until the provided function returns true
optimizely.utils.waitUntil(conditionFn);

// A setInterval wrapper.
optimizely.utils.poll(callback, delay);





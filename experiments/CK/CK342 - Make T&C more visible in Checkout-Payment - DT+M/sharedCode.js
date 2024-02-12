const {waitForElement, observeSelector, waitUntil} = window.optimizely.get("utils");

const fireAdobeEvent = eventName => { 
    waitUntil(function() {
        return typeof window.utag !== 'undefined' && typeof window.utag.link !== 'undefined';
    }).then(function(){
        utag.link({ "event_name": `${eventName}` });
    });
};

const fireOptimizelyEvent = eventName => { 
    window.optimizely = window.optimizely || []; 
    window.optimizely.push({ type: 'event', eventName: eventName });
}; 

const fireBothEvents = eventName => { 
    fireAdobeEvent(eventName); 
    fireOptimizelyEvent(eventName);
};

const observeMutations = (targetElem, eventName, checkConditions) => {
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (checkConditions(mutation)) {
            fireBothEvents(eventName);
          }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetElem, config);
};
observeSelector('[data-testid="checkout-terms-conditions-Checkbox-Component-input"]', checkbox => {
    observeMutations(checkbox, "CK342 - Check TCs Box", (mutation) => {
        const res = mutation.type === "attributes" && mutation.attributeName === "aria-checked" && mutation.target.getAttribute("aria-checked") === "true" ? true : false;
        return res;
    });
});
observeSelector('[data-testid="checkout-terms-conditions-Checkbox-Component"]', tcContainer => {
    observeMutations(tcContainer, "CK342 - T&C error shown", (mutation) => {
        const res = mutation.type === "attributes" && mutation.attributeName === "aria-invalid" && mutation.target.getAttribute("aria-invalid") === "true" ? true : false;
        return res;
    });
});

observeSelector('[data-testid="checkout-terms-conditions-Checkbox-Component-content"] a:nth-child(1)', tcLink => {
    tcLink.addEventListener('click', () => {
        fireBothEvents('CK342 - Clicks on Terms & Conditions');
    });
});

observeSelector('[data-testid="checkout-terms-conditions-Checkbox-Component-content"] a:nth-child(2)', privacyLink => {
    privacyLink.addEventListener('click', () => {
        fireBothEvents('CK342 - Clicks on Privacy Notice');
    });
});
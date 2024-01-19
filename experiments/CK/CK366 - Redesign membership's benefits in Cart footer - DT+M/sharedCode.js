const utils = window["optimizely"].get("utils");
const fireAdobeEvent = (eventName) => {
    utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
        utag.link({
            "event_name": `${eventName}`
        });
    });
};
const fireOptimizelyEvent = (eventName) => {
    window['optimizely'] = window['optimizely'] || []
  
    window['optimizely'].push({
      type: 'event',
      eventName: eventName,
    })
}
const fireBothEvents = (eventName) => {
    if (!window[`hasFiredEvent-${eventName}`]) {
      window[`hasFiredEvent-${eventName}`] = true
      fireAdobeEvent(eventName)
      fireOptimizelyEvent(eventName)
  
      setTimeout(() => {
        window[`hasFiredEvent-${eventName}`] = false
      }, 100)
    }
}
//Diagnostic goals
//Changes seen goal
const observer = new window.IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        fireBothEvents('CK366-TH263 Newsletter sign-up in viewport');
        return
    }
    
  }, {
    root: null,
  	rootMargin: '0px',
    threshold: 0.01, 
})
utils.observeSelector('[data-testid="NewsletterBanner-component"]', () => {
    const element = document.querySelector('[data-testid="NewsletterBanner-component"]');
    observer.observe(element);
})
// Clicks on email-adress field - ADOBE NEW
utils.observeSelector('[class*=newsletter_sign_up_form_form__] [data-testid="pvh-InputField"]', () => {
    document.querySelector('[class*=newsletter_sign_up_form_form__] form input#email-footer-newsletter-sign-up-form').addEventListener('click', function(){
        fireBothEvents('CK366-TH263 Clicks on email-address field');
    })
})
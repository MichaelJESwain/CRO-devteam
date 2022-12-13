const utils = window["optimizely"].get("utils");

const fireAdobeEvent = (eventName) => {
   utils.waitUntil(function(){ return window.s && window.s.tl; }).then(function() {
      window.s.tl(this,"o", eventName);
  });
};

const fireOptimizelyEvent = (eventName) => {
  window['optimizely'] = window['optimizely'] || [];

  window['optimizely'].push({
    type: 'event',
    eventName: eventName,
  });
};

const fireBothEvents = (eventName, isAuto) => {
  fireAdobeEvent(eventName);
  fireOptimizelyEvent(eventName);
};


 var cancelPolling = utils.poll(function() {
    if (window && 
      window.digitalData && 
      window.digitalData.page && 
      window.digitalData.page.pageInfo && 
      window.digitalData.page.pageInfo.pagePath && 
      (window.digitalData.page.pageInfo.pagePath === '/contactus' ||
      window.digitalData.page.pageInfo.pagePath.includes('/faqs'))) {
        cancelPolling();

        let selector = '';
        let eventName = '';

        if (window.digitalData.page.pageInfo.pagePath === '/contactus') {
            fireBothEvents('TH156-contact_us_page_visits');
            selector = 'form [data-testid="Button-secondary"]';
            eventName = 'TH156-Clicks_on_send';
        } else if (window.digitalData.page.pageInfo.pagePath.includes('/faqs')) {
            selector = window.digitalData.page.pageInfo.pagePath === '/faqs' ? '[data-testid="faq-category"]' : '[data-testid="question-button"]';
            eventName = window.digitalData.page.pageInfo.pagePath === '/faqs' ? 'TH156-Clicks_on_FAQ_category' : 'TH156-Clicks_on_FAQ_question';
        }

      utils.waitForElement(selector).then(function() {
        document.querySelectorAll(selector).forEach(function(element) {
            element.addEventListener('click', function() {
                fireBothEvents(eventName);
            });
        });
      });
    } else if (window && 
      window.digitalData && 
      window.digitalData.page && 
      window.digitalData.page.pageInfo && 
      window.digitalData.page.pageInfo.pagePath && 
      (window.digitalData.page.pageInfo.pagePath !== '/contactus' ||
      !window.digitalData.page.pageInfo.pagePath.includes('/faqs'))) {
      cancelPolling();
    }
  }, 500);

  utils.waitForElement('[data-testid="THMenuLinks"] [href*="/faqs"]').then(function() {
    const sidebarFAQLinks = document.querySelectorAll('[data-testid="THMenuLinks"] [href*="/faqs"]');
    for (let i = 1; i < sidebarFAQLinks.length; i++) {
      sidebarFAQLinks[i].addEventListener('click', function() {
          fireBothEvents('TH156-Clicks_on_FAQ_category');
      });
    }
});

  utils.waitForElement('.faq-cta-desktop').then(function() {
    document.querySelector('.faq-cta-desktop').addEventListener('click', function() {
        fireBothEvents('TH156-Clicks_on_FAQ_in_header');
    });
  });

utils.waitForElement('.faq-cta-mobile').then(function() {
        document.querySelector('.faq-cta-mobile').addEventListener('click', function() {
            fireBothEvents('TH156-Clicks_on_FAQ_in_header');
        });
});


  utils.waitForElement('.faq-ui-draw_level-one .faq-list-item').then(function() {
    document.querySelectorAll(('.faq-ui-draw_level-one .faq-list-item')).forEach(function(faqCategory) {
        faqCategory.addEventListener('click', function() {
            fireBothEvents('TH156-Clicks_on_FAQ_category');
        });
    });
});

utils.waitForElement('.faq-ui-draw_level-two .faq-list-item').then(function() {
    document.querySelectorAll(('.faq-ui-draw_level-two .faq-list-item')).forEach(function(faqQuestion) {
        faqQuestion.addEventListener('click', function() {
            fireBothEvents('TH156-Clicks_on_FAQ_question');
        });
    });
});

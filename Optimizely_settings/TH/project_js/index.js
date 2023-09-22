// hf10
if (/.*(ru)\.tommy\.com.*/.test(window.location.href)) {
    var hideNewsletterPopUP = document.createElement('style')
    hideNewsletterPopUP.innerHTML =
      '.ReactModal__Overlay.ReactModal__Overlay--after-open:not(div[class*=notice-module-ReactModal__Overlay--cookie]), div[class*=newsletter-footer-module-newsletter-footer], .Checkbox.create-account-newsletter, ul.offers { display:none !important} .ReactModal__Body--open {overflow: auto !important;}'
    document.head.appendChild(hideNewsletterPopUP)
  }
  
  // AB-test cvqa-cookie, for testing (do not remove!)
  if (/[?&]cvqa=false/i.test(window.location.search)) {
    document.cookie = 'cvqa=false;path=/'
  } else if (/[?&]cvqa/i.test(window.location.search)) {
    document.cookie = 'cvqa=true;path=/'
  }
  /* testing123 */
  if (/.*uk\.tommy\.com\/(mens\-jeans|womens\-jeans)\?testing123/.test(window.location.href)) {
      console.log("thtesting v4");
      var hideDFG = document.createElement('style')
    hideDFG.innerHTML ='.THFitGuide {display: none; background:red;}'
    document.head.appendChild(hideDFG)
  };
  /* end test */
  /* WEB SPA ROUTING FUNCTION */
  if (/.*uk\.b2ceusp\.tommy\.com.*/.test(window.location)) {
    window.activateOptlyPage = function (optlyPage) {
      var _apiName = optlyPage.apiName
      var optlyPages = window.optimizely.get('data').pages
      //Force deactivation of the page
      window.optimizely.push({
        type: 'page',
        pageName: optlyPages[optlyPage].apiName,
        isActive: false,
      })
  
      //Reactivate the page. This will force Optimizely to evaluate the conditions again as if reloading the DOM.
      window.optimizely.push({
        type: 'page',
        pageName: optlyPages[optlyPage].apiName,
      })
    }
  }
  /* END WEB SPA ROUTING FUNCTION */
  
  if (document.cookie.indexOf('pageCount') !== -1) {
    if (document.cookie.indexOf('pageCount=1') != -1) {
      document.cookie = 'pageCount=2;path=/;'
  
      window['optimizely'] = window['optimizely'] || []
      window['optimizely'].push({
        type: 'event',
        eventName: 'multiple-views',
      })
    }
  } else {
    var cvSetCountrySegment = function (cvCountry) {
      window['optimizely'] = window['optimizely'] || []
      window['optimizely'].push({
        type: 'user',
        attributes: {
          10311960667: cvCountry,
        },
      })
    }
  
    if (window.location.href.indexOf('nl.tommy.com') > -1) {
      cvSetCountrySegment('NL')
    } else if (window.location.href.indexOf('de.tommy.com') > -1) {
      cvSetCountrySegment('DE')
    } else if (window.location.href.indexOf('uk.tommy.com') > -1) {
      cvSetCountrySegment('UK')
    } else if (window.location.href.indexOf('fr.tommy.com') > -1) {
      cvSetCountrySegment('FR')
    }
  
    document.cookie = 'pageCount=1;path=/;'
  
    //fire event
    window['optimizely'] = window['optimizely'] || []
    window['optimizely'].push({
      type: 'event',
      eventName: 'single-view',
    })
  }
  
  function newOrReturningSegment() {
    if (typeof cvSegmentedVisitor !== 'string') {
      window['optimizely'] = window['optimizely'] || []
      window['cvSegmentedVisitor'] = window['cvSegmentedVisitor'] || ''
      if (typeof window['optimizely'].get('visitor') === 'object') {
        if (window['optimizely'].get('visitor').first_session) {
          window['cvSegmentedVisitor'] = 'New visitor'
  
          window['optimizely'].push({
            type: 'user',
            attributes: {
              8685700266: 'New Visitor',
            },
          })
        } else {
          window['cvSegmentedVisitor'] = 'Returning visitor'
  
          window['optimizely'].push({
            type: 'user',
            attributes: {
              8685700266: 'Returning Visitor',
            },
          })
        }
      }
    }
  }
  
  function productCategorySegment() {
    if (typeof cvSegmentCategory !== 'string') {
      window['cvSegmentCategory'] = window['cvSegmentCategory'] || ''
      window['optimizely'] = window['optimizely'] || []
      var utils = window['optimizely'].get('utils')
      utils
        .waitUntil(function () {
          return (
            typeof utag === 'object' &&
            typeof utag.data === 'object' &&
            typeof utag.data.page_type === 'string'
          )
        })
        .then(function () {
          if (utag.data.page_type === 'plp') {
         
            if (
              typeof utag.data.product_structure_group_id !== 'undefined' &&
              typeof utag.data.product_structure_group_id === 'string'
            ) {
              window['cvSegmentCategory'] = utag.data.product_structure_group_id
              window['optimizely'].push({
                type: 'user',
                attributes: {
                  10087016628: utag.data.product_structure_group_id,
                },
              })
            }
          }
        })
    }
  }
  
  var pageActivated = function (event) {
    newOrReturningSegment()
    productCategorySegment()
  }
  
  window['optimizely'] = window['optimizely'] || []
  window['optimizely'].push({
    type: 'addListener',
    filter: {
      type: 'lifecycle',
      name: 'pageActivated',
    },
    // Add the pageActivated function as a handler.
    handler: pageActivated,
  })
  
  
  var trackDelayed = function () {
        window.optimizely.get('utils').waitUntil(function() {
          return typeof window.optimizely.get('custom/adobeIntegrator') != 'undefined' && 
          typeof sessionStorage != 'undefined' &&
          typeof window.utag != 'undefined' && 
          typeof window.utag.link === 'function';
        }).then(function() {
          window.optimizely.get('custom/adobeIntegrator').trackDelayedCampaigns();
        });
  };
  
  window['optimizely'].push({
    type: 'addListener',
    filter: {
      type: 'lifecycle',
      name: 'campaignDecided',
    },
    handler: trackDelayed,
  });
  
  
  
  
  // Add Vestico specific T&Cs on the T&Cs page for UK, NL, DE, FR, IT, ES, PL
  if ((window.location.href.includes('/terms-and-conditions') || window.location.href.includes('/zasady-i-warunki')) && 
      (window.location.hostname.split('.')[0] === 'uk'||
      window.location.hostname.split('.')[0] === 'nl' ||
      window.location.hostname.split('.')[0] === 'de' ||
      window.location.hostname.split('.')[0] === 'fr' ||
      window.location.hostname.split('.')[0] === 'it' ||
      window.location.hostname.split('.')[0] === 'es' ||
      window.location.hostname.split('.')[0] === 'pl')
      ) {
  
    const waitForCSpageContent = setInterval(function() {
          if (document.querySelector('.THCustomerServicePage')) {
              clearInterval(waitForCSpageContent);
          
              const vestico_tc_element = document.createElement('div');
              vestico_tc_element.setAttribute('data-testid', 'THCustomerServicePage__section-wrapper');
              vestico_tc_element.setAttribute('class', 'THCustomerServicePage__section-wrapper');
              vestico_tc_element.innerHTML = `<div data-testid="THCustomerServicePage-text-section" class="THCustomerServicePage__section vestico_tcs">
                                                  <h2>Sizing Solution Tool Pilot</h2>
                                                  <p>Below are the Terms and Conditions which apply to your participation in our sizing tool pilot. We will request your consent to the Terms and Conditions when we or our partner Vestico invites you to participate. Depending on the means of used to invite you, your acceptance of these Terms and Conditions will have been expressed by you by means of an e-mail or by a confirmatory Instragram chat message.</p>
                                                  <ol>
                                                      <li>You grant to Tommy Hilfiger Europe B.V., its affiliates, assigns, licensees and customers(“Hilfiger”) a royalty free, perpetual, worldwide license to display your clothing size and the photograph that you have uploaded or otherwise submitted to our sizing tool, for example by means of an Instagram message (together the “Pictures”), in our online sizing tool and on any offline and online media including but not limited to Internet (such as social media, blogs, Tommy Hilfiger related websites), press release, editorial print and online, newsletters, in-store/point of sale materials. Hilfiger may use, reproduce, distribute, combine with other materials, alter and/or edit, copy, publish, save, store, archive your Pictures in any manner in its sole discretion, with no obligation to you whatsoever.</li>
                                                      <li>You hereby represent and warrant that (i) you own all rights in and to your Picture, including copyright, (ii) the Picture only depicts yourself, (iii) you have reached the legal age of majority in your jurisdiction of residence, and (iv) Hilfiger’s use of your Picture will not infringe any third party’s right or any law.</li>
                                                      <li>You hereby release, discharge and agree to hold Hilfiger and any person acting on behalf of Hilfiger harmless from all actions, claims, damages, liabilities, costs and expenses arising out of the use by Hilfiger of the Picture.</li>
                                                      <li>You hereby release and discharge Hilfiger from all and any obligation to pay you for any use of your Picture and any of the intellectual property rights contained therein in connection with the uses described above.</li>
                                                      <li>Your personal data submitted and as included in the Pictures (the “Data”) will be processed by and on behalf of Tommy Hilfiger Europe B.V. For more information about the use of your Data please read the Privacy Notice <a href="https://uk.tommy.com/terms-and-conditions#PRIVACY_NOTICE">https://uk.tommy.com/terms-and-conditions#PRIVACY_NOTICE</a>. You are aware that all data that is exchange with us in Instagram chat messages may be used by META for the purposes set out in the META privacy statement provided here: <a href="https://mbasic.facebook.com/privacy/policy/printable/">https://mbasic.facebook.com/privacy/policy/printable/</a>. META provides options to opt-out of this processing through the settings of your Instagram account or you can delete the chat messages from your Instagram account.</li>
                                                      <li>Your agreement to these Terms and Conditions can be revoked and your rights under clause 5. above can be exercised by sending an email to <a href="mailto:dpo@vestico.co">dpo@vestico.co</a>, explicitly stating your willingness to revoke your consent.</li>
                                                  </ol>
                                                  <p style="margin-top: 24px;">These Terms and Conditions can be sent to you via email if you send an email <a href="mailto:dpo@vestico.co">dpo@vestico.co</a>, requesting a copy of the Terms & Conditions.</p>
                                              </div>`;
          
              document.querySelector('.THCustomerServicePage').appendChild(vestico_tc_element);
                  document.querySelector('appended vestico t&cs => ', document.querySector('.vestico_tcs'));
          }
      }, 500);
  }
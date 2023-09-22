  // AB-test cvqa-cookie, for testing (do not remove!)
  if (/[?&]cvqa=false/i.test(window.location.search)) {
    document.cookie = 'cvqa=false;path=/';
  } else if (/[?&]cvqa/i.test(window.location.search)) {
    document.cookie = 'cvqa=true;path=/';
  }

  /* WEB SPA ROUTING FUNCTION */
  if (/.*uk\.b2ceusp\.tommy\.com.*/.test(window.location)) {
    window.activateOptlyPage = function (optlyPage) {
      var _apiName = optlyPage.apiName;
      var optlyPages = window.optimizely.get('data').pages;
      //Force deactivation of the page
      window.optimizely.push({
        type: 'page',
        pageName: optlyPages[optlyPage].apiName,
        isActive: false,
      });
  
      //Reactivate the page. This will force Optimizely to evaluate the conditions again as if reloading the DOM.
      window.optimizely.push({
        type: 'page',
        pageName: optlyPages[optlyPage].apiName,
      });
    };
  }
  /* END WEB SPA ROUTING FUNCTION */
  
  if (document.cookie.indexOf('pageCount') !== -1) {
    if (document.cookie.indexOf('pageCount=1') != -1) {
      document.cookie = 'pageCount=2;path=/;';
  
      window['optimizely'] = window['optimizely'] || [];
      window['optimizely'].push({
        type: 'event',
        eventName: 'multiple-views',
      });
    }
  } else {
    var cvSetCountrySegment = function (cvCountry) {
      window['optimizely'] = window['optimizely'] || [];
      window['optimizely'].push({
        type: 'user',
        attributes: {
          10311960667: cvCountry,
        },
      });
    };
  
    if (window.location.href.indexOf('nl.tommy.com') > -1) {
      cvSetCountrySegment('NL');
    } else if (window.location.href.indexOf('de.tommy.com') > -1) {
      cvSetCountrySegment('DE');
    } else if (window.location.href.indexOf('uk.tommy.com') > -1) {
      cvSetCountrySegment('UK');
    } else if (window.location.href.indexOf('fr.tommy.com') > -1) {
      cvSetCountrySegment('FR');
    }
  
    document.cookie = 'pageCount=1;path=/;';
  
    //fire event
    window['optimizely'] = window['optimizely'] || [];
    window['optimizely'].push({
      type: 'event',
      eventName: 'single-view',
    });
  }
  
  function newOrReturningSegment() {
    if (typeof cvSegmentedVisitor !== 'string') {
      window['optimizely'] = window['optimizely'] || [];
      window['cvSegmentedVisitor'] = window['cvSegmentedVisitor'] || '';
      if (typeof window['optimizely'].get('visitor') === 'object') {
        if (window['optimizely'].get('visitor').first_session) {
          window['cvSegmentedVisitor'] = 'New visitor';
  
          window['optimizely'].push({
            type: 'user',
            attributes: {
              8685700266: 'New Visitor',
            },
          });
        } else {
          window['cvSegmentedVisitor'] = 'Returning visitor';
  
          window['optimizely'].push({
            type: 'user',
            attributes: {
              8685700266: 'Returning Visitor',
            },
          });
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
          );
        })
        .then(function () {
          if (utag.data.page_type === 'plp') {
            if (
              typeof utag.data.product_structure_group_id !== 'undefined' &&
              typeof utag.data.product_structure_group_id === 'string'
            ) {
              window['cvSegmentCategory'] = utag.data.product_structure_group_id;
              window['optimizely'].push({
                type: 'user',
                attributes: {
                  10087016628: utag.data.product_structure_group_id,
                },
              });
            }
          }
        });
    }
  }
  
  var pageActivated = function (event) {
    newOrReturningSegment();
    productCategorySegment();
  };
  
  window['optimizely'] = window['optimizely'] || [];
  window['optimizely'].push({
    type: 'addListener',
    filter: {
      type: 'lifecycle',
      name: 'pageActivated',
    },
    // Add the pageActivated function as a handler.
    handler: pageActivated,
  });
  
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

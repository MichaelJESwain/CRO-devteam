//  ***Adobe event***

function adobeFireEvent() {
    utils
      .waitUntil(function () {
          //console.log('Adobe event was fired 1');
        return window.s && window.s.tl;
      })
      .then(function () {
          //console.log('Adobe event was fired 2');
        window.s.tl(this, 'o', 'CK248 - Campaign CTR - click on campaign image');
      });
  }
  
  function addingEventListeners(images) {
    images.forEach((image) => {
      if (image.className === 'e-spots__card__image') {
        image.addEventListener('click', adobeFireEvent);
        image.classList.add('EXT_Class');
        //console.log('Adobe function was added');
      }
    });
  }
  
  let device = window.digitalData.site.attributes.siteDeviceVersion;
  
  if (device === 'desktop' && !window.ckObs) {
    const config = { attributes: true, childList: true, subtree: true };
    const elements = document.querySelectorAll('#mega-menu__second-level');
    const element = elements[2];
  
    // ==========
    const callbackWrapper = (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        const imagesCampaign = document.querySelectorAll('#eSpot > a > div > img');
        if (imagesCampaign && imagesCampaign.length > 0) {
          const imagesCampaign = document.querySelectorAll('#eSpot > a > div > img');
          
          if(imagesCampaign.length === 6){
              window.ckObs.disconnect();
          } 
          
          addingEventListeners(imagesCampaign);
        }
      }
    };
    // ==========
  
    window.ckObs = new MutationObserver(callbackWrapper);
    window.ckObs.observe(element, config);
  }
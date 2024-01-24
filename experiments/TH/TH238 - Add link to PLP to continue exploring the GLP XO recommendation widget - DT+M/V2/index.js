const th238 = {
    createMessage: function(){
          const link = document.createElement('div');
              const language = window.location.hostname.split('.')[0];
          const text = window.sharedTH238.translations[language];
          link.innerHTML = `<a href=${window.sharedTH238.createLink()}><span>${text}</span></a>`;
          link.classList.add('ext-link-wrapper');
  
          return link;
      },
    createImage: function(){
        let pageGender;
        if(document.querySelector('[class*=gender-women_] [class*=nav__list--none-active_] [class*=nav__list-item_][class*=gender-women_]') !== null){
          pageGender = 'women';
        } else{
          pageGender = 'men';
        }
        switch(pageGender){
          case 'women':
            url = '//cdn.optimizely.com/img/8382950752/251752a452b34112a41c145a032bb783.jpg';
            break;
          case 'men':
            url = '//cdn.optimizely.com/img/8382950752/c3d3a447ea084eb988bae546e47877ff.jpg';
            break;
          
          default:
            console.log("please reload the page");  
        }
        return url;
      },
      mainFunction: function(){
     const device = window.__NEXT_DATA__.props.initialState.app.viewType;
     let target;
  
     window.sharedTH238.waitForElement('[data-testid="THAbTest"] .ProductSlider__keen.keen-slider', () => {
  device === 'desktop' ? target = document.querySelectorAll('[data-testid="THAbTest"] .ProductSlider__keen.keen-slider .ProductSlider__keen__slide-data')[4] :
              target = document.querySelectorAll('[data-testid="THAbTest"] .ProductSlider__keen.keen-slider .ProductSlider__keen__slide-data')[2];
              
      target.querySelector('[data-testid="wishlist__toggle--container"]').style.display = "none";
      target.querySelector('.ProductSlider__keen__slide__content-wrapper').style.display = "none";
      if(target.querySelector('.ProductSlider__keen__slide__promotion') != null){
        target.querySelector('.ProductSlider__keen__slide__promotion').style.display = "none";
      }
      target.querySelector('.ResponsiveImage.ProductSlider__keen__slide__hover-image').style.display = "none";
      target.querySelector('a').setAttribute('href', window.sharedTH238.createLink());        
      // change the source of the image
      target.querySelector('.ResponsiveImage img').setAttribute('src', th238.createImage());
  
              const message = this.createMessage();
              target.querySelector('.ProductSlider__keen__slide__image-wrapper').appendChild(message);
       
                    // TH238 - Clicks on shop all
             function handleClickCTA(){
                window.fireBothEvents("TH238 - Clicks on shop all CTA");
                document.querySelector('.ext-link-wrapper a').removeEventListener('click', handleClickCTA);
              }
              utils.observeSelector('.ext-link-wrapper a', function(){
                document.querySelector('.ext-link-wrapper a').addEventListener('click', handleClickCTA);
              });
          });
          
      },
  };
  const utils = window.optimizely.get('utils');
  utils.observeSelector(`[data-testid="nav-primary-top"]`, function(){
    th238.mainFunction();
  });
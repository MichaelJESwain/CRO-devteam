const th238 = {
    mainFunction: function(){
        const wrapperLink = document.createElement('div');    
        const language = window.location.hostname.split('.')[0];
        const text = window.sharedTH238.translations[language];
        
        const link = document.createElement('div');
        link.innerHTML = `<a href=${window.sharedTH238.createLink()}><span>${text}</span></a>`;
        link.classList.add('ext-link-wrapper');
        const reference = document.querySelector('[data-testid="THAbTest"] .ProductSlider__container');
        window.sharedTH238.placeBefore(wrapperLink, reference);
          
        window.sharedTH238.waitForElement('.THContentCollection [data-testid="THAbTest"]', () =>{
              const title = document.querySelector('[data-testid="THAbTest"] .ProductSlider__title');
              wrapperLink.appendChild(title);
              wrapperLink.appendChild(link);
          
             // TH238 - Clicks on shop all
              utils.observeSelector('.ext-link-wrapper a', function(){
                document.querySelector('.ext-link-wrapper a').addEventListener('click', function(){
                    window.fireBothEvents("TH238 - Clicks on shop all CTA");
                });
              });
          });
  
      },
  
  };
  const utils = window.optimizely.get('utils');
  utils.observeSelector(`[data-testid="nav-primary-top"]`, function(){
    th238.mainFunction();
  });
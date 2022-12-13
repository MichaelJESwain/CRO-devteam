const Experiment = (() => {
    // Helpers
    const placeAfter = function (newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
      const primaryCategory = window.digitalData.page.category.primaryCategoryId;
    const getCopy = () => {
        const translations = {
        en: {
          descriptionWomen: `SHOP THE BRUSHED JUMPER `,
          descriptionMen: `SHOP THE PUFFER JACKET`,
          linkWomen: `/th-monogram-brushed-jumper-ww0ww37751vlp`,
          linkMen: `/th-monogram-padded-down-puffer-jacket-mw0mw292540gy`,
        },
        nl: {
          descriptionWomen: `KOOP DE MONOGRAM TRUI`,
          descriptionMen: `KOOP HET MONOGRAM PUFFERJACK`,
          linkWomen: `/th-monogram-trui-van-geborstelde-wolmix-ww0ww37751vlp`,
          linkMen: `/th-monogram-gewatteerd-pufferjack-mw0mw292540gy`,
        },
        de: {
          descriptionWomen: `ZUM GEBÜRSTETER PULLOVER`,
          descriptionMen: `ZUM PUFFER-DAUNENJACKE`,
          linkWomen: `/th-monogram-gebürsteter-pullover-ww0ww37751vlp`,
          linkMen: `/th-monogram-gesteppte-puffer-daunenjacke-mw0mw292540gy`,
        },
        es: {
          descriptionWomen: `COMPRA EL JERSEY PEINADO`,        
          descriptionMen: `COMPRAR LA CHAQUETA`,
          linkWomen: `/jersey-peinado-th-monogram-ww0ww37751vlp`,
          linkMen: `/chaqueta-acolchada-de-plumón-th-monogram-mw0mw292540gy`,
        },
        it: {
          descriptionWomen: `ACQUISTA IL MAGLIONE`,        
          descriptionMen: `ACQUISTA IL PIUMINO`,
          linkWomen: `/pullover-th-monogram-con-finitura-spazzolata-ww0ww37751vlp`,
          linkMen: `/piumino-th-monogram-mw0mw292540gy`,
        },
        fr: {
          descriptionWomen: `VOIR LE PULL`,        
          descriptionMen: `VOIR LA DOUDOUNE MATELASSÉE`,
          linkWomen: `/pull-brossé-th-monogram-ww0ww37751vlp`,
          linkMen: `/doudoune-matelassée-th-monogram-mw0mw292540gy`,
        },
        
    };            
     
      const local = 
          window.digitalData.site.attributes.storeLanguage[0] +
          window.digitalData.site.attributes.storeLanguage[1];
    
      return translations[local];
    };
    
    function addLink(element){
        const { linkWomen, linkMen } = getCopy(); 
        element.href = primaryCategory === 'th_women' ? linkWomen : linkMen;
        return element;
    }
    
      // Experiment
          
      function addButton(){
        const { descriptionWomen, descriptionMen} = getCopy();
        const reference = document.querySelector('div[class*=right_] picture');
                  
          //Create a button (cta)
          const cta = document.createElement("a");
          cta.classList.add("ctaStyle");
          cta.innerHTML = `<span>${primaryCategory === 'th_women' ? descriptionWomen : descriptionMen}</span>`; 
        
            //Link to the PDP
          addLink(cta);
  
          //Create a wrapper for the cta
          const wrapper = document.createElement("div");
          wrapper.classList.add("divCTAStyle");
  
          wrapper.appendChild(cta);
          reference.appendChild(wrapper);
      }
    function heroModuleClickable(){
        const link = document.createElement("a");
  
        //Link to the PDP
           addLink(link);
  
        //Place the link
        const heroImage = document.querySelector('div[class*=right_] picture img');
        placeAfter(link, heroImage);      
        link.appendChild(heroImage);
      }
         
      const start = () => {
          addButton();
            heroModuleClickable();
      };
    
      return { start };
    })();
    
     const waitForElement = (cssSelector, cb) => {
      var t1 = new Date().getTime();
      var dif = 0;
      var reqAnId = window.requestAnimationFrame(lookForElement);
  
      function lookForElement() {
        var t2 = new Date().getTime();
        dif = (t2 - t1) / 1000;
  
        if (dif < 3) {
          if (elementFound()) {
            cb(cssSelector);
            cancelAnimationFrame(reqAnId);
          } else {
            window.requestAnimationFrame(lookForElement);
          }
        } else {
          cancelAnimationFrame(reqAnId);
        }
      }
      function elementFound() {
        var e = document.querySelector(cssSelector);
        if (e) {
          return true;
        } else {
          return false;
        }
      }
  };
  
  waitForElement('[data-testid="HeroModule"]', () => {
    Experiment.start();
  });
    
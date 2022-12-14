const Experiment = (() => {
    const getCopy = () => {
      const translations = {
        en: {
          title: 'Your Shopping Bag',  
          ctaShopping: 'Continue Shopping',
          ctaCheckout: 'Proceed To Checkout',
        },
        nl: {
          title: 'Jouw Winkelmand',
          ctaShopping: 'Shop Verder',
          ctaCheckout: 'Verder gaan met betalen',
        },
        de: {
          title: 'Dein Warenkorb',
          ctaShopping: 'Weiter einkaufen',
          ctaCheckout: 'Weiter zur Kasse',
        },
        es: {
          title: 'Tu Cesta De La Compra',
          ctaShopping: 'Continuar comprando',
          ctaCheckout: 'Pasar por caja',
        },
        it: {
          title: 'Il Tuo Carrello',
          ctaShopping: 'Continua con lo shopping',
          ctaCheckout: 'Continua l’acquisto',
        },
        fr: {
          title: 'Votre Panier',
          ctaShopping: 'Continuer les achats',
          ctaCheckout: 'Valider la commande',
        },
        pl: {
          title: 'Twój Koszyk',
          ctaShopping: 'Kontynuuj zakupy',
          ctaCheckout: 'Przejdź do kasy',
        },
      };
  
      const locale =
        window.digitalData.site.attributes.storeLanguage[0] +
        window.digitalData.site.attributes.storeLanguage[1];
  
      return translations[locale];
    };
      //Helpers
            
      const placeBefore = function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
      };
      
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
  
      const addCss = function (css) {
        var s = document.createElement('style');
        s.innerHTML = css;
        var h = document.querySelector('head');
        h.appendChild(s);
        return s;
      };
  
      //Test
      function createCTAs(){
          const {title, ctaShopping, ctaCheckout} = getCopy();
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<h1 class="exp-title">${title}</h1><div class="exp-wrapper"><button type="button" class="ck-Button ck-Button__secondary continue">${ctaShopping}</button>
          <a data-testid="checkout-button" data-qa="" role="button" class="exp-checkout ck-Button--link ck-Button ck-Button__link ck-Button--full-width checkoutButton checkoutButton--no-margin">${ctaCheckout}</a></div>`;

          wrapper.classList.add("exp-div");
        
        	const mobileCTA = document.createElement("button");
          mobileCTA.classList.add("ck-Button");
          mobileCTA.classList.add("ck-Button__secondary");
          mobileCTA.classList.add("continue");
          mobileCTA.classList.add("cta-continue-mobile");

          mobileCTA.innerHTML = `${ctaShopping}`;

          waitForElement("div[class='shoppingBag__filled'] section:nth-child(2) [data-testid='checkout-button']", () => {
            const reference = document.querySelector("div[class='shoppingBag__filled'] section:nth-child(2) [data-testid='checkout-button']");
            placeBefore(mobileCTA, reference);
          });
          
          addCss(`
            .exp-div{
                display: flex;
                flex-direction: column;
            }
						.exp-empty-bag{
              display: none;
            }
            .continue{
              padding: 12px 43px;
            }
 						.cta-continue-mobile{
              display: none;
              margin-bottom: 12px;
              justify-content: center;
            }
            .exp-checkout{
                width: auto;
                padding: 12px 40px;
              }          
            .exp-wrapper{
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin: 21px 0 45px 0;
            }
            .exp-title{
                font-style: normal;
                font-weight: 600;
                font-size: 24px;
                line-height: 30px; /* identical to box height, or 125% */             
                margin-top: calc(30px - 1.25rem);
            }
       			.shoppingBag__filled section:nth-child(1) h1{
              display: none;
            }
						@media (max-width: 1024px){
                .ck-Button {
                    width: auto;
                }
            }   
            @media (max-width: 769px){
                .exp-div {
                    display: none;
                }
                .cta-continue-mobile{
                  display: flex;
                }
                .shoppingBag__filled section:nth-child(1) h1{
                  display: flex;
              }
            }
          `);
        waitForElement(".exp-empty-bag", () => {
            document.querySelector(".exp-empty-bag").classList.remove("exp-empty-bag");
          });
        return wrapper;
      }
  
      const handleCheckoutClick = () => {
        waitForElement(".exp-checkout", () => {
          document.querySelector('[data-testid="checkout-button"]').click();
        });
      };

      const handleContinueClick = () => {
        waitForElement("[data-testid='mega-menu-first-level'] li.--active a", () => {
          document.querySelector("[data-testid='mega-menu-first-level'] li.--active a").click();
        });
      };
  
  		const handleContinueMobile = () => {
        waitForElement("[data-testid='logo-link']", () => {
          document.querySelector("[data-testid='logo-link']").click();
        });
      };
    
      const wrapperCTAs = () => {
        if(document.querySelector(".exp-checkout") === null){
          const wrapper = createCTAs();
  
          waitForElement(".shoppingBag__filled", () => {
            const reference = document.querySelector(".shoppingBag__filled");
            placeBefore(wrapper, reference);
          });
  
          waitForElement(".exp-checkout", () => {
            document.querySelector(".exp-checkout").addEventListener("click", handleCheckoutClick);
          });

          waitForElement(".continue", () => {
              document.querySelector(".continue").addEventListener("click", handleContinueClick);
          });
        	waitForElement(".cta-continue-mobile", () => {
           document.querySelector(".cta-continue-mobile").addEventListener("click", handleContinueMobile);
          });
        }
      };
  		
  		const checkEmptyShoppingBag = () => { 
        
        waitForElement('[data-testid="mini-basket-link"]', () => {
          const targetNode = document.querySelector('[data-testid="mini-basket-link"]');
          const config = { attributes: true, childList: true, subtree: true };

          // Callback function to execute when mutations are observed
          const callback = (mutationList, observer) => {
            for (let mutation of mutationList) {
              if(!document.querySelector('[data-testid="mini-basket-count"]')){
                document.querySelector(".exp-div").classList.add('exp-empty-bag');
                window.ckObs.disconnect();
                Experiment.start();
              }
            }
          };
          // Create an observer instance linked to the callback function
          window.ckObs = new MutationObserver(callback);
          window.ckObs.observe(targetNode, config);
        });
          
      };
  const checkBag = () => {
        //If the bag is empty and then I add something from the recommendation list
        waitForElement(".main-layout__section.--relative", () => {
          const targetTree = document.querySelector('section[class="main-layout__section --relative"]');
          const config = { attributes: true, childList: true, subtree: true };

          // Callback function to execute when mutations are observed
          const callback = (mutationList, observer) => {
            for (let mutation of mutationList) {
              if(document.querySelector('.exp-div.exp-empty-bag') && document.querySelector('.shoppingBag__filled')){
                document.querySelector(".exp-div.exp-empty-bag").classList.remove('exp-empty-bag');
                window.ckObsever.disconnect();   
                Experiment.start();             
              }
            }
          };
          window.ckObsever = new MutationObserver(callback);
          window.ckObsever.observe(targetTree, config);
        });

      };
  
      const start = () => {
          if(document.querySelector('[data-testid="mini-basket-count"]')){
            wrapperCTAs();    
            checkEmptyShoppingBag();
            checkBag();
          }        
        };
    
        return { start };
  })();
var utils = window.optimizely.get('utils');  
utils.waitForElement(".shoppingBag__filled").then(() => {
   Experiment.start();
});
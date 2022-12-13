const Experiment = (() => {
    const icons = {
      cake: 'https://cdn.optimizely.com/img/8382950752/fd868aa87b024989af60423c00506e2a.svg',
      diamond: 'https://cdn.optimizely.com/img/8382950752/61c0e0bfc989464099355f595514042d.svg',
      discount: 'https://cdn.optimizely.com/img/8382950752/4a33cc1364b249dd8dcf596fd179543c.svg',
      xButton: 'https://cdn.optimizely.com/img/8382950752/de2ef66c0c9440349c8b1fcbf5fc923c.svg',
  };

  //   Helpers =========================================================================
 
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

  const getCopy = () => {
        const breakLine = `<br />`;
      const translations = {
        en: {
            textDiscount: `10% off your${breakLine} next order`,
            textDiamond: `Early access${breakLine} to sales`,
            textCake: `Birthday${breakLine} surprises`,
            textBtn: 'Sign up and get 10% off',
        },
        nl: {
            textDiscount: `10% korting op je volgende bestelling`,
            textDiamond: `Eerder toegang tot de sale`,
            textCake: `Verjaardagsverrassingen`,
            textBtn: `MELD JE AAN EN ONTVANG 10% KORTING OP JE VOLGENDE AANKOOP`,
        },
        de: {
          textDiscount: `10 % auf deine${breakLine} nächste Bestellung`,
          textDiamond: `Frühen Zugang${breakLine} zum Sale`,
          textCake: `Geburtstag${breakLine} Überraschungen`,
          textBtn: `ANMELDEN FÜR 10 % RABATT AUF DEINEN NÄCHSTEN KAUF`,
        },
        es: {
          textDiscount: `10% de descuento en tu próximo pedido`,
          textDiamond: `Acceso anticipado a las rebajas`,
          textCake: `Sorpresas de cumpleaños`,
          textBtn: `INSCRÍBETE PARA CONSEGUIR UN 10% DE DESCUENTO`,
        },
        it: {
          textDiscount: `10% di sconto sul tuo prossimo ordine`,
          textDiamond: `Accesso in anteprima agli articoli in saldo`,
          textCake: `Sorprese di compleanno`,
          textBtn: `REGISTRATI E OTTIENI UNO SCONTO DEL 10% SUL TUO ORDINE`,
        },
        fr: {
          textDiscount: `10 % de réduction sur${breakLine} votre prochaine commande`,
          textDiamond: `Accès anticipé${breakLine} aux soldes`,
          textCake: `Surprises${breakLine} d'anniversaire`,
          textBtn: `INSCRIVEZ-VOUS ET OBTENEZ 10 % DE REMISE SUR VOTRE PROCHAIN ACHAT.`,
        },
        pl: {
          textDiscount: `10% rabatu na kolejne zamówienie`,
          textDiamond: `Wczesny dostęp do wyprzedaży`,
          textCake: `Urodzinowe niespodzianki`,
          textBtn: `ZAREJESTRUJ SIĘ, BY OTRZYMAĆ 10% ZNIŻKI PRZY JEDNYM ZAMÓWIENIU`,
        },
    };            
     
      const local = 
          window.digitalData.site.attributes.storeLanguage[0] +
          window.digitalData.site.attributes.storeLanguage[1];

      return translations[local];
  };

  const placeAfter = function (newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  //  ================================================================================

  const addIcons = () => {
      const { textDiscount, textDiamond, textCake } = getCopy();

      waitForElement("[data-testid='NewsletterFooter']", () => {
          // Create the element
          const wrapper = document.createElement("ul");
          wrapper.classList.add('wrapper');

          //Style the element
          wrapper.innerHTML= `
              <li class="itemContainer">
                  <span><img src="${icons.discount}"/></span>
                  <p class="text">${textDiscount}</p>
              </li>
              <li class="itemContainer">
                  <span><img src="${icons.diamond}"/></span>
                  <p class="text">${textDiamond}</p>
              </li>
              <li class="itemContainer">
                  <span><img src="${icons.cake}"/></span>
                  <p class="text">${textCake}</p>
              </li>
          `;
          // Place it
          const referenceNode = document.querySelector("[data-testid='NewsletterFooter__subtext']");
          placeAfter(wrapper, referenceNode);
      });
  };

  const triggerFooterAnimation = () => {
    if(window.digitalData.site.attributes.siteDeviceVersion === 'desktop') {
        document.querySelector('.wrapper').classList.add('newsletter-benefits_transition');
       } else { 
            document.querySelector('.wrapper').style.transform = 'none';
            const reference = document.querySelector("div[class*=newsletter-footer__actions_][class*=newsletter-footer__actions--active_]");
           const signUpBtn = document.querySelector('[data-testid="Button-contrast"]');
           placeAfter(signUpBtn, reference); //Place Sign Up BTN in the right place on mobile
       }
       document.querySelector('[data-testid="NewsletterFooter__checks"]').style.opacity = '1';
  }

  const addFooterAnimation = () => { //needs improvement
    document.querySelector('div.newsletter-footer_QCCeN input').addEventListener('focus', (e) => {
        triggerFooterAnimation();
    });
     
    document.querySelector('[data-testid="NewsletterFooter"] [data-testid="Button-contrast"]').addEventListener('click', (e) => {
        document.querySelector("div[class*=newsletter-footer__actions_]").classList.add('newsletter-footer__actions--active_2p3mO');
        triggerFooterAnimation();
    });
  };

  const addStickyBtn = () => {
      const { textBtn, textBtnMobile } = getCopy();
      //Create the element
      const newsBTN = document.createElement('button');
      newsBTN.classList.add('newsletterBtn');
  
      const goNewsletter = document.querySelector('[class*=newsletter-footer_]');
      goNewsletter.id = "newsletterFooterCart";

      //Style the element
      newsBTN.innerHTML = `<a href="#newsletterFooterCart">${window.digitalData.site.attributes.siteDeviceVersion === 'desktop' ? textBtn : textBtnMobile}</a><img id="closeNewsBtn" src="${icons.xButton}" />`;
              
      //Place it       
        document.body.appendChild(newsBTN);
      if(window.digitalData.site.attributes.siteDeviceVersion === 'desktop'){
        const referenceNode = document.querySelector('[data-testid="shoppingBagUspBanner"]');
        placeAfter(newsBTN, referenceNode);
      } else{
          newsBTN.classList.add('newsletterBtnMobile');
      }            

      //Event listener to the button
      waitForElement('#closeNewsBtn', () => {
          document.querySelector('#closeNewsBtn').addEventListener('click', function(){
              newsBTN.style.display = 'none';
          });
      });

      //For smooth scroll event
      waitForElement("a[href='#newsletterFooterCart']", () => {
        function smoothScrollWindow(from, to, time){
              var start = new Date().getTime(),
              timer = setInterval(function () {
                var step = Math.min(1, (new Date().getTime() - start) / time);
          
                window.scrollTo(0, from + step * (to - from));
          
                if (step === 1) {
                  clearInterval(timer);
                }
              }, 25);
             
              document.querySelector(".newsletter-footer__actions_2Jmdt").classList
                  .add('newsletter-footer__actions--active_2p3mO');
                
                          if(window.digitalData.site.attributes.siteDeviceVersion === 'mobile'){
                  newsBTN.style.display = 'none';
                       const reference = document.querySelector("div[class*=newsletter-footer__actions_][class*=newsletter-footer__actions--active_]");
            const signUpBtn = document.querySelector('[data-testid="Button-contrast"]');
            placeAfter(signUpBtn, reference);
              } else {
                document.querySelector('.wrapper').style.transform = 'translateY(44px)';
                  }
              
          let putFocus = setInterval(() => {
                document.querySelector('div.newsletter-footer_QCCeN input').focus();
                clearInterval(putFocus);
              },900);
                              
          }
          const link = document.querySelector("a[href='#newsletterFooterCart']");
          link.addEventListener("click", () => {
            const el = document.querySelector('#newsletterFooterCart');
            smoothScrollWindow(link.getBoundingClientRect().bottom, el.getBoundingClientRect().top, 1000);
          });
      });
      
  };

  const start = () => {
      addIcons();
      addFooterAnimation();
  };

  return { start };
})();

const utils = window['optimizely'].get('utils');

function isInViewport(el) {
  if (!document.querySelector('[data-testid="newsletter-footer--success"]')) {
     var rect = el.getBoundingClientRect();
    
     return rect.bottom > 0 &&
              rect.right > 0 &&
     rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
     rect.top < (window.innerHeight || document.documentElement.clientHeight);
    }
}

function check(){
    const element = document.querySelector("[data-testid='NewsletterFooter']");
    if(isInViewport(element)){
        Experiment.start();
        document.removeEventListener('scroll', check);
    }
}
document.addEventListener('scroll', check);

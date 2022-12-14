// Variation 2
const Experiment = (() => {
    const utils = window['optimizely'].get('utils')

    const icons = {
      heart:
        'https://cdn.optimizely.com/img/8382950752/88fc5a8bad3b4b03a00cade2173b7262.svg',
      checkmark:
        'https://cdn.optimizely.com/img/8382950752/a5b6ddecf50f4b53a134298442728389.svg',
      xButton: 'https://nl.tommy.com/nextstatic/icons/cross-blue-small.svg?url',
    }
    //   ================================================================================
    //   Helpers
    //   ================================================================================
    const waitForElement = (cssSelector, cb) => {
      var t1 = new Date().getTime()
      var dif = 0
      var reqAnId = window.requestAnimationFrame(lookForElement)
  
      function lookForElement() {
        var t2 = new Date().getTime()
        dif = (t2 - t1) / 1000
  
        if (dif < 3) {
          if (elementFound()) {
            cb(cssSelector)
            cancelAnimationFrame(reqAnId)
          } else {
            window.requestAnimationFrame(lookForElement)
          }
        } else {
          cancelAnimationFrame(reqAnId)
        }
      }
  
      function elementFound() {
        var e = document.querySelector(cssSelector)
        if (e) {
          return true
        } else {
          return false
        }
      }
    }
  
    const getCopy = () => {
        const translations = {
          en: {
            title: 'Save your wishlist',
            paragraph:'Sign in or register to save your wishlist for later. We now temporarily save your wishlist and only in this browser.',
            usp1: 'Keep your wishlist for as long as you want.',
            usp2: 'Access it anytime, on any browser or device you want.',
            cta: 'sign in',
            loginMessage: '<button type="button" class="create-account" data-create-account="">Sign in or create an account</button> to save your wishlist for later',
          },
          nl: {
            title: 'Wishlist opslaan',
            paragraph: 'Log in of registreer je om je wishlist voor later te bewaren. We bewaren hem nu tijdelijk alleen in deze browser.',
            usp1: 'Bewaar je wishlist zolang je wilt.',
            usp2: 'Vraag hem op via welk apparaat of browser je ook gebruikt.',
            cta: 'Inloggen',
            loginMessage: '<button type="button" class="create-account" data-create-account="">Log in of maak een account aan</button> om je wishlist voor een later tijdstip te bewaren',
          },
          de: {
            title: 'Wunschliste speichern',
            paragraph: 'Logge dich ein oder registriere dich, um deine Wunschliste für einen späteren Einkauf zu speichern. Wir werden deine Wunschliste andernfalls nur kurzzeitig und nur in diesem Browser speichern.',
            usp1: 'Behalte deine Wunschliste so lange, wie du möchtest.',
            usp2: 'Du kannst jederzeit darauf zugreifen – in jedem Browser und auf jedem Gerät.',
            cta: 'Einloggen',
            loginMessage: 'Um deinen Wunschzettel für spätere Einkäufe zu speichern, <button type="button" class="create-account" data-create-account="">logge dich ein oder erstelle ein Konto</button>',
          },
          es: {
            title: 'Guarda tu lista de deseos',
            paragraph: 'Inicia sesión o regístrate para guardar tu lista de deseos para más tarde. Ahora también guardamos temporalmente tu lista de deseos, solo en este navegador.',
            usp1: 'Guarda tu lista de deseos tanto tiempo como quieras',
            usp2: 'Accede a tu lista en cualquier momento, desde cualquier navegador y en el dispositivo que prefieras.',
            cta: 'Inicia sesión',
            loginMessage: '<button type="button" class="create-account" data-create-account="">Inicia la sesión o regístrate</button> para guardar tu lista de favoritos para otro momento',
          },
          it: {
            title: 'Salva la tua lista dei desideri',
            paragraph: 'Accedi o registrati per salvare la tua lista dei desideri per dopo. Al momento stiamo salvando la tua lista dei desideri temporaneamente e solo in questo browser.',
            usp1: 'Mantieni la tua lista dei desideri per tutto il tempo che vuoi.',
            usp2: 'Accedi in qualunque momento, su qualsiasi browser o dispositivo che desideri.',
            cta: 'Accedi',
            loginMessage: 'Per salvare la tua lista dei desideri e utilizzarla in un altro momento <button type="button" class="create-account" data-create-account="">accedi o crea un account</button>',
          },
          fr: {
            title: 'Enregistrez votre liste de favoris',
            paragraph: 'Connectez-vous ou créez un compte pour enregistrer votre liste de favoris. Nous enregistrons temporairement votre liste de favoris et uniquement dans ce navigateur.',
            usp1: 'Conservez votre liste de favoris aussi longtemps que vous le souhaitez.',
            usp2: "Accédez-y à tout moment, sur le navigateur ou l'appareil de votre choix.",
            cta: 'Se connecter',
            loginMessage: `Pour sauvegarder votre liste de favoris, <button type="button" class="create-account" data-create-account="">connectez-vous ou créez un compte</button>`,
          },
          pl: {
            title: 'Dodaj do listy życzeń',
            paragraph: 'Zaloguj albo zarejestruj się, aby zachować swoją listę życzeń na później. Tymczasowo zapisaliśmy Twoją listę życzeń w tej przeglądarce.',
            usp1: 'Przechowuj swoją listę życzeń tak długo, jak chcesz.',
            usp2: 'Dostęp w każdej chwili, w każdej przeglądarce i na dowolnym urządzeniu.',
            cta: 'Zaloguj się',
            loginMessage: 'Jeśli chcesz zapisać listę życzeń, by mieć do niej dostęp później, <button type="button" class="create-account" data-create-account="">zaloguj się lub stwórz konto</button>',
          },
        }
    
        const locale =
          window.digitalData.site.attributes.storeLanguage[0] +
          window.digitalData.site.attributes.storeLanguage[1]
    
        return translations[locale]
      }
  
    //   ================================================================================
  
    const addBanner = () => {
      const { title, paragraph, usp1, usp2, cta } = getCopy()
  
      waitForElement('.wishlist__listing--wrap', () => {
        // Create the element
        const newDiv = document.createElement('div')
        newDiv.classList.add('wishlist-item')
        newDiv.classList.add('exp-wishlist-item')
  
        //   Style the element
        newDiv.innerHTML = `
              <div class="inner-exp-el wishlist-page">
    
                <div class="exp-x-button-wrapper">
                    <div class="exp-x-button">
                        <img src="${icons.xButton}"/>
                    </div>
                </div>
    
                  <div class="exp-heart">
                    <img src="${icons.heart}"/>
                  </div>
    
                  <p class="exp-title">${title}</p>
    
                  <p class="exp-paragraph">${paragraph}</p>
                <div class="exp-bullet-point__container">
                    <div class="exp-bullet-point" style="margin-bottom: 12px;">
                        <div class="exp-bullet-checkmark"><img src="${icons.checkmark}"/></div>
                        <div>${usp1}</div>
                    </div>
        
                    <div class="exp-bullet-point">
                        <div class="exp-bullet-checkmark"><img src="${icons.checkmark}"/></div>
                        <div>${usp2}</div>
                    </div>
                </div>
                  <button class="exp-cta" data-testid="sign-in-button" >${cta}</button>
              </div>
            `;
  
        //   Add it on the first spot
        const parentEl = document.querySelector('.wishlist__listing--wrap')
        parentEl.prepend(newDiv)
  
        const expXBtn = document.querySelector('.exp-x-button-wrapper')
        const expLoginBtn = document.querySelector('.exp-cta')
  
        const clickHandlerLoginButton = () => {
          if (document.querySelector('.sl-sign-in-or-register')) {
            window.hasClickedVariantButton = true;
            document.querySelector('.sl-sign-in-or-register').click()
          }
        }
  
        const clickHandlerXButton = () => {
          const mainEl = document.querySelector('.exp-wishlist-item')
          if (mainEl) {
            expXBtn.removeEventListener('click', clickHandlerXButton)
            mainEl.parentElement.removeChild(mainEl)
          }
        }
  
        //   After append, add event listeners
  
        if (!expXBtn.classList.contains('exp-added-click-listener')) {
          expXBtn.classList.add('exp-added-click-listener')
          expXBtn.addEventListener('click', clickHandlerXButton)
        }
  
        if (!expLoginBtn.classList.contains('exp-added-click-listener')) {
          expLoginBtn.classList.add('exp-added-click-listener')
          expLoginBtn.addEventListener('click', clickHandlerLoginButton)
        }
      })
    }

   const addLoginMessage = () => {
       utils.waitForElement('[data-testid="viewShoppingBagButton"]').then(function(shoppingBagButton) {
       const loginMessage = document.createElement('p');
       loginMessage.setAttribute('class', 'login-message');
       loginMessage.setAttribute('data-testid', 'loginMessage');
       loginMessage.innerHTML = `${getCopy().loginMessage}`;
        loginMessage.firstElementChild.addEventListener('click', function() {
            window.hasClickedVariantButton = true;
            document.querySelector('[data-testid="sign-in-button"]').click();
        })
            if (!document.querySelector('[data-testid="loginMessage"]')) {
                document.querySelector('.wishlist__listing--action-btn-wrap').insertBefore(loginMessage, shoppingBagButton);
            }
        });
    }
  
    const start = () => {
      addBanner()
      addLoginMessage();
    }
  
    return { start }
  })()
  
  Experiment.start();
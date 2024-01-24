const utils = window.optimizely.get('utils');
window.ck321 = {
  translations: {
    en: {thankYouMessage: 'Thank you! We will email you when this item is back in stock.',
    errorInput: "Sorry, that doesn't look like an email address"},
nl: {thankYouMessage: 'Bedankt! We sturen je een e-mail wanneer dit artikel weer op voorraad is.',
        errorInput: "Sorry, dit is geen geldig e-mailadres"},
de: {thankYouMessage: 'Vielen Dank! Wir melden uns per E-Mail, wenn dieser Artikel wieder auf Lager ist.',
        errorInput: "Sorry, leider scheint das keine gültige E-Mail-Adresse zu sein"},
es: {thankYouMessage: '¡Gracias! Te enviaremos un correo cuando este artículo vuelva a estar en stock.',
        errorInput: "Vaya, esto no parece una dirección de email"},
it: {thankYouMessage: 'Grazie! Ti invieremo un’e-mail quando l’articolo tornerà disponibile.',
        errorInput: "Hey, questo non sembra un indirizzo e-mail"},
fr: {thankYouMessage: 'Merci ! Nous vous enverrons un e-mail dès que cet article sera à nouveau en stock.',
        errorInput: "Désolé, on dirait bien que cette adresse e-mail n’est pas valide..."},
pl: {thankYouMessage: 'Dziękujemy! Otrzymasz wiadomość e-mail, kiedy produkt będzie ponownie dostępny.',
        errorInput: "Przepraszamy, to nie wygląda jak adres e-mail"}
    },
    placeBefore: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode)
    },
  
    fireAdobeEvent: (eventName) => {
        utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
            utag.link({
                "event_name": `${eventName}`
            });
        });
    },
    fireOptimizelyEvent: (eventName) => {
        window['optimizely'] = window['optimizely'] || [];
        window['optimizely'].push({
            type: 'event',
            eventName: eventName
        });
    },
    fireBothEvents: (eventName) => {
        if (!window[`hasFiredEvent-${eventName}`]) {
          window[`hasFiredEvent-${eventName}`] = true
          window.ck321.fireAdobeEvent(eventName)
          window.ck321.fireOptimizelyEvent(eventName)
  
          setTimeout(() => {
            window[`hasFiredEvent-${eventName}`] = false
          }, 100)
        }
      },

};  

// OOS signup rate
utils.observeSelector(`[data-testid="Modal-component"] [data-testid="notfiy-me-continue-shopping-pvh-button"]`, function(){
    document.querySelector('[data-testid="Modal-component"] [data-testid="icon-utility-cross-svg"]').addEventListener('click', function(){
         window.ck321.fireBothEvents('CK321 - OOS signup rate');
    });
  document.querySelector('[data-testid="Modal-component"] [data-testid="notfiy-me-continue-shopping-pvh-button"]').addEventListener('click', function(){
   window.ck321.fireBothEvents('CK321 - OOS signup rate');
  })
});

//PDP exit:
document.addEventListener("visibilitychange", function(){
    if(document.visibilityState === 'hidden') {
        window.ck321.fireBothEvents("CK321 - PDP exit");
    }
});
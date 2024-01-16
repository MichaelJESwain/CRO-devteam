window.ck410 = {
    addCss: function (css) {
          var s = document.createElement('style')
          s.innerHTML = css
          var h = document.querySelector('head')
          h.appendChild(s)
          return s
      },
      translations: {
         uk: "This 3-digit code is located on the back of your credit card.",
          nl: "De 3-cijferige code is te vinden op de achterkant van je creditcard.",
          de: "Dieser dreistellige Code befindet sich auf der Rückseite deiner Kreditkarte.",
          fr: "Ce code à 3 chiffres se trouve au dos de votre carte de crédit.",
          it: "Questo codice di tre cifre si trova sul retro della tua carta di credito.",
          es: "Encontrarás el código de tres dígitos en el reverso de tu tarjeta de crédito.",
          pl: "Ten trzycyfrowy kod znajduje się na odwrocie karty kredytowej.",
      },
      variant1: function(){
          const arr = window.location.host.split('.');
          const domain = arr[arr.length - 1];
          const elem = document.querySelector('.adyen-checkout__field--securityCode');
          const text = window.ck410.translations[domain];
          const textWrapper = document.createElement('div');
          textWrapper.innerHTML = text;
          elem.appendChild(textWrapper);
          textWrapper.classList.add("exp-text");
      },
    variant2: function(){
          window.ck410.addCss(`
         .AdyenComponent_AdyenComponent__lgp4z .adyen-checkout__field-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--input-col-1-2-spacing-left);
  }
  .AdyenComponent_AdyenComponent__lgp4z .adyen-checkout__field--50 { width: 100%;}
  .adyen-checkout__field--securityCode .adyen-checkout__input-wrapper{
  border-left: solid 1px #e4e4e4;
  border-left-width: thin !important;
  }
          `);
      }
     
  };
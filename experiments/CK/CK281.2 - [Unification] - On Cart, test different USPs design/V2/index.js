const Experiment = (() => {
    const translations = {
        'nl': ['Gratis bezorging bij bestellingen boven de €50.', 'Gratis retourneren 120 dagen.'],
        'en': ['Free delivery for orders above £50.', '120-day free returns.'],
        'de': ['Kostenlose Lieferung ab €60.', '120 Tage kostenloses Rückgaberecht.'],
        'fr': ["Livraison gratuite pour commandes de plus de 60 €.","Retours gratuits pendant 120 jours."],
        'it': ["Spedizione gratuita per ordini a partire da € 60.", "Reso gratuito entro 120 giorni."],
        'es': ["Sin gastos de envío en pedidos a partir de 60 €.", 'Devoluciones gratuitas de 120 días.'],
        'pl': ["Bezpłatna dostawa przy zamówieniach powyżej 429 ZŁ.", "120 dni na bezpłatny zwrot."]
    };
    const lang = document.documentElement.lang;

    const svg = [`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_701_5764" fill="white">
    <path d="M19.2 19.2H22.8V8.4L20.4 6H16.8"/>
    </mask>
    <path d="M22.8 19.2V20.2H23.8V19.2H22.8ZM22.8 8.4H23.8V7.98579L23.5072 7.69289L22.8 8.4ZM20.4 6L21.1072 5.29289L20.8143 5H20.4V6ZM19.2 20.2H22.8V18.2H19.2V20.2ZM23.8 19.2V8.4H21.8V19.2H23.8ZM23.5072 7.69289L21.1072 5.29289L19.6929 6.70711L22.0929 9.10711L23.5072 7.69289ZM20.4 5H16.8V7H20.4V5Z" fill="black" mask="url(#path-1-inside-1_701_5764)"/>
    <path d="M9.1001 18.6C9.1001 19.9807 7.98081 21.1 6.6001 21.1C5.21939 21.1 4.1001 19.9807 4.1001 18.6C4.1001 17.2193 5.21939 16.1 6.6001 16.1C7.98081 16.1 9.1001 17.2193 9.1001 18.6Z" stroke="black"/>
    <circle cx="17.3999" cy="18.6" r="2.5" stroke="black"/>
    <path d="M6 4.20001H16.8V12H22.8" stroke="black"/>
    <path d="M9 18.6H15" stroke="black"/>
    <path d="M2.3999 7.79999H9.5999" stroke="black"/>
    <path d="M1.19995 11.4H9.59995" stroke="black"/>
    </svg>`,`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_701_5767" fill="white">
    <path d="M7.59995 20.4H1.19995V6.00001L5.99995 1.20001H20.4V13.0667"/>
    </mask>
    <path d="M1.19995 20.4H0.199951V21.4H1.19995V20.4ZM1.19995 6.00001L0.492844 5.29291L0.199951 5.5858V6.00001H1.19995ZM5.99995 1.20001V0.200012H5.58574L5.29284 0.492905L5.99995 1.20001ZM20.4 1.20001H21.4V0.200012H20.4V1.20001ZM7.59995 19.4H1.19995V21.4H7.59995V19.4ZM2.19995 20.4V6.00001H0.199951V20.4H2.19995ZM1.90706 6.70712L6.70706 1.90712L5.29284 0.492905L0.492844 5.29291L1.90706 6.70712ZM5.99995 2.20001H20.4V0.200012H5.99995V2.20001ZM19.4 1.20001V13.0667H21.4V1.20001H19.4Z" fill="black" mask="url(#path-1-inside-1_701_5767)"/>
    <path d="M15 6.59999L19.8 1.79999" stroke="black"/>
    <path d="M13.2 16.8L10.8 19.65L13.2 22.8" stroke="black"/>
    <path d="M10.8 19.8H22.8" stroke="black"/>
    <path d="M15.6001 16.2H22.8001" stroke="black"/>
    <path d="M1.80005 6.59998H15V13.2" stroke="black"/>
    </svg>`];
    const waitForElement = function(cssSelector, cb){
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

    const createWrapper = () => {
        let uspWrapper = document.createElement('div');
	    uspWrapper.classList.add('cv_usp_wrapper');

        translations[lang].forEach((usp, index) => {
            let uspDiv = document.createElement('div');
            uspDiv.classList.add('cv_usp_div');

            const link = document.createElement('a');
            link.classList.add('cv_usp_text');
            link.href = "/customer-service";
            link.target = "_blank";
            link.innerText = usp;

            uspDiv.insertAdjacentHTML('afterbegin', svg[index]);
		    uspDiv.appendChild(link);

            uspWrapper.appendChild(uspDiv);
        });
		
        waitForElement('.shoppingBag__filled--separator', () => {
          document.querySelector('.shoppingBag__filled--separator').insertAdjacentElement('beforebegin', uspWrapper);
        });
        
    };

    const start = () => {
       createWrapper();
    };
      return { start };
})();
Experiment.start();
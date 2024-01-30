const Experiment = (() => {
    const translations = {
        'nl': 'Binnen 120 Dagen Na Aankoop Kun Je Bij Ons Gratis Retourneren.',
        'en': 'We Offer Free Returns Within 120 Days Of Purchase.',
        'de': 'Ab Dem Bestelldatum Kannst Du Deine Bestellung 120 Tage Lang Kostenlos Zurückschicken.',
        'fr': "Les Retours Sont Gratuits Dans Les 120 Jours Suivant L'achat.",
        'it': "Offriamo Un Servizio Di Reso Gratuito Entro 120 Giorni Dalla Data D’acquisto.",
        'es': "Las Devoluciones Son Gratuitas En Los Primeros 120 Días Tras La Compra.",
        'pl': "Oferujemy Bezpłatne Zwroty W Ciągu 120 Dni Od Daty Zakupu."
    };
    const lang = document.documentElement.lang;

    const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_701_5767" fill="white">
    <path d="M7.59995 20.4H1.19995V6.00001L5.99995 1.20001H20.4V13.0667"/>
    </mask>
    <path d="M1.19995 20.4H0.199951V21.4H1.19995V20.4ZM1.19995 6.00001L0.492844 5.29291L0.199951 5.5858V6.00001H1.19995ZM5.99995 1.20001V0.200012H5.58574L5.29284 0.492905L5.99995 1.20001ZM20.4 1.20001H21.4V0.200012H20.4V1.20001ZM7.59995 19.4H1.19995V21.4H7.59995V19.4ZM2.19995 20.4V6.00001H0.199951V20.4H2.19995ZM1.90706 6.70712L6.70706 1.90712L5.29284 0.492905L0.492844 5.29291L1.90706 6.70712ZM5.99995 2.20001H20.4V0.200012H5.99995V2.20001ZM19.4 1.20001V13.0667H21.4V1.20001H19.4Z" fill="black" mask="url(#path-1-inside-1_701_5767)"/>
    <path d="M15 6.59999L19.8 1.79999" stroke="black"/>
    <path d="M13.2 16.8L10.8 19.65L13.2 22.8" stroke="black"/>
    <path d="M10.8 19.8H22.8" stroke="black"/>
    <path d="M15.6001 16.2H22.8001" stroke="black"/>
    <path d="M1.80005 6.59998H15V13.2" stroke="black"/>
    </svg>`;
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

        let uspDiv = document.createElement('div');
        uspDiv.classList.add('cv_usp_div');

		
        const link = document.createElement('a');
        link.classList.add('cv_usp_text');
        link.href = "/customer-service";
        link.target = "_blank";
        link.innerText = translations[lang];

        waitForElement('.shoppingBag__filled--separator', () => {
          uspDiv.insertAdjacentHTML('afterbegin', svg);
		      uspDiv.appendChild(link);

          uspWrapper.appendChild(uspDiv);
          document.querySelector('.shoppingBag__filled--separator').insertAdjacentElement('beforebegin', uspWrapper);
        });

    };

    const start = () => {
       createWrapper();
    };
      return { start };
})();
Experiment.start();
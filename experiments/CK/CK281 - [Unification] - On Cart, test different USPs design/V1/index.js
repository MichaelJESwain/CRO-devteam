var utils = window.optimizely.get('utils');
const lang = document.documentElement.lang;

const svg = [`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_701_5671" fill="white">
        <path d="M19.2 19.2H22.8V8.4L20.4 6H16.8" />
    </mask>
    <path d="M22.8 19.2V20.2H23.8V19.2H22.8ZM22.8 8.4H23.8V7.98579L23.5072 7.69289L22.8 8.4ZM20.4 6L21.1072 5.29289L20.8143 5H20.4V6ZM19.2 20.2H22.8V18.2H19.2V20.2ZM23.8 19.2V8.4H21.8V19.2H23.8ZM23.5072 7.69289L21.1072 5.29289L19.6929 6.70711L22.0929 9.10711L23.5072 7.69289ZM20.4 5H16.8V7H20.4V5Z" fill="black" mask="url(#path-1-inside-1_701_5671)" />
    <path d="M9.09998 18.6C9.09998 19.9807 7.98069 21.1 6.59998 21.1C5.21926 21.1 4.09998 19.9807 4.09998 18.6C4.09998 17.2193 5.21926 16.1 6.59998 16.1C7.98069 16.1 9.09998 17.2193 9.09998 18.6Z" stroke="black" />
    <circle cx="17.4" cy="18.6" r="2.5" stroke="black" />
    <path d="M6 4.2H16.8V12H22.8" stroke="black" />
    <path d="M9 18.6H15" stroke="black" />
    <path d="M2.40002 7.8H9.60002" stroke="black" />
    <path d="M1.19995 11.4H9.59995" stroke="black" />
</svg>`, `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_701_5674" fill="white">
        <path d="M7.59995 20.4H1.19995V6L5.99995 1.2H20.4V13.0667" />
    </mask>
    <path d="M1.19995 20.4H0.199951V21.4H1.19995V20.4ZM1.19995 6L0.492844 5.29289L0.199951 5.58578V6H1.19995ZM5.99995 1.2V0.199997H5.58574L5.29284 0.49289L5.99995 1.2ZM20.4 1.2H21.4V0.199997H20.4V1.2ZM7.59995 19.4H1.19995V21.4H7.59995V19.4ZM2.19995 20.4V6H0.199951V20.4H2.19995ZM1.90706 6.7071L6.70706 1.9071L5.29284 0.49289L0.492844 5.29289L1.90706 6.7071ZM5.99995 2.2H20.4V0.199997H5.99995V2.2ZM19.4 1.2V13.0667H21.4V1.2H19.4Z" fill="black" mask="url(#path-1-inside-1_701_5674)" />
    <path d="M15 6.6L19.8 1.8" stroke="black" />
    <path d="M13.2001 16.8L10.8001 19.65L13.2001 22.8" stroke="black" />
    <path d="M10.8 19.8H22.8" stroke="black" />
    <path d="M15.6 16.2H22.8" stroke="black" />
    <path d="M1.80005 6.6H15V13.2" stroke="black" />
</svg>`];

const translations = {
	'nl': ['Gratis bezorging vanaf € 50', '120 dagen gratis retourneren'],
	'en': ['Free delivery from £50', '120-day free returns'],
	'de': ['Kostenlose Lieferung ab 60 €', 'Kostenlose Rückgabe innerhalb von 120 Tagen'],
	'fr': ['Livraison gratuite à partir de 60 € d’achats', 'Retours gratuits sous 120 jours'],
	'it': ['Consegna gratuita per ordini a partire da 60 €', 'Resi gratuiti entro 120 giorni'],
	'es': ['Envíos gratuitos desde 60 €', 'Devoluciones gratis durante 120 días'],
	'pl': ['Bezpłatna dostawa od 429 zł', 'Bezpłatne zwroty do 120 dni']
};

const fireAdobeEvent = (eventName) => {
    utils.waitUntil(function(){ return window.s && window.s.tl; }).then(function() {
        window.s.tl(this,"o", eventName);
    });
  };

const fireOptimizelyEvent = (eventName) => {
  window['optimizely'] = window['optimizely'] || [];

  window['optimizely'].push({
    type: 'event',
    eventName: eventName,
  });
};

const fireBothEvents = (eventName, isAuto) => {
  fireAdobeEvent(eventName);
  fireOptimizelyEvent(eventName);
};

function changesSeen(el) {
    if ('IntersectionObserver' in window) {
        if (el) {
            let observer;
            observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        fireBothEvents('ck281-changes-seen');
                        observer.disconnect();
                    }
                });
            }, { threshold: 1 });
            observer.observe(el);
        }
    }
}

utils.waitForElement(".shoppingBag__filled--separator").then(function(divider) { 
	// create usp box
	let uspWrapper = document.createElement('div');
	uspWrapper.classList.add('cv_usp_wrapper');
	
	translations[lang].forEach((usp, index) => {
		
		let uspDiv = document.createElement('div');
		let text = document.createElement('div');
		
		uspDiv.classList.add('cv_usp_div');
		text.classList.add('cv_usp_text');
		
		text.innerText = usp;
		
		uspDiv.insertAdjacentHTML('afterbegin', svg[index]);
		uspDiv.appendChild(text);
		
		uspWrapper.appendChild(uspDiv);
	});
	
	divider.insertAdjacentElement('beforebegin', uspWrapper);
	changesSeen(uspWrapper);
	uspWrapper.addEventListener('click', function() {
		fireBothEvents('ck281-clicks-on-the-new-usp');
	});
});
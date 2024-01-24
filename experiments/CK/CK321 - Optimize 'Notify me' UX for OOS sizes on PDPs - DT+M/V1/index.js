const utils = window.optimizely.get('utils');
const testCK321 = {
    init: function() {
      testCK321.createMessage();  
      testCK321.observeAddToBag();   
    },
    oosMessage: {
        en: 'This item is currently out of stock. Enter your email below to be notified when it becomes available.',
        nl: 'Dit item is momenteel niet op voorraad. Vul je e-mailadres hieronder in en ontvang bericht wanneer het weer verkrijgbaar is.',
        de: 'Dieser Artikel ist derzeit nicht auf Lager. Bitte gib deine E-Mail ein, wenn du benachrichtigt werden möchtest, sobald er wieder erhältlich ist.',
        es: 'Este artículo está agotado. Introduce tu correo abajo y te avisaremos cuando vuelva a estar disponible.',
        it: 'Questo articolo è attualmente esaurito. Inserisci il tuo indirizzo e-mail qui sotto e ti informeremo quando tornerà disponibile.',
        fr: 'Cet article est actuellement en rupture de stock. Indiquez votre adresse e-mail ci-dessous pour recevoir une notification de retour en stock.',
        pl: 'Ten produkt jest obecnie niedostępny. Wpisz poniżej swój adres e-mail – otrzymasz powiadomienie, kiedy będzie dostępny.'
      },
    observeAddToBag: function(){
        utils.observeSelector('[data-testid="pdpActionButton-addToBag-pvh-button"]', function(){
            if(document.querySelector('.exp-wrapper')){
                let child = document.querySelector('.exp-wrapper');
                document.querySelector('[data-testid="Right-GridItem"]').removeChild(child);
            }
            testCK321.init();
        })
    },
    createMessage: function() {
      utils.waitForElement('[data-testid="ProductActions-component"] [data-testid="pdpActionButton-notifyMe-pvh-button"]').then(function(){
        const reference = document.querySelector('[data-testid="ProductActions-component"]'); 
        const divWrapper = document.createElement("div");
        if(!document.querySelector('.exp-wrapper')){
          window.ck321.placeBefore(divWrapper, reference);
          divWrapper.classList.add('exp-wrapper');
        }
        const language = window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale;
        const text = testCK321.oosMessage[language];
        divWrapper.innerHTML = `<div class="exp-wrapper-stock">
        <div class="exp-svg"><svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.2 5.46503V16.3H17.8V5.46503L11.0821 11.6334C10.4701 12.1954 9.52985 12.1954 8.91785 11.6334L2.2 5.46503ZM16.8589 4.7L10.2705 10.7495C10.1175 10.89 9.88246 10.89 9.72946 10.7495L3.14107 4.7H16.8589ZM2 3.5C1.44772 3.5 1 3.94772 1 4.5V16.5C1 17.0523 1.44772 17.5 2 17.5H18C18.5523 17.5 19 17.0523 19 16.5V4.5C19 3.94772 18.5523 3.5 18 3.5H2Z" fill="#000000"/>
    </svg></div>
    <p class="exp-text">${text}</p>
        </div>`;
      })
      
    },
  };
utils.observeSelector('[data-testid="ProductSizeSelector-component"] [class*=ProductSizeSelector_SizeList]', function(){
testCK321.init();
});
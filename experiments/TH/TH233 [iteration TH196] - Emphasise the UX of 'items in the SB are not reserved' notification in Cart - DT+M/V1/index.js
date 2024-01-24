const TH233 = {
    translations: {
       uk: 'The items in the shopping bag are not reserved. Proceed to check out now to make them yours forever!',
        nl: 'De items in het winkelmandje zijn niet gereserveerd. Ga nu naar de kassa en zorg dat je ze niet misloopt!',
        de: 'Die Artikel im Warenkorb sind nicht reserviert. Geh jetzt zur Kasse und greife zu!',
        es: 'Los artículos de la cesta de la compra no están reservados. Completa el proceso de pago ahora para hacerte con ellos.',
        it: 'Gli articoli nel carrello non sono prenotati. Procedi al pagamento ora per farli tuoi per sempre!',
        fr: 'Les articles placés dans le panier n’ont pas été réservés. Procédez au paiement dès maintenant pour en profiter !',
        pl: 'Artykuły w koszyku nie są zarezerwowane. Przejdź do finalizacji transakcji, aby trafiły do Ciebie już na zawsze!',
    },
    createMessage: function(){
        const language = window.location.hostname.split('.')[0];
        const messageArea = document.createElement("div");
        messageArea.innerHTML = `${window.sharedTH233.icon}<p class="ext-bag-message">${TH233.translations[language]}</p>`;
  
        messageArea.classList.add("ext-bag-wrapper");      
        return messageArea;
    },
    mainFunction: () => {
        if(document.querySelector(".ext-bag-class") === null && document.querySelector('[data-testid="ShoppingBagProducts-GridItem"]') !== null){
            const messageArea = TH233.createMessage();
            messageArea.classList.add("ext-bag-class");
            let reference;    

            window.digitalData.site.attributes.siteDeviceVersion === 'desktop' ? reference = document.querySelector('[data-testid="filledShoppingBagTopCtas"]') :
            reference = document.querySelector('[class*=FilledShoppingBag_FilledShoppingBagMobileHeader__]');
            
            window.sharedTH233.waitForElement(`[data-testid="ShoppingBagProducts-GridItem"]`, () => {
                window.sharedTH233.placeAfter(messageArea, reference);
            });

            window.sharedTH233.addCss(`
            .ext-bag-wrapper{
              width: fit-content;
              height: auto;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              gap: 9px;
              margin-bottom: 13px;
            }
            .ext-bag-message{
                font-family: 'Futura Std';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 18px;
              color: #00174F;
              margin: 0;
            }
            @media (max-width: 680px){
              .ext-bag-wrapper{
                width: 100%;
                height: auto;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 0px;
                gap: 8px;
                margin: 20px 0 0;
              }
            }
					@media (max-width: 1024px){
						.theme-th [class*=th-alias_FilledShoppingBagColHeader__]{
							margin-bottom: 11px;
						}
					}
          `);
          window.sharedTH233.checkShoppingBag();
        } 
    },
  
};
const utils = window.optimizely.get('utils');
utils.observeSelector(`[data-testid="filledShoppingBagTopCtas"]`, function(){
  TH233.mainFunction();
});
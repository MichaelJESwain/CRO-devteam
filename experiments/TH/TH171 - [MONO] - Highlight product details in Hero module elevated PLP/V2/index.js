const Experiment = (() => {
    // Helpers
   const primaryCategory = window.digitalData.page.category.primaryCategoryId;
   const placeAfter = function (newNode, referenceNode) {
     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
   };
 
     const getCopy = () => {
       const translations = {
       en: {
         titleWomen: `BRUSHED JUMPER`,
         descriptionWomen: `With its brushed wool-blend fabric and TH monogram badge, this smart V-neck sweater is a standout layering piece.`,
         priceWomen: `£150.00`, 
         titleMen: `PADDED DOWN PUFFER JACKET`,
         descriptionMen: `Get winter-ready with this padded jacket – not only is it down-filled for optimum warmth, but features a striking all-over monogram pattern.`,
         priceMen: `£380.00`,
         cta: `SHOP NOW`,   
         linkWomen: `/th-monogram-brushed-jumper-ww0ww37751vlp`,
         linkMen: `/th-monogram-padded-down-puffer-jacket-mw0mw292540gy`,  
         ctaMen: `SHOP NOW`,  
       },
       nl: {
         titleWomen: `TRUI VAN GEBORSTELDE WOLMIX`,
         descriptionWomen: `Met de geborstelde wolmix en TH-monogrambadge is deze V-halstrui een eye-catching extra laag voor je outfit.`,
         priceWomen: `€ 159,90`, 
         titleMen: `GEWATTEERD PUFFERJACK`,
         descriptionMen: `Als het echt koud wordt, is het tijd voor de ultieme warmte van dit pufferjack met isolerende donsvulling en eye-catching monogramprint.`,
         priceMen: `€ 379,90`,
         cta: `BEKIJK ITEM`,  
         linkWomen: `/th-monogram-trui-van-geborstelde-wolmix-ww0ww37751vlp`,
         linkMen: `/th-monogram-gewatteerd-pufferjack-mw0mw292540gy`,
         ctaMen: `BEKIJK ITEM`,
       },
       de: {
         titleWomen: `GEBÜRSTETER PULLOVER`,
         descriptionWomen: `Gebürsteter Wollmix und TH-Monogramm-Badge machen diesen smarten Pullover mit V-Ausschnitt zu einer auffälligen Wahl für Lagen-Looks.`,
         priceWomen: `159,90 €`, 
         titleMen: `GESTEPPTE PUFFER-DAUNENJACKE`,
         descriptionMen: `Die Daunenfüllung bietet bei dieser Stepp-Jacke mit auffälligem Monogramm-Print optimale Wärme – perfekt für den Winter.`,
         priceMen: `379,90 €`,
         cta: `JETZT KAUFEN`,  
         linkWomen: `/th-monogram-gebürsteter-pullover-ww0ww37751vlp`,
         linkMen: `/th-monogram-gesteppte-puffer-daunenjacke-mw0mw292540gy`,
         ctaMen: `JETZT KAUFEN`,
       },
       es: {
         titleWomen: `JERSEY PEINADO`,
         descriptionWomen: `Este elegante jersey con cuello de pico, confeccionado en mezcla de lana peinada, luce un parche con el monograma TH en el pecho.`,
         priceWomen: `159,90 €`, 
         titleMen: `CHAQUETA ACOLCHADA DE PLUMÓN`,
         descriptionMen: `Esta chaqueta acolchada, perfecta para el invierno, incluye un cálido relleno de plumón y luce un llamativo diseño integral del monograma TH.`,
         priceMen: `379,90 €`,
         cta: `COMPRAR AHORA`,  
         linkWomen: `/jersey-peinado-th-monogram-ww0ww37751vlp`,
         linkMen: `/chaqueta-acolchada-de-plumón-th-monogram-mw0mw292540gy`,
         ctaMen: `COMPRAR AHORA`
       },
       it: {
         titleWomen: `PULLOVER CON FINITURA SPAZZOLATA`,
         descriptionWomen: `Grazie al tessuto di misto lana spazzolata e al distintivo con monogramma TH, l'elegante pullover a V è ideale da indossare a strati.`,
         priceWomen: `€ 159,90`, 
         titleMen: `PIUMINO`,
         descriptionMen: `Preparati per l'inverno con il confortevole e caldo piumino, che sfoggia un sorprendente motivo di monogrammi all over.`,
         priceMen: `€ 379,90`,
         cta: `ACQUISTA ORA`,  
         linkWomen: `/pullover-th-monogram-con-finitura-spazzolata-ww0ww37751vlp`,
         linkMen: `/piumino-th-monogram-mw0mw292540gy`,
         ctaMen: `ACQUISTA ORA`
       },
       fr: {
         titleWomen: `PULL BROSSÉ`,
         descriptionWomen: `Ce pull élégant à col en V se prête parfaitement aux superpositions. Confectionné en mélange de laine brossée, il est rehaussé d'un badge monogramme TH.`,
         priceWomen: `159,90 €`, 
         titleMen: `DOUDOUNE MATELASSÉE`,
         descriptionMen: `Préparez-vous pour l'hiver avec cette doudoune garnie de duvet synthétique, qui offre une chaleur optimale. Elle est ornée d'un motif monogramme accrocheur.`,
         priceMen: `379,90 €`,
         cta: `VOIR LE PULL`,  
         ctaMen: `VOIR LA DOUDOUNE`,
         linkWomen: `/pull-brossé-th-monogram-ww0ww37751vlp`,
         linkMen: `/doudoune-matelassée-th-monogram-mw0mw292540gy`,
       },
      
   };            
    
     const local = 
         window.digitalData.site.attributes.storeLanguage[0] +
         window.digitalData.site.attributes.storeLanguage[1];
   
     return translations[local];
   }; 
   
     // Experiment
 
     function addInfoBox(){
      const {titleWomen, descriptionWomen, cta, ctaMen, priceWomen, titleMen, descriptionMen, priceMen, linkWomen, linkMen} = getCopy();
      const reference = document.querySelector('div[class*=right_]');
 
         //Create a box 
         const article = document.createElement("article");
        
         article.innerHTML = `<header class="title">${primaryCategory === 'th_women' ? titleWomen : titleMen}</header>
    <p class="price">${primaryCategory === 'th_women' ? priceWomen : priceMen}</p>
    <p class="description">${primaryCategory === 'th_women' ? descriptionWomen : descriptionMen}</p>
  <p><a class="ctaBuy" href="${primaryCategory === 'th_women' ? linkWomen : linkMen}">${primaryCategory === 'th_women' ? cta : ctaMen}</a></p>`; 
 
         article.classList.add("infoStyles");
         //Create a wrapper for the article
         const box = document.createElement("div");
         box.classList.add("boxC");
         
         box.appendChild(article);
         reference.appendChild(box);
     }
   function heroModuleClickable(){
       const { linkWomen, linkMen } = getCopy();
       const link = document.createElement("a");
 
       //Link to the PDP
       link.href = primaryCategory === 'th_women' ? linkWomen : linkMen;
 
       //Place the link
       const heroImage = document.querySelector('div[class*=right_] picture img');
       placeAfter(link, heroImage);      
       link.appendChild(heroImage);
 
     }
        
     const start = () => {
         addInfoBox();
           heroModuleClickable();
     };
   
     return { start };
   })();
   
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
 waitForElement('[data-testid="HeroModule"]', () => {
   Experiment.start();
 }); 
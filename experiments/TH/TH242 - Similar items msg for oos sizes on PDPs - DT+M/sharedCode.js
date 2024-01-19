const utils = window.optimizely.get('utils');
window.expTH242 = {
translations: {
uk: {
  linkProd: "Shop similar products",
  textStyles: "The item you have selected is sold out, but don’t worry! Shop similar products here:",
  addToBag: "Add",
  size: "Size"
},
nl: {
  linkProd: "Shop soortgelijke producten",
  textStyles: "Het item dat je hebt geselecteerd is uitverkocht, maar maak je geen zorgen! Shop hier soortgelijke producten:",
  addToBag: "Toevoegen",
  size: 'Maat'
},
de: {
  linkProd: "Ähnliche Artikel shoppen",
  textStyles: "Der gewählte Artikel ist ausverkauft, doch keine Sorge! Hier findest du ähnliche Artikel:",
  addToBag: 'Hinzufügen',
  size: 'Größe'
},
pl: {
  linkProd: "Zobacz podobne produkty",
  textStyles: "Wybrany artykuł został wyprzedany, ale nie martw się! Tutaj znajdziesz podobne produkty:",
  addToBag: 'Dodać',
  size: 'Rozmiar'
},
it: {
  linkProd: "Acquista prodotti simili",
  textStyles: "L’articolo selezionato è esaurito, ma niente paura! Acquista prodotti simili qui:",
  addToBag: 'Aggiungere',
  size: 'Taglia'
},
fr: {
  linkProd: "Acheter des produits similaires",
  textStyles: "L’article que vous avez sélectionné est en rupture de stock, mais vous trouverez des produits similaires ici :",
  addToBag: 'Ajouter',
  size: 'Taille'
},
  es: {
    linkProd: "Comprar productos similares",
    textStyles: "El artículo que has seleccionado está agotado, pero no te preocupes, aquí tienes productos similares:",
    addToBag: 'Agregar',
    size: 'Talla'
        },
    },
language: window.location.hostname.split('.')[0],
createLink: function(){
   const link = document.createElement('div');
   const text = window.expTH242.translations[window.expTH242.language].linkProd;
   link.innerHTML = `<span class="exp-link" >${text}</span>`;
   link.classList.add('exp-link-div');
   return link;
 },
}

const fireAdobeEvent = (eventName) => {
    utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
        utag.link({
            "event_name": `${eventName}`
        });
    });
};

const fireOptimizelyEvent = (eventName) => {
    window['optimizely'] = window['optimizely'] || [];
    window['optimizely'].push({
        type: 'event',
        eventName: eventName
    });
};

const fireBothEvents = (eventName) => {
  if (!window[`hasFiredEvent-${eventName}`]) {
    window[`hasFiredEvent-${eventName}`] = true
    fireAdobeEvent(eventName)
    fireOptimizelyEvent(eventName)

    setTimeout(() => {
      window[`hasFiredEvent-${eventName}`] = false
    }, 100)
  }
};

// TH242 - Click on Similar products     (Clicks on see similar products in OOS message)
utils.observeSelector('.exp-link', function(){
    document.querySelector('.exp-link').addEventListener('click', () =>{
        fireBothEvents("TH242 - Click on Similar products")
    })
})
// TH242 - Click on Product Tile (similar products)  (Clicks on Product tile in Similar Styles)
utils.observeSelector('[data-testid="Recommendations-component-pdp_rec_injection1"] [data-testid="ProductTile-component"]', function(){
    document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection1"] [data-testid="ProductTile-component"] img').forEach(function(item){
        item.addEventListener('click', () => {
            fireBothEvents("TH242 - Click on Product Tile (similar products)")
        })
    })
})
// TH242 - Click Size selector (similar products) (Clicks on Size selector in similar styles)
utils.observeSelector('[data-context="pdp_rec_injection1"] input', function(){
    document.querySelectorAll('[data-context="pdp_rec_injection1"] input').forEach(function(item){
        item.addEventListener('click', () => {
            fireBothEvents("TH242 - Click Size selector (similar products)")
        })
    })
})
// TH242 - Click on Add to Bag (similar products)   (Clicks on Add to Bag in similar styles)
utils.observeSelector('[data-testid="ProductTile-component"] [data-testid*="Recommendations-add-button-pdp_rec_injection1-"]', function(){
    document.querySelectorAll('[data-testid="ProductTile-component"] [data-testid*="Recommendations-add-button-pdp_rec_injection1-"]').forEach(function(item){
        item.addEventListener('click', () => {
            fireBothEvents("TH242 - Click on Add to Bag (similar products)")
        })
    })
})
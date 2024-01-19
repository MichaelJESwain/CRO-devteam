const utils = window["optimizely"].get("utils");
const TH255 = {
    init: function(){
        TH255.mainFunction();
    },
    language: window.location.hostname.split('.')[0],
    cta: {
        uk:{
            success: "Item Added!",
            addToBag: "Add to Bag"
        }, 
        de: {
            success: "Der Artikel wurde hinzugefügt!",
            addToBag: "Hinzufügen"
        }, 
        nl: {
            success: "Item toegevoegd!",
            addToBag: "Toevoegen"
        }, 
        fr: {
            success: "Article ajouté !",
            addToBag: "Ajouter au panier"
        }, 
        it: {
            success: "Articolo aggiunto!",
            addToBag: "Aggiungi al carrello"
        }, 
        es: {
            success: "¡Artículo añadido!",
            addToBag: "Añadir a la cesta"
        }, 
        pl: {
            success: "Artykuł został dodany!",
            addToBag: "Dodaj do koszyka"
        }, 
    },
    icon: function(){
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12L7.5 17.5L19 4" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        wrapper.classList.add('success');
        return wrapper;
    },
    mainFunction: function(){ 
        function handleClick(){
            const btn = document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
            const text = TH255.cta[TH255.language].success;
          if(btn){
          	btn.style.backgroundColor = "#14be82";
            btn.style.border = "none";
          }
            
            utils.waitForElement('[class*=AddedToBagPopup_AddedToBagWrapper] div').then(function(){
                btn.querySelector('span').innerText = text;
                if(!document.querySelector('.success')){
                    btn.appendChild(TH255.icon());
                    btn.classList.add('newCTA');
                    btn.setAttribute('disabled', '')
                    TH255.observeModalBag();
                }
            })

        }
        utils.waitForElement('[data-testid="pdpActionButton-addToBag-pvh-button"]').then(function(){
            document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]').addEventListener('click', handleClick)
        });
       
    },

    observeModalBag: function(){
        const btn = document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
        const text = TH255.cta[TH255.language].addToBag;
        const ok = document.querySelector('.success');

        const bagInterval = setInterval(checkBag, 500);

        function checkBag(){
            if(document.querySelector('.success') && document.querySelector('.newCTA') &&
            document.querySelector('[class*=AddedToBagPopup_AddedToBagWrapper]').innerHTML === '' ){
                btn.classList.remove('newCTA');
                btn.querySelector('span').innerText = text;
                btn.removeChild(ok);
                btn.removeAttribute('disabled');
                clearInterval(bagInterval);
            }
        }
 
    },
    
}
TH255.init();
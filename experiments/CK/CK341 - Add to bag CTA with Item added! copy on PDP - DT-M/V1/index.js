const utils = window["optimizely"].get("utils");
const CK341 = {
    language: window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale,
    cta: {
        en:{
            success: "Item Added!",
            addToBag: "Add to Bag"
        }, 
        de:{
            success: "Der Artikel wurde hinzugefügt!",
            addToBag: "Hinzufügen"
        }, 
        nl:{
            success: "Item toegevoegd!",
            addToBag: "Toevoegen"
        }, 
        fr: {
            success: "Article ajouté !",
            addToBag: "Ajouter au panier"
        }, 
        it:{
            success: "Articolo aggiunto!",
            addToBag: "Aggiungi al carrello"
        }, 
        es: {
            success: "¡Artículo añadido!",
            addToBag: "Añadir a la cesta"
        }, 
        pl:{
            success: "Artykuł został dodany!",
            addToBag: "Dodaj do koszyka"
        }, 
    },
  btn: document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]'),
    icon: function(){
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12L7.5 17.5L19 4" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        wrapper.classList.add('success');
        return wrapper;
    },
    mainFunction: function(){
      console.log('CK341 test started 2')
      const text = CK341.cta[CK341.language].success;
        function handleClick(){
             if(document.querySelectorAll('[data-testid="ProductSize-component"]').length > 1){
                if(document.querySelector('[class*=ProductSize_SizeSelected__]') !== null &&
                document.querySelector('[class*=ProductSize_SizeSelected__]:not([class*=ProductSize_IsOos__])')
                ){
                    CK341.btn.style.backgroundColor = "#41850A";
                    CK341.btn.style.border = "0.0625rem solid #41850A";
                    
                    utils.waitForElement('[class*=AddedToBagPopup_AddedToBagWrapper] img').then(function(){
                        CK341.btn.querySelector('span').innerText = text;
                        if(!document.querySelector('.success')){
                            CK341.btn.appendChild(CK341.icon());
                            CK341.btn.classList.add('newCTA');
                            CK341.btn.setAttribute('disabled', '')
                            CK341.observeModalBag();
                        }
                    })
                }
            } else{
                CK341.btn.style.backgroundColor = "#41850A";
                CK341.btn.style.border = "0.0625rem solid #41850A";
                
                utils.waitForElement('[class*=AddedToBagPopup_AddedToBagWrapper] img').then(function(){
                    CK341.btn.querySelector('span').innerText = text;
                    if(!document.querySelector('.success')){
                        CK341.btn.appendChild(CK341.icon());
                        CK341.btn.classList.add('newCTA');
                        CK341.btn.setAttribute('disabled', '')
                        CK341.observeModalBag();
                    }
                })
            }
             
        }
        utils.waitForElement('[data-testid="pdpActionButton-addToBag-pvh-button"]').then(function(){
     			CK341.btn.addEventListener('click', handleClick);
        });
       
    },
    observeModalBag: function(){
        const text = CK341.cta[CK341.language].addToBag;
        const ok = document.querySelector('.success');

        function checkBag(){
            if(document.querySelector('.success') && document.querySelector('.newCTA') &&
            document.querySelector('[class*=AddedToBagPopup_AddedToBagWrapper]').innerHTML === ''){
                CK341.btn.classList.remove('newCTA');
                CK341.btn.querySelector('span').innerText = text;
                CK341.btn.removeChild(ok);
                CK341.btn.removeAttribute('disabled');
                CK341.btn.style = "none";
                clearInterval(bagInterval);
            }
        }
       const bagInterval = setInterval(checkBag, 500);
             
    },
};
CK341.mainFunction();
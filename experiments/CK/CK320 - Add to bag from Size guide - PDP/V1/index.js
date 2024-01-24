const utils = window.optimizely.get('utils');
const test = {
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    },    
    translations: {
        en: {ctaTxt: "Add To Bag",
            sizeTxt: "Select your size",
            size: 'Size',
            viewCart: 'View Shopping Bag',
            checkout: 'Checkout'}, 
      	nl: {ctaTxt: "Toevoegen",
            sizeTxt: "Selecteer je maat",
            size: 'Maat',
            viewCart: 'Bekijk winkelmand',
            checkout: 'Betaling'},
        de: {ctaTxt: "Hinzufügen",
            sizeTxt: 'Größe auswählen',
            size: 'Größe',
            viewCart: 'Warenkorb ansehen',
            checkout: 'Bezahlung',},
        pl: {ctaTxt: "Dodaj do koszyka",
            sizeTxt: 'Wybierz swój rozmiar',
            size:'Rozmiar',
						viewCart: 'Zobacz koszyk',
            checkout: 'Płatność' },
        es: {ctaTxt: "Añadir a la cesta",
            sizeTxt: 'Selecciona tu talla',
            size: 'Talla',
						viewCart: 'Ver cesta',
            checkout: 'Pago' },
        it: {ctaTxt: "Aggiungi al carrello",
            sizeTxt: 'Seleziona la tua taglia',
            size: 'Taglia',
            viewCart: 'Vedi il carrello',
            checkout: 'Pagamento'},
        fr: {ctaTxt: "Ajouter au panier",
            sizeTxt: 'Sélectionnez votre taille',
            size: 'Taille',
            viewCart: 'Voir le panier',
            checkout: 'Paiement'},
    }, 
  language: window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale,
  simulateClick: function(element) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,
      0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var cb = element; 
    var canceled = !cb.dispatchEvent(evt);
    if(canceled) {
      console.log("canceled");
    } else {
      console.log("not canceled");
    }
  },
    init: function(){
        test.nativeDropdown();
        this.createAddToBag();
    },
    createAddToBag: function(){
        const text = test.translations[test.language].ctaTxt;
    
        const addBTN = document.createElement('div');
        addBTN.setAttribute("data-testid","ProductActions-component");
    
        addBTN.classList.add("exp-add-to-bag");
        addBTN.innerHTML = `
        <button class="exp-btn exp-disabled" type="button" disabled>
        <div class="exp-div-content"><span class="exp-atb-text">${text}</span>
        </div>
        </button>`;

        let reference;    
        utils.waitForElement('.nativeDropdown').then(function(){
           if(!document.querySelector('.exp-add-to-bag')){
                reference = document.querySelector('.nativeDropdown')
                test.placeAfter(addBTN, reference);
            }
        })
    },
    miniBag: function(chosenSize){
        const picture = document.querySelector('[data-testid="scene7image-picture"]').innerHTML;
        const title = document.querySelector('[data-testid="ProductHeader-ProductName-typography-h1"]').innerHTML;
        const miniSize = chosenSize;
        const miniColor = document.querySelector('[data-testid="pdp-color-selector"] span').innerText;
        const miniPrice = document.querySelector('[data-testid="ProductHeaderPrice-PriceText"]').innerHTML;
        const miniCheckout = document.createElement("div");
      const viewCart = test.translations[test.language].viewCart;
      const checkout = test.translations[test.language].checkout;

        miniCheckout.innerHTML = `
        <div class="miniBag">
        <button type="button" aria-label="Click to close" class="exp-close-mini" data-testid="pvh-icon-button">
            <svg data-testid="icon-utility-cross-svg" viewBox="0 0 20 20" fill="none"
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" aria-hidden="true" focusable="false">
                <path d="M2 2L18 18" stroke="black"></path>
                <path d="M18 2L2 18" stroke="black"></path>
            </svg>
        </button>
        <div class="mini-wrapper">
        <div class="info">
            <div class="wrapperPicture">${picture}</div>
            <div class="info-text">
                <div class='title'>${title}</div>
                <p class='mini-size'>${miniSize}</p>
                <p class='mini-color'>${miniColor}</p>
                <p class='mini-price'>1 x ${miniPrice}</p>
            </div>
        </div>
    </div>
    <div class="exp-ctas">
    <a class="" href="shopping-bag">
        <div class="exp-btn viewCart">
            <span>${viewCart}</span>
        </div>
    </a>
    <a class="" href="checkout/login">
        <div class="exp-btn goCheckout"><span>${checkout}</span></div>
    </a>
</div>
</div>
    `;
    const reference = document.querySelector('[data-testid="Grid-component"]');
    reference.appendChild(miniCheckout);

    const referenceMask = document.querySelector('[class*="MainLayout_mainAndFooter__"]');
    const shadow = document.createElement('div');
    shadow.classList.add('exp-shadow');
    referenceMask.appendChild(shadow);

    document.querySelector('.exp-close-mini').addEventListener('click', () =>{
        reference.removeChild(miniCheckout);
        referenceMask.removeChild(shadow);
        utils.waitForElement('[class*=ProductSize_SizeSelected__] button').then(function(){
            document.querySelector('[class*=ProductSize_SizeSelected__] button').click();
        })
    })

    },
    nativeDropdown: function(){
        const text = test.translations[test.language].sizeTxt;
        const sizeText = test.translations[test.language].size;
        let sizes = [];
        let chosenSize;

        utils.waitForElement('[data-testid="ProductSize-component"]').then(function(){
            document.querySelectorAll('[data-testid="ProductSize-component"]').forEach(function(size){
                sizes.push(size.innerText)
            });
           
            let options = `<option value="" disabled="" data-testid="exp-select-label" selected>${sizeText}</option>`;
            for(let i = 0; i < sizes.length; i++){
                options = options + `<option></option>`;
            }

            const dropdownDiv = document.createElement('div');
            dropdownDiv.innerHTML = `
            <div class="exp-wrapper" role="combobox" aria-expanded="false" aria-haspopup="listbox" 
            aria-labelledby="downshift-exp-label">
            <div class="exp-select-field">
                <select class="exp-select">
                    ${options}
                </select>
            </div>
            <div data-testid="pvh-InputField" class="exp-wrap-label">
                <label for="downshift-exp-input">
                    <input aria-invalid="false" id="downshift-exp-input" placeholder=""
                        name="size-selector" type="text" readonly="" autocomplete="off" value="">
                    <span class="exp-labeltext">${text}</span>
                    <span class="InputField_InputField-icon__NPQ_t icon">
                        <svg class="exp-svg" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20" width="1em" height="1em">
                            <path stroke="currentColor" d="M19 7l-9 8-9-8"></path>
                        </svg></span>
                </label>
            </div>
        </div>
             `;
            dropdownDiv.classList.add('nativeDropdown');

            utils.waitForElement('[class*=Modal_Content__] div').then(function(){
                const reference = document.querySelector('[data-testid="TableWrapper-Component"]');
                const parent =document.querySelector('[data-testid="TableWrapper-Component"]').parentNode;
                if(!parent.querySelector('.nativeDropdown')){
                    test.placeAfter(dropdownDiv, reference);
                }
                document.querySelectorAll('.exp-select option').forEach(function(option, index){
                    if(index != 0){
                        option.value = sizes[index - 1];
                        option.innerText = sizes[index - 1];
                    }
                    
                });
                let oos = [];
                document.querySelectorAll('[data-testid="ProductSize-component"]').forEach(function(size){
                    if(size.querySelector('[class*="ProductSize_IsOos__"]')){
                        oos.push("1")
                    } else{
                        oos.push("0")
                    }
                })
                document.querySelectorAll('.exp-select option').forEach(function(option, index){
                    if(index != 0){
                        if(oos[index - 1] === '1'){
                            option.setAttribute('disabled', '');
                        }
                    }
                })

          function handleAddtoBag(){
              document.querySelector('.ReactModal__Content [data-testid="pvh-icon-button"]').click();
              const addToBag = document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
                  test.simulateClick(addToBag);
                    test.miniBag(chosenSize);
                  
                }

                function handleChooseSize(event){
                    chosenSize = event.target.value;
                    document.querySelector('.exp-labeltext').classList.add('exp-label-sizeSelected');
                    document.querySelector('.exp-wrap-label input').setAttribute('value', chosenSize)
                    document.querySelector('.exp-wrap-label input').style.paddingLeft = "12px";
                    document.querySelector('.exp-wrap-label input').style.paddingTop = "20px";
										
                    if(document.querySelector('[data-testid="exp-select-label"]')){
                        const firstOption = document.querySelector('[data-testid="exp-select-label"]');
                        document.querySelector('.exp-select').removeChild(firstOption);
                    }
                 document.querySelectorAll('[data-testid*="button-size-"]').forEach(function(option){
    							if(option.innerText.trim() == chosenSize.trim()){
                    test.simulateClick(option);
                  } 
                 });
                    
                    document.querySelector('.exp-btn').classList.remove('exp-disabled');
                    document.querySelector('.exp-btn').removeAttribute("disabled");
                    document.querySelector('.exp-btn').addEventListener('click', handleAddtoBag);

                    window.fireBothEvents("CK320-Select size in Size Guide")
                }
               
                document.querySelector('.exp-select').addEventListener("change", handleChooseSize);
                
            })
            
            document.querySelectorAll('[class*=AddedToBagPopup_AddedToBagWrapper]').forEach(function(modal){
                modal.style.zIndex="500";
            })
        })
        
    },

};
utils.observeSelector(`[data-testid="pdp-size-guide"]`, function(){
    document.querySelector('[data-testid="pdp-size-guide"] button').addEventListener('click', () => {
        test.init();
    })
});
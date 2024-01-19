const utils = window["optimizely"].get("utils");
const TH242 = {
    createModal: function(){
        const title = window.expTH242.translations[window.expTH242.language].linkProd;
        const text = window.expTH242.translations[window.expTH242.language].textStyles;
        const modal = document.createElement("div");
        const products = document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection1"] [data-testid="CarouselItem"]');
        
        modal.classList.add('exp-wrapper-similar');

        document.querySelector('[class*="MainLayout_mainAndFooter__"]').appendChild(modal)
       
        modal.innerHTML = `
        <div class="exp-modal">
            <div class="textContent">
            <div class="exp-header">
                <span>${title}</span>
                <div class="close">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 16L4 4" stroke="#00174F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 16L16 4" stroke="#00174F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <p class="exp-subText"><span>${text}</span></p>
            </div>
            <div class="exp-products">
            </div>
        </div>
        `;

        products.forEach(function(prod){
            document.querySelector(".exp-products").appendChild(prod);
        });
 
        const btn = document.querySelectorAll('.exp-wrapper-similar [class*="Button_buttonContent__"]');
        btn.forEach(function(btn){
            btn.innerText =  window.expTH242.translations[window.expTH242.language].addToBag;
        });

        const sizes = document.querySelectorAll('.exp-wrapper-similar [data-testid="Recommendations-size-selectInput-inputLabelText"]');
        sizes.forEach(function(size){
            size.innerText = window.expTH242.translations[window.expTH242.language].size;
        })
        
        const reference = document.querySelector('[class*="MainLayout_mainAndFooter__"]');
        const shadow = document.createElement('div');
        shadow.classList.add('exp-shadow');
        reference.appendChild(shadow);
      
document.querySelector('body').style.overflowY="clip";      

        document.querySelector('.close').addEventListener('click', function(){
            const originalPlaces = document.querySelectorAll('[data-context="pdp_rec_injection1"] [class*="Carousel_slide__"]');
            document.querySelector('.exp-wrapper-similar').style.display = "none";
            document.querySelector('.exp-shadow').style.display = "none";
            document.querySelector('[class*=Recommendations_NavButton__] [aria-label="Next slide TRANSLATION"][data-testid="pvh-icon-button"]').style.display = "initial";
          document.querySelector('body').style.overflowY="auto";

            products.forEach(function(prod, index){
                originalPlaces[index].appendChild(prod);
            })

        })
        
    },
    handleClick: function(){
        if(document.querySelector('.exp-wrapper-similar')){
            document.querySelector('.exp-wrapper-similar').style.display = "initial";
            document.querySelector('.exp-shadow').style.display = "initial";
            const products = document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection1"] [data-testid="CarouselItem"]');
            products.forEach(function(prod){
                document.querySelector(".exp-products").appendChild(prod);
            })
        } else{
            TH242.createModal();
        }

        document.querySelector('[class*=Recommendations_NavButton__] [aria-label="Next slide TRANSLATION"][data-testid="pvh-icon-button"]').style.display = "none";
       
    },
    mainFunction: function(){
        utils.observeSelector('[data-testid="pvh-IconWithText"]', function(){
            const link = window.expTH242.createLink();
            const OOStext = document.querySelector('[data-testid="pvh-IconWithText"]');

            if(!document.querySelector('.exp-link') && document.querySelector('[class*=ProductSize_SizeSelected__][class*=ProductSize_IsOos__]') ){
                OOStext.appendChild(link);
                link.addEventListener('click', TH242.handleClick);
            }
           
            document.querySelectorAll('[class*=AddedToBagPopup_AddedToBagWrapper]').forEach(function(modal){
                modal.style.zIndex="500";
            })

        })
    },
}
utils.observeSelector('[class*=ProductSize_SizeSelected__][class*=ProductSize_IsOos__]', () => {
TH242.mainFunction();
})
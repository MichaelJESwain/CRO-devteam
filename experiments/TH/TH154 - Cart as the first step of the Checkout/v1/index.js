const utils = window["optimizely"].get("utils");

const Experiment = (() => {
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
  const getCopy = () => {
    const translations = {
    en: {
        textShoppingBag: `Shopping bag`,
        textCart: `Cart`,
      	textDetails: 'Details',
        textDelivery: 'Delivery',
        textPayment: 'Payment'
    },
    nl: {
      textShoppingBag: `Winkelmand`,
      textCart: `Winkelwagen`,
      textDetails: 'Gegevens',
      textDelivery: 'Bezorging',
      textPayment: 'Betalen'
    },
    de: {
      textShoppingBag: `Warenkorb`,
      textCart: `Einkaufswagen`,
      textDetails: 'Details',
      textDelivery: 'Versand',
      textPayment: 'Bezahlung'
    },
    es: {
      textShoppingBag: `Cesta de la compra`,
      textCart: `Cesta`,
      textDetails: 'Detalles',
      textDelivery: 'Envío',
      textPayment: 'Pago'
    },
    it: {
      textShoppingBag: `Carrello degli acquisti`,
      textCart: `Carrello`,
      textDetails: 'Dettagli',
      textDelivery: 'Consegna',
      textPayment: 'Pagamento'
    },
    fr: {
      textShoppingBag: `Panier d'achat`,
      textCart: `Panier`,
      textDetails: 'Détails',
      textDelivery: 'Livraison',
      textPayment: 'Paiement'
    },
    pl: {
      textShoppingBag: `Koszyk`,
      textCart: `Zamówienie`,
      textDetails: 'Szczegóły',
      textDelivery: 'Dostawa',
      textPayment: 'Płatność'
    },
};            
      const local = document.documentElement.lang;
      return translations[local];
  
};

    const placeAfter = function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };

    const placeBefore = function (newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode);
    };

        const bag = document.createElement("span");
        bag.innerHTML = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.75288 7.21375L1.20207 15.5872C1.1676 16.1114 1.56971 16.5639 2.10021 16.5979C2.121 16.5993 2.14182 16.5999 2.16264 16.5999H13.8374C14.369 16.5999 14.8 16.1742 14.8 15.6489C14.8 15.6283 14.7993 15.6078 14.798 15.5872L14.2472 7.21375C14.2143 6.71352 13.794 6.3244 13.2866 6.3244H2.71345C2.20606 6.3244 1.78579 6.71352 1.75288 7.21375Z" stroke="#001652" stroke-width="1.4"/>
<path d="M5.362 10.3249L5.77244 3.42493C5.8401 2.28782 6.79319 1.3999 7.94611 1.3999C9.09573 1.3999 10.0461 2.28527 10.1135 3.41912L10.5243 10.3249" stroke="#001652" stroke-width="1.4"/>
</svg>`; 

        const details = document.createElement("span");
        details.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.01" width="24" height="24" fill="white"/>
        <circle cx="12.1176" cy="7.76471" r="3.76471" stroke="#969696" stroke-width="1.4"/>
        <ellipse cx="12.1176" cy="16.2353" rx="6.11765" ry="3.76471" stroke="#969696" stroke-width="1.4"/>
        </svg>`;

        const delivery = document.createElement("span");
        delivery.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.01" width="24" height="24" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0851 6.46418C13.845 6.17988 13.487 6 13.0885 6H5.03859L4.8966 6.00768C4.24347 6.07879 3.73181 6.63475 3.73181 7.31461L3.73015 11.3034C3.29832 11.5173 3 11.9642 3 12.4833V15.4944L3.0077 15.638C3.0789 16.2984 3.63533 16.809 4.30678 16.809L4.47346 16.8095C4.58418 18.0396 5.61606 19 6.86812 19C8.12018 19 9.15205 18.0396 9.26278 16.8095H14.3529C14.4636 18.0396 15.4955 19 16.7476 19C17.9996 19 19.0315 18.0396 19.1422 16.8095L19.6932 16.809L19.8352 16.8013C20.4883 16.7302 21 16.1742 21 15.4944L20.9816 13.0276L20.9816 11.5677L18.1697 7.447L18.071 7.31977C17.8244 7.03937 17.4686 6.8764 17.0924 6.8764L14.321 6.87626C14.2709 6.73368 14.1971 6.60251 14.1043 6.48746L14.1036 6.46559L14.0851 6.46418ZM5.61356 16.5899C5.61356 15.9066 6.17294 15.3483 6.86812 15.3483C7.56329 15.3483 8.12268 15.9066 8.12268 16.5899C8.12268 17.2732 7.56329 17.8315 6.86812 17.8315C6.17294 17.8315 5.61356 17.2732 5.61356 16.5899ZM16.7476 15.3483C16.0524 15.3483 15.493 15.9066 15.493 16.5899C15.493 17.2732 16.0524 17.8315 16.7476 17.8315C17.4427 17.8315 18.0021 17.2732 18.0021 16.5899C18.0021 15.9066 17.4427 15.3483 16.7476 15.3483ZM14.1036 8.04455H15.5844L15.5845 12.2809L19.8312 12.2802L19.8317 13.032L19.8501 15.4988L19.8423 15.5419C19.8221 15.5971 19.7644 15.6404 19.6932 15.6404L18.9575 15.6384C18.589 14.7796 17.7371 14.1798 16.7476 14.1798C15.7581 14.1798 14.9061 14.7796 14.5376 15.6384H9.07805C8.70958 14.7796 7.85761 14.1798 6.86812 14.1798C5.87817 14.1798 5.02587 14.7802 4.65768 15.6395L4.30678 15.6404L4.25632 15.6328C4.1934 15.6129 4.14994 15.557 4.14994 15.4944V12.4833L4.15771 12.4381C4.17794 12.3806 4.23564 12.3373 4.30678 12.3373L4.3056 12.3345L14.1036 12.3357L14.1036 8.04455ZM13.0885 7.16854H5.03859C4.96745 7.16854 4.90975 7.21192 4.88952 7.26935L4.88175 7.31461L4.8816 11.4588L13.2412 11.4593L13.2408 7.29173L13.2376 7.26935C13.2224 7.22628 13.1862 7.19111 13.139 7.17621L13.0885 7.16854ZM17.0923 8.04494L17.1445 8.05328C17.1774 8.06413 17.2058 8.08504 17.2247 8.11285L19.8174 12.0143L16.447 11.4045L16.446 8.04455L17.0923 8.04494Z" fill="#969696"/>
        </svg>`;

        const payment = document.createElement("span");
        payment.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.01" width="24" height="24" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 4.05882C7.61421 4.05882 4.05882 7.61421 4.05882 12C4.05882 16.3858 7.61421 19.9412 12 19.9412C16.3858 19.9412 19.9412 16.3858 19.9412 12C19.9412 7.61421 16.3858 4.05882 12 4.05882ZM18.7765 12C18.7765 8.25746 15.7425 5.22353 12 5.22353C8.25746 5.22353 5.22353 8.25746 5.22353 12C5.22353 15.7425 8.25746 18.7765 12 18.7765C15.7425 18.7765 18.7765 15.7425 18.7765 12ZM12 6.07059C8.72528 6.07059 6.07059 8.72528 6.07059 12C6.07059 15.2747 8.72528 17.9294 12 17.9294C15.2747 17.9294 17.9294 15.2747 17.9294 12C17.9294 8.72528 15.2747 6.07059 12 6.07059ZM14.5074 8.60451C14.1278 8.44318 13.473 8.33879 12.8751 8.33879C11.1005 8.33879 9.65798 9.37321 9.30685 11.0055H8.73744L8.48121 11.7552H9.28787C9.27838 11.8217 9.26889 11.9925 9.26889 12.1253L9.27007 12.238L9.27838 12.3151H8.6805L8.43376 13.0459H9.37328C9.65798 14.7256 10.9676 15.7506 12.5904 15.7506C13.3401 15.7506 13.938 15.5892 14.3081 15.3899L13.9855 13.9095C13.6723 14.0898 13.2263 14.2037 12.7612 14.2037C11.9925 14.2037 11.4136 13.7766 11.1859 13.0459H13.1029L13.3496 12.3151H11.091C11.0862 12.2629 11.0839 12.2155 11.0827 12.1645L11.0818 11.9162C11.0825 11.8607 11.0847 11.7995 11.091 11.7552H13.492L13.7292 11.0055H11.1764C11.3567 10.2843 12.1349 9.8572 12.8846 9.8572C13.2642 9.8572 13.6628 9.91414 13.938 10.0565L14.5074 8.60451Z" fill="#969696"/>
        </svg>`;

    const shoppingCartPage = () => {
        const { textShoppingBag, textDetails, textDelivery, textPayment } = getCopy();
       waitForElement('.SectionHeader', () => {
          const header = document.querySelector(".SectionHeader");
        
          const breadcrumbShopping = document.createElement('ol');
          breadcrumbShopping.classList.add("checkout-breadcrumb");
          breadcrumbShopping.classList.add("exp-breadcrumb");

          breadcrumbShopping.innerHTML = `
          <li class="stepCheckout">
              ${bag.innerHTML} 
              <span class="exp-text">${textShoppingBag}</span>
              <span class="checkout-breadcrumb__item--divider "></span>
          </li>
          <li class="stepCheckout">
              ${details.innerHTML}
              <span class="exp-text">${textDetails}</span>
              <span class="checkout-breadcrumb__item--divider "></span>
          </li>
          <li class="stepCheckout">
              ${delivery.innerHTML} 
              <span class="exp-text">${textDelivery}</span>
              <span class="checkout-breadcrumb__item--divider "></span>
          </li>
          <li class="stepCheckout">
              ${payment.innerHTML} 
              <span class="exp-text">${textPayment}</span>
          </li>
          `;

          const headingWrapper = document.createElement("div");
          if(document.querySelector(".ShoppingBagContainer").className === 'ShoppingBagContainer new-shopping-bag-design'){
            header.parentNode.insertBefore(headingWrapper, header);
            headingWrapper.appendChild(header);
            
            headingWrapper.classList.add("exp-wrapper");
            
            placeAfter(breadcrumbShopping, header);
          }
          document.querySelector(".ShoppingBagContainer").classList.add('exp-tester');             
    });
       
    };

    const checkoutPages = () => {
      //console.log("I am on the checkout page");
      const { textShoppingBag } = getCopy();

      waitForElement('[data-testid="CheckoutBreadCrumb"]', () => {
        const checkoutBreadCrumb = document.querySelector('[data-testid="CheckoutBreadCrumb"]');
        const shoppingBag = document.createElement("li");
        shoppingBag.classList.add("checkout-breadcrumb__item");
        

        //Place the new list item
        const detailsItem = document.querySelector("li[id='1']");
        checkoutBreadCrumb.appendChild(shoppingBag);
        placeBefore(shoppingBag, detailsItem);

        //Content - new list item
        shoppingBag.innerHTML = `
					<a class="checkout-breadcrumb__link" href="/shopping-bag">
          <span class="tickCheckout"></span>
          <span class="exp-shopping-text">${textShoppingBag}</span>
          <span class="checkout-breadcrumb__item--divider has-tick"></span></a>
        `;

      });
    };

    const start = () => {
      if(window.location.href.indexOf("shopping") > -1){
        shoppingCartPage();
      }
      else if(window.location.href.indexOf("checkout") === 21){
        checkoutPages();
      }
       
    };

    return { start };
})();

//On the shopping bag page  
utils.observeSelector('[data-testid="basket-count"]', () => {
  Experiment.start();
});
//On the checkout pages
utils.observeSelector('[data-testid="CheckoutBreadCrumb"]', () => {
  Experiment.start();
});
 
window.TH196 = {
    init: () => console.log("window.TH196 started"),
    waitForElement: function(cssSelector, cb){
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
    },
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
     },
    translations: {
        uk: 'Items in the shopping bag are not reserved.',
        nl: 'Artikelen in de winkelmand zijn niet gereserveerd.',
        de: 'Artikel im Warenkorb werden nicht reserviert.',
        es: 'Los artículos en la Cesta no están reservados.',
        it: 'Gli articoli nel carrello non vengono riservati.',
        fr: 'Les articles dans le panier ne sont pas réservés.',
    },
    icon : `<svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8.4" stroke="#00174F" stroke-width="1.2"/>
    <path d="M9.59998 12.4C9.59998 12.7314 9.33135 13 8.99998 13C8.6686 13 8.39998 12.7314 8.39998 12.4L8.39998 7.6C8.39998 7.26863 8.66861 7 8.99998 7C9.33135 7 9.59998 7.26863 9.59998 7.6L9.59998 12.4Z" fill="#00174F"/>
    <path d="M9.59998 5.4C9.59998 5.73137 9.33135 6 8.99998 6C8.6686 6 8.39998 5.73137 8.39998 5.4C8.39998 5.06863 8.6686 4.8 8.99998 4.8C9.33135 4.8 9.59998 5.06863 9.59998 5.4Z" fill="#00174F"/>
    </svg>`,
    createMessage: function(){
        const language = window.location.hostname.split('.')[0];
                     
        const messageArea = document.createElement("div");
        messageArea.innerHTML = `${this.icon}<p class="ext-bag-message">${this.translations[language]}</p>`;
  
        messageArea.classList.add("ext-bag-wrapper");      
        return messageArea;
    },
  
  };  
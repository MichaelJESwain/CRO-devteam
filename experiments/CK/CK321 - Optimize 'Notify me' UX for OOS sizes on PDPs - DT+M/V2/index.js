const utils = window.optimizely.get('utils');
const testCK321 = {
init: function(){
  testCK321.createMessage();   
  testCK321.createEmailInput();
  testCK321.observeAddToBag();
},
oosMessage: {
en: 'This size is currently out of stock, but don’t worry! Enter your email address below and we’ll notify you when it becomes available again.',
nl: 'Deze maat is momenteel niet op voorraad, maar maak je geen zorgen! Vul hieronder je e-mailadres in en wij laten je weten wanneer deze weer verkrijgbaar is.',
de: 'Diese Größe ist derzeit leider vergriffen. Doch keine Sorge! Gib hier deine E-Mail-Adresse ein und wir benachrichtigen dich, sobald sie wieder lieferbar ist.',
es: 'En estos momentos esta talla no está disponible, pero no te preocupes. Introduce tu correo electrónico y te avisaremos cuando vuelva a estar disponible.',
it: 'Questa taglia è al momento esaurita ma non preoccuparti! Inserisci il tuo indirizzo e-mail qui sotto e ti avviseremo quando sarà nuovamente disponibile.',
fr: 'Cette taille est actuellement en rupture de stock, mais pas d’inquiétude ! Indiquez ci-dessous votre adresse e-mail et nous vous informerons lorsqu’elle sera de nouveau disponible',
pl: 'Ten rozmiar nie jest aktualnie dostępny, ale nie martw się! Wprowadź swój adres e-mail poniżej, a powiadomimy Cię, gdy znów się pojawi.'
},
placeholder: {
en: 'Email',
nl: 'E-mail',
de: 'E-mail',
it: 'Email',
fr: 'E-mail',
es: 'EMAIL',
pl: 'E-mail',
},  
createMessage: function() {
 utils.waitForElement('[data-testid="ProductActions-component"] [data-testid="pdpActionButton-notifyMe-pvh-button"]').then(function(){
    if(document.querySelector('.messageWrapper') === null){
        const reference = document.querySelector('[data-testid="ProductActions-component"]'); 
        const divWrapper = document.createElement("div");
       // window.ck321.placeBefore(divWrapper, reference );
      reference.parentNode.insertBefore(divWrapper, reference);
        divWrapper.classList.add('messageWrapper');
        const language = window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale;
        const text = testCK321.oosMessage[language];
        divWrapper.innerHTML = `<div class="exp-wrapper-stock">
        <div class="exp-svg"><svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.2 5.46503V16.3H17.8V5.46503L11.0821 11.6334C10.4701 12.1954 9.52985 12.1954 8.91785 11.6334L2.2 5.46503ZM16.8589 4.7L10.2705 10.7495C10.1175 10.89 9.88246 10.89 9.72946 10.7495L3.14107 4.7H16.8589ZM2 3.5C1.44772 3.5 1 3.94772 1 4.5V16.5C1 17.0523 1.44772 17.5 2 17.5H18C18.5523 17.5 19 17.0523 19 16.5V4.5C19 3.94772 18.5523 3.5 18 3.5H2Z" fill="#000000"/>
        </svg></div>
        <p class="exp-text">${text}</p></div>`;
    }
 })
  
},
createEmailInput: function() {
  utils.waitForElement('[data-testid="ProductActions-component"] [data-testid="pdpActionButton-notifyMe-pvh-button"]').then(function(){
    const emailWrapper = document.createElement("div");
    const language =  window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale;
    const text = window.ck321.translations[language].errorInput;
    const placeholder = testCK321.placeholder[language];
    let flagInput = false;
      
      function checkInput(){
        let icon = document.querySelector('[data-testid="icon-utility-check-svg"]');
        let errorMsg = document.querySelector('.exp-error-msg');
        let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let mailInput = document.querySelector('.exp-input');

        if(mailInput.value.match(mailRegex)){
          icon.style.display="flex";
          errorMsg.style.display = "none";
          mailInput.style.padding = "padding: 16px 0 10px 16px !important;";
          flagInput = true;
        } else if(mailInput.value == "") {
          icon.style.display = "none";
          errorMsg.style.display = "none";
          mailInput.style.padding = "padding: 26px 0 10px 16px !important;";
        } else { //error
          icon.style.display="none";
          errorMsg.style.display = "inline";
          errorMsg.style.fontFamily = "Klein Web";
        }

      }
      function handleClick(e){
        utils.waitForElement(".ReactModalPortal").then(function(){
          document.querySelector(".ReactModalPortal").style.display="none";
          if(flagInput){
            sessionStorage.setItem("ck321EmailSubmitted", true);  
            testCK321.init();
          }
        })
          
      }

      emailWrapper.innerHTML = `<form  id="login-form" method="post"  aria-label="Sign in" novalidate>
      <div data-testid="pvh-InputField" class="rootComponentName InputField_InputField__9RA94 InputField_required__IY9U_">
      <label for="email-login-form">
      <input class="exp-input" aria-invalid="false" id="email-login-form" placeholder=${placeholder} name="email" type="email" data-testid="email-inputField">
      <span class="InputField_InputField-labeltext__bM0Qs" data-testid="email-inputLabelText">${placeholder}</span>
      <span class="InputField_InputField-icon__NPQ_t icon">
      <svg class="Icon_Icon__qPZ8O Icon_regular__MbCqv" data-testid="icon-utility-check-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="1em" height="1em">
      <path stroke="#41850a" d="M2.5 10.5L8 16 18.5 3.5"></path>
      </svg></span>
      
      </label>
      <p class="exp-error-msg">${text}</p>
      </div></form>`;
      if(document.querySelector('.inputWrapper') === null){
        emailWrapper.classList.add('inputWrapper');

      const reference = document.querySelector('[data-testid="ProductActions-component"]');
      //window.ck321.placeBefore(emailWrapper, reference);
      reference.parentNode.insertBefore(emailWrapper, reference); 

      const notifyBTN = document.querySelector('[data-testid="ProductActions-component"] button');
      notifyBTN.setAttribute("type", "submit");
      notifyBTN.setAttribute("form", "login-form");
      
      document.querySelector('[data-testid="ProductActions-component"] [data-testid="pdpActionButton-notifyMe-pvh-button"]').addEventListener("click", handleClick);
      document.querySelector('.exp-input').addEventListener("input", checkInput);
      }
  })
    
},
createSuccessMsg: function(){
    const language = window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale;
    const msgText = window.ck321.translations[language].thankYouMessage;

    const msgWrapper = document.createElement('div');
    msgWrapper.innerHTML = `<div class="exp-msgWrapper" data-testid="pvh-IconWithText">
    <div style="display: flex;align-items: center;"><svg class="exp-ok" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 10.5L8 16L18.5 3.5" stroke="white"/>
</svg></div>
    <span>
    <p>${msgText}</p></span>
    <div style="display: flex;align-items: center;"><svg class="exp-close" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2L18 18" stroke="white"/>
<path d="M18 2L2 18" stroke="white"/>
</svg></div>
    </div>`;

    const reference = document.querySelector('#main-and-footer');
    reference.appendChild(msgWrapper);
   
  utils.waitForElement('.exp-close').then(function(){
    document.querySelector('.exp-close').addEventListener("click", function(){
        document.querySelector('.exp-msgWrapper').style.display = "none";
        sessionStorage.setItem("ck321EmailSubmitted", false);
        testCK321.init();
        window.ck321.fireBothEvents('CK321 - OOS signup rate');
      });
      testCK321.observeSizes();
  })
 addEventListener("beforeunload", (event) => {
    if(document.querySelector('.exp-msgWrapper')){
      document.querySelector('.exp-msgWrapper').style.display = "none";
      let child = document.querySelector('.exp-msgWrapper').parentNode;
      document.querySelector('#main-and-footer').removeChild(child);
      sessionStorage.setItem("ck321EmailSubmitted", false);
    }
  });
  
},
observeSizes: function(){
  function handleClickSize(){
    let data = sessionStorage.getItem("ck321EmailSubmitted");  
    if(data == "true"){
      document.querySelector('.exp-msgWrapper').style.display="none";
      let child = document.querySelector('.exp-msgWrapper').parentNode;
      document.querySelector('#main-and-footer').removeChild(child);
      sessionStorage.setItem("ck321EmailSubmitted", false);
      testCK321.init();
    } 
  }
  utils.waitForElement('.exp-close').then(function(){
    document.querySelectorAll('[data-testid="ProductSize-component"]').forEach(function(size){
        size.addEventListener('click', handleClickSize);
      })
  })
    
},
observeAddToBag: function(){
  function callback(mutationList) {
    mutationList.forEach((mutation) => {
      if(mutation.type === "attributes") {
        if(document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]')){
          let data = sessionStorage.getItem("ck321EmailSubmitted");   
          if(document.querySelector(".messageWrapper")){
            let child = document.querySelector(".messageWrapper");
            document.querySelector('[data-testid="Right-GridItem"]').removeChild(child);
          }
          if(document.querySelector('.inputWrapper')){
            let child = document.querySelector('.inputWrapper');
            document.querySelector('[data-testid="Right-GridItem"]').removeChild(child);
          }
          if(document.querySelector('.exp-msgWrapper') && data != "true"){
            let child = document.querySelector('.exp-msgWrapper').parentNode;
            document.querySelector('#main-and-footer').removeChild(child);
          }
          testCK321.init();
        } 
          
      }
    });
  }
  let target;
  utils.waitForElement('[data-testid="pdpActionButton-addToBag-pvh-button"]').then(function(){
    target = document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
    const observer = new MutationObserver(callback);
    observer.observe(target, {
      attributes: true,
      subtree: true,
    });
  })
  
},

};
utils.observeSelector(`[data-testid="ProductSizeSelector-component"] [class*=ProductSizeSelector_SizeList]`, function(){
let data = sessionStorage.getItem("ck321EmailSubmitted");        
if(data == "true"){
testCK321.createSuccessMsg();
} else {
testCK321.init();
}
});
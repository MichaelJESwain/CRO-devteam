const utils = window.optimizely.get('utils');
const TH260 = {
    translations: {
        nl: 'Selecteer uw bank om door te gaan met de bestelling.',
        pl: 'Proszę wybrać bank, aby kontynuować.'
    },
    init: function(){
        console.log("TH260 started")
        TH260.mainFunction();
    },
    language: window.__NEXT_DATA__.props.pageProps.host.split('.')[0],
    createNotification: function(){
        const text = this.translations[this.language];
        const wrapper = document.createElement('div');
        wrapper.classList.add('exp-notification');
        wrapper.innerHTML = `
        <div class="exp-box">
        <div class="exp-icon">
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="9" cy="9" r="8.4" stroke="#CC0C2F" stroke-width="1.2"/>
  <path d="M9.59998 12.4C9.59998 12.7314 9.33135 13 8.99998 13C8.6686 13 8.39998 12.7314 8.39998 12.4L8.39998 7.6C8.39998 7.26863 8.66861 7 8.99998 7C9.33135 7 9.59998 7.26863 9.59998 7.6L9.59998 12.4Z" fill="#CC0C2F"/>
  <path d="M9.59998 5.4C9.59998 5.73137 9.33135 6 8.99998 6C8.6686 6 8.39998 5.73137 8.39998 5.4C8.39998 5.06863 8.6686 4.8 8.99998 4.8C9.33135 4.8 9.59998 5.06863 9.59998 5.4Z" fill="#CC0C2F"/>
  </svg>
        </div>
        <div class="exp-text">${text}</div>
        </div>
        `;
        return wrapper;
    },
    mainFunction: function(){
        const notification = this.createNotification();
      utils.waitForElement('[data-testid="ideal-container"]').then(function(){
          const parent = document.querySelector('[data-testid="ideal-pvh-selectionItem"]');
          if(!document.querySelector('.exp-notification')){
       parent.querySelector('[class*=PaymentMethods_PaymentsAdditionalText__]').appendChild(notification);
         }
        });
      utils.waitForElement('[data-testid="onlineBanking_PL-pvh-selectionItem"]').then(function(){
          const parent = document.querySelector('[data-testid="onlineBanking_PL-pvh-selectionItem"]');
          if(!document.querySelector('.exp-notification')){
       parent.querySelector('[class*=PaymentMethods_PaymentsAdditionalText__]').appendChild(notification);
         }
        });
    },

}
utils.observeSelector('[data-testid="payments-wrapper"]', () => {
    TH260.init();
});
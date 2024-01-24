const Experiment = (() => {
    function getCopy(){
         const translations = {
         uk: { text: 'sale' },
         nl: { text: 'sale' },
         de: { text: 'sale' },
         es: { text: 'rebajas' },
         it: { text: 'saldi' },
         fr: { text: 'soldes' },
         pl: { text: 'wyprzedaz' },
       };
      const locale = window.location.hostname.split('.')[0];  
      return translations[locale];
     }
     const mainFunction = () => {
         window.TH218.waitForElement('[data-testid="nav-menu-container"]', () =>{
         window.TH218.addCss(` div[class*='nav__primary-sub_'][class*='tertiary-level_']{ display: none; }
 [data-testid="nav-primary-sub"] a[href="/tommy-jeans"],
 [data-testid="nav-primary-sub"] a[href="/tommy-stories"][data-nav-category-title=""][class*=nav__category-title--search_]
 { display: none; }
 `);
      const { text } = getCopy();
      window.TH218.addCss(`[data-testid="nav-primary-sub"] a[href="/${text}"][class*=nav__category-title_]{ display: none; }`);
            
         });
     };
     const start = () => {
       mainFunction();
     };
     return { start };
 })();
 Experiment.start(); 
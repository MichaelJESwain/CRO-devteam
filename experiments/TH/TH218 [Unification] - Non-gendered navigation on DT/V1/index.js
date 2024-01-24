const Experiment = (() => {
    const mainFunction = () => {
    window.TH218.waitForElement('[data-testid="nav-menu-container"]', () =>{
            window.TH218.addCss(`
             div[class*='nav__primary-sub_'][class*='tertiary-level_']{ display: none;}
                `);
        });
    };
    const start = () => {
      mainFunction();
    };
    return { start };
  })();
Experiment.start();
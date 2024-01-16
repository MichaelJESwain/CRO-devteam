function callbackFn(activate, options) {
    const isMWglp = new RegExp('/(men|women|heren|dames|herren|damen|femme|homme|donne|uomini|mujeres|hombres|kobiety|mezczyzni)$');
    if (isMWglp.test(window.location.pathname)) {
        optimizely.utils.waitUntil(() => {
            return window &&
            optimizely.get('visitor') &&
            optimizely.get('visitor').events &&
   document.querySelector('[data-testid="ProductTile-component"] [data-testid="Skeleton-component"]') == null &&
  document.querySelector('[data-testid="Recommendations-component-glp_rec_injection1"]');
        }).then(() => {
            let pdpViews = 0;
            optimizely.get('visitor').events.every(optlyEvent => {
              if(optlyEvent.eventBase.n.indexOf('all__pdp_pages__shared_goals') > -1) {
                    pdpViews += 1;
                }
                return pdpViews === 4 ? false : true;
              });
        
  const glpWidgets = document.querySelectorAll('[data-testid="Recommendations-component-glp_rec_injection1"]');
    if(pdpViews > 3 && glpWidgets.length > 1){
      optimizely.utils.waitUntil(() => {
  return glpWidgets[1].querySelectorAll('.exp-active-exp [data-testid="ProductTile-component"]').length;
  }).then(() => {
  if(glpWidgets[1].querySelectorAll('.exp-active-exp [data-testid="ProductTile-component"]').length > 3) {
                            activate();
                        }
                    })
                }
        })
    }
  }
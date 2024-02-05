
const optimizely = window.optimizely || null;

if(optimizely) {
  if(!optimizely.optimizelyTools) {
   	optimizely.optimizelyTools = {};
  }
  
  // th palette
  optimizely.optimizelyTools.stylesPalette = {
      v1: {
        discountFont: 'rgb(0, 12, 45)',
        totSavingBannerFont: 'rgb(0, 12, 45)',
        totSavingBannerBg: 'rgb(241, 244, 248)',
      },
      v2: {
        discountFont: 'rgb(255, 0, 0)',
        totSavingBannerFont: 'rgb(0, 12, 45)',
        totSavingBannerBg: 'rgb(241, 244, 248)',
      }
	};

  optimizely.optimizelyTools.getPalette = (version) => {
    if(!version) {
      return null;
    }
    return optimizely.optimizelyTools.stylesPalette[version];
  };
  
 	optimizely.optimizelyTools.restyleElements = (discountPriceElement, discountBanner, version) => {
	
    const palette = optimizely.optimizelyTools.getPalette(version);

    // restyle discount price
    if(discountPriceElement) {
      discountPriceElement.style.color = palette.discountFont;
    }

    // restyle banner too if present
    if(discountBanner) {
      // set background
      discountBanner.style.backgroundColor = palette.totSavingBannerBg;

      //set text colour
      const bannerText = discountBanner.querySelector('[data-testid="banner-text"]');
      if(bannerText) {
        bannerText.style.color = palette.totSavingBannerFont;
      }


      // icon doesn't load straight away so listen for it 
      const iconPath = `[data-testid="banner-icon"] path`;
        optimizely.get('utils').observeSelector(iconPath, (iconPath) => {
          //set icon colour
        iconPath.style.stroke = palette.totSavingBannerFont;
        iconPath.style.fill = palette.totSavingBannerFont;
      });	
    }

  };
  
  /* Tracking */
	optimizely.optimizelyTools.elementSeenCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        optimizely.sendAnalyticsEvents("TH09 - Changes seen");
        observer.disconnect();
      }
    });
  };

  optimizely.optimizelyTools.options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };
  
  optimizely.optimizelyTools.languageCheck = (banner) => {
    // only fix GB, temp fix for now (code fix happening too)
    
    if(!banner) {
			return;
    }
    
    const bannerText = banner.querySelector('[data-testid="banner-text"]');
    if(!bannerText) {
     	return; 
    }
		
    const getLang = () => window.__NEXT_DATA__ && window.__NEXT_DATA__.props.pageProps._nextI18Next.initialLocale;
    // get lang storetext
    const lang = getLang() || 'default';
    
		if(lang === 'en') {
      const currentText = bannerText.textContent;
      bannerText.innerHTML = bannerText.textContent.replace('Saving', 'saving');
    }
  };
}
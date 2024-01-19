function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;

    function checkItem(){
      if(document.referrer === ''){
        return true;
      } else if(sessionStorage.getItem("TH276-pdp") != null){
        return true;
      } else if(document.referrer.includes('tommy') === false){
        return true;
      }
    }
    function checkCategory(){
      let gender;
      document.querySelectorAll('[data-testid="pvh-List"] li[class*=MegaMenu_FirstLevelMenuItem]').forEach(function(item, index){
        if(item.className.includes('MegaMenu_Selected')){
            gender = index; // 0 > women, 1 > men, 2 > kids
        }
      });
       const titleText = document.querySelector('h1').innerHTML.toLowerCase();
       if(titleText.includes('puffer') || titleText.includes('chaqueta acolchada') || titleText.includes('doudoune') || titleText.includes('piumino') || titleText.includes('kurtka puchowa') ){
            return true;
        }
        if(gender === 0 && (titleText.includes('cross') || titleText.includes('bandolera') || titleText.includes('bandoulière') || titleText.includes('borsa a tracolla'))){
            return true;
        }
        if(gender === 1 && (titleText.includes('backpack') || titleText.includes('rugzak') || titleText.includes('rucksäcke') || titleText.includes('mochila') || titleText.includes('sac à dos') ||
        titleText.includes('zaino') || titleText.includes('plecak')) ){
            return true;
        }
        if( (gender === 0 || gender === 1) && 
        (titleText.includes('trainers') || titleText.includes('sneaker') || titleText.includes('zapatillas') || titleText.includes('baskets') || document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerHTML === 'sneakersy' || titleText.includes('t-shirt') || titleText.includes('camiseta') )
        ){
            return true;
        } 
    }
    function check() {
      if (
        document.querySelector('[data-testid="pdp-main"]') &&
document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a') &&
        document.querySelector('h1') &&
        window &&
        window.sessionStorage &&
        checkItem() && 
        document.querySelectorAll('[data-testid="pvh-List"] li[class*=MegaMenu_FirstLevelMenuItem]').length > 0 &&
        checkCategory()
      ) {
        
        return true;
      } else {
        return false;
      }
    }
    
    var interval = setInterval(function () {
      var t2 = new Date().getTime();
      dif = (t2 - t1) / 1000;
  
      if (dif > maxSeconds) {
        clearInterval(interval);
      } else if (check()) {
        clearInterval(interval);
        activate();
      }
    }, 100); 
}
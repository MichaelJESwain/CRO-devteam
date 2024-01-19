function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;

    function checkItem(){
       if(document.referrer === ''){
        return true;
      } else if(sessionStorage.getItem("CK351-pdp") != null){
        return true;
      } else if(document.referrer.includes('calvinklein') === false){
        return true;
      }
    }
    function checkCategory(){
      let genero;
      document.querySelectorAll('[data-testid="pvh-List"] li[class*=MegaMenu_FirstLevelMenuItem]').forEach(function(item, index){
        if(item.className.includes('MegaMenu_Selected')){
            genero = index; // 0 > women, 1 > men, 2 > kids
        }
      })
        const titleText = document.querySelector('h1').innerHTML.toLowerCase();
 if((genero === 1) && (titleText.includes('t-shirt') || titleText.includes('camiseta') || titleText.includes('hoodie') || titleText.includes(' à capuche') || titleText.includes('felpa con cappuccio') || titleText.includes('sudadera','con capucha') || titleText.includes('bluza z kapturem') ) ){
          return true;
        } else if(genero === 0 && (titleText.includes('bralette') || titleText.includes('brassière') || titleText.includes('corpiño') || 
        titleText.includes('trainers') || titleText.includes('sneakers') || titleText.includes('baskets') || titleText.includes('zapatillas') || document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerHTML === 'sneakersy')){
          return true;
        } else if((genero === 1 || genero === 0) && 
          ((titleText.includes('cross') || titleText.includes('bandolera') || titleText.includes('bandoulière') || titleText.includes('borsa a tracolla') || document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerHTML === 'torby') || titleText.includes('pack') || titleText.includes('lot de') || titleText.includes('da ') || titleText.includes('zestaw') )){
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
    }, 50);  
}
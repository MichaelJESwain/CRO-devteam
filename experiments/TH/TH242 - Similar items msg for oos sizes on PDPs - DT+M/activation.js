// I still need to check if the right categories are being targeted
function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;

    function checkCategory(){
        const categories = ['shirts','t-shirts','blouses','sweatshirts','sandals','sneakers', 'trainers','dresses','knitwear','trousers','shorts','skirts'];
        let pdpInfo;
        let flag = false;
        if(window.digitalData.product[0].productInfo.productCategory){
            pdpInfo = window.digitalData.product[0].productInfo.productCategory;
            categories.forEach(function(cat){
              if(pdpInfo.search(cat) > -1){
                flag = true;
              }
            })
            
        } else {
         flag = false;
        }
        return flag;
    }

    function check() {
      if (
        document.querySelector('[data-testid="pdp-main"]') &&
        document.querySelector('[class*=ProductSize_IsOos__]') &&
        window &&
        window.digitalData &&
        window.digitalData.product[0] &&
        window.digitalData.product[0].productInfo &&
        window.digitalData.product[0].productInfo.productCategory &&
        window.digitalData.product[0].productInfo.productGender &&
        (window.digitalData.product[0].productInfo.productGender === 'women' || 
        window.digitalData.product[0].productInfo.productGender === 'men') &&
        checkCategory() &&
        document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection1"]') 
        
      ) {
        console.log("it's good")
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
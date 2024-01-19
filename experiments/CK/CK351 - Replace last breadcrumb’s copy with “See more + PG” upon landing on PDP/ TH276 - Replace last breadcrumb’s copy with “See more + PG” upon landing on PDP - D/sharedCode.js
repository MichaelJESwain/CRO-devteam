const utils = window["optimizely"].get("utils");
const fireAdobeEvent = (eventName) => {
  utils.waitUntil(function(){ return utag && utag.link; }).then(function() {
      utag.link({
          "event_name": `${eventName}`
      });
  });
};
const fireOptimizelyEvent = (eventName) => {
  window['optimizely'] = window['optimizely'] || []

  window['optimizely'].push({
    type: 'event',
    eventName: eventName,
  })
}
const fireBothEvents = (eventName) => {
  if (!window[`hasFiredEvent-${eventName}`]) {
    window[`hasFiredEvent-${eventName}`] = true
    fireAdobeEvent(eventName)
    fireOptimizelyEvent(eventName)

    setTimeout(() => {
      window[`hasFiredEvent-${eventName}`] = false
    }, 100)
  }
}

utils.observeSelector('[class*=Breadcrumbs_BreadcrumbsList__]', () => {
    const pos = document.querySelectorAll('[class*=Breadcrumbs_BreadcrumbsList__] li').length - 1;
    const array = document.querySelectorAll('[class*=Breadcrumbs_BreadcrumbsList__] li');
    if(array[pos - 2] != null){
        array[pos - 2].addEventListener('click', function(){
            fireBothEvents('CK351-TH276-Click on Breadcrumb level 1')
        })
    }
    if(array[pos - 1] != null){
        array[pos - 1].addEventListener('click', function(){
            fireBothEvents('CK351-TH276-Click on Breadcrumb level 2')
        })
    }
    if(array[pos] != null){
        array[pos].addEventListener('click', function(){
            fireBothEvents('CK351-TH276-Click on Breadcrumb level 3')
        })
    }
})
utils.observeSelector('[class*=Breadcrumbs_BreadcrumbsList__]', (element) => {
  let flag;
  const titleText = document.querySelector('h1').innerHTML;
    switch(true){
      case titleText.includes('bralette') || titleText.includes('brassière') || titleText.includes('corpiño'):
          flag = "bralettes";
          break;
case titleText.includes('trainers') || titleText.includes('sneakers') || titleText.includes('baskets') || titleText.includes('zapatillas') || document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerHTML === 'sneakersy':
           flag = 'trainers';
           break;
      case titleText.includes('t-shirt') || titleText.includes('camiseta'):
           flag = 't-shirts';
           break;
case titleText.includes('hoodie') || titleText.includes(' à capuche') || titleText.includes('felpa con cappuccio') || titleText.includes('sudadera','con capucha') || titleText.includes('bluza z kapturem'):
           flag = 'hoodies';
           break;
case titleText.includes('pack') || titleText.includes('lot de') || titleText.includes('da ') || titleText.includes('zestaw'):
           flag = 'packs';
           break;
case titleText.includes('cross') || titleText.includes('bandolera') || titleText.includes('bandoulière') || titleText.includes('borsa a tracolla') || document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerHTML === 'torby':
           flag = 'crossbody';
           break;
      default:
          flag = '';
          break;    
    }
  const observer = new window.IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        sessionStorage.setItem("pdpBreadCrumb", flag);
        return
    }
  }, {
    root: null,
    threshold: 1,
  })
  observer.observe(element);
})
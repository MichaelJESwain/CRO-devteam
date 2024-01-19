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
    
    console.log(eventName);
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
            fireBothEvents('TH276-CK351 - Click on Breadcrumb level 1')
        })
    }
    if(array[pos - 1] != null){
        array[pos - 1].addEventListener('click', function(){
            fireBothEvents('TH276-CK351 - Click on Breadcrumb level 2')
        })
    }
    if(array[pos] != null){
        array[pos].addEventListener('click', function(){
            fireBothEvents('TH276-CK351 - Click on Breadcrumb level 3')
        })
    }
})

utils.observeSelector('[class*=Breadcrumbs_BreadcrumbsList__]', (element) => {
let flag;
const titleText = document.querySelector('h1').innerHTML;
switch(true){
case (titleText.includes('puffer') || titleText.includes('chaqueta acolchada') || titleText.includes('doudoune') || titleText.includes('piumino') || titleText.includes('kurtka puchowa')): 
          flag = 'jackets';
          break;
case (titleText.includes('trainers') || titleText.includes('sneaker') || titleText.includes('zapatillas')  || titleText.includes('baskets') || document.querySelector('ol[class*=Breadcrumbs_BreadcrumbsList__] li:last-child a').innerHTML === 'sneakersy') :
          flag = 'shoes';
          break;
case (titleText.includes('t-shirt') || titleText.includes('camiseta')):
          flag = 't-shirts';
          break;
case (titleText.includes('backpack') || titleText.includes('rugzak') || titleText.includes('rucksäcke') || titleText.includes('mochila') || titleText.includes('sac à dos') || titleText.includes('zaino') || titleText.includes('plecak')):
          flag = 'backpacks';
          break;
case (titleText.includes('cross') || titleText.includes('bandolera') || titleText.includes('bandoulière') || titleText.includes('borsa a tracolla')):
          flag = 'crossbodybags';
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
});
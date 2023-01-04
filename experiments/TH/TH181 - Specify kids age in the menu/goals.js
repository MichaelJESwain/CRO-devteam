var utils = window.optimizely.get('utils');

const hrefsToCheck = ["/boys", "/girls",
"/jongens", "/meisjes",
"/jungen", "/maedchen",
"/garcon", "/fille",
"/ragazzi", "/ragazze",
"/ninos", "/ninas",
"/chlopcy", "/dziewczynki"
];

function th181FireGoals() {
  // Optimizely goal
 	window['optimizely'] = window['optimizely'] || [];
  window['optimizely'].push({
    type: "event",
    eventName: "th181_click_on_altered_menu_item"
  }); 
  
  // Adobe goal
  utils.waitUntil(function(){ return window.s && window.s.tl; }).then(function(){
    window.s.tl(this,"o", "th181_click_on_altered_menu_item");
  });
  
  console.log("TH181 - LINK CLICKED");
}

document.body.addEventListener("click", (event) => {
  console.log("event", event);
  for (let i = 0; i < event.path.length; i++) {
    if (
      event.path[i].attributes &&
      event.path[i].attributes.href &&
      event.path[i].className &&
      event.path[i].className.includes('nav__list-item__link') &&
      hrefsToCheck.includes(event.path[i].attributes.href.value)
    ) {
		th181FireGoals();
        break;
    }
  }
});
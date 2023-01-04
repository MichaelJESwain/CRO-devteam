var utils = window.optimizely.get('utils');

const hrefsToCheck = ["/boys", "/girls", "/babies",
"/jongens", "/meisjes", "/babys",
"/jungen", "/maedchen", "/babys",
"/garcon", "/fille", "/bebe",
"/bambino", "/bambina", "/neonati",
"/ninos", "ninas", "/bebes",
"/chlopcy", "/dziewczynki", "/niemowleta"
];

function ck278FireGoals() {
  // Optimizely goal
  window['optimizely'] = window['optimizely'] || [];
  window['optimizely'].push({
    type: "event",
    eventName: "ck278_click_on_changed_altered_menu_item",
  });		
  
  // Adobe goal
  utils.waitUntil(function(){ return window.s && window.s.tl; }).then(function(){
    window.s.tl(this,"o", "ck278_click_on_changed_altered_menu_item");
  });
}

document.body.addEventListener("click", (event) => {
  for (let i = 0; i < event.path.length; i++) {
    if (
      event.path[i].classList &&
      event.path[i].classList.contains("mega-menu__second-level-link")
    ) {
      if (hrefsToCheck.includes(event.path[i].attributes.href.value)) {
        ck278FireGoals();
      }
      break;
    }
  }
});
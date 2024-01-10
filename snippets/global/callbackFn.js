function callbackFn(activate, options) {
  var t1 = new Date().getTime()
  var dif = 0

  var interval = setInterval(function () {
    var t2 = new Date().getTime()
    dif = (t2 - t1) / 1000

    if (dif > 5) {
      clearInterval(interval)
    } else if (window && window.digitalData) {
      clearInterval(interval)
      activate()
    }
  }, 100)
}

// One more option:

function callbackFn(activate, options) {
  const isMWglp = new RegExp('/(men|women|heren|dames|herren|damen|femme|homme|donne|uomini|mujeres|hombres|kobiety|mezczyzni)$');
  if (isMWglp.test(window.location.pathname)) {
    optimizely.utils.waitUntil(() => {
          return window &&
          optimizely.get('visitor') &&
          optimizely.get('visitor').events &&
          document.querySelector('[data-testid="DynamicModule-component"]') !== undefined ;
    }).then(() => {
      activate();  
    })
  }
}

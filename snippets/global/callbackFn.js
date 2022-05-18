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

const waitForElement = (cssSelector, cb) => {
  var t1 = new Date().getTime()
  var dif = 0
  var reqAnId = window.requestAnimationFrame(lookForElement)

  function lookForElement() {
    var t2 = new Date().getTime()
    dif = (t2 - t1) / 1000

    if (dif < 3) {
      if (elementFound()) {
        cb(cssSelector)
        cancelAnimationFrame(reqAnId)
      } else {
        window.requestAnimationFrame(lookForElement)
      }
    } else {
      cancelAnimationFrame(reqAnId)
    }
  }

  function elementFound() {
    var e = document.querySelector(cssSelector)
    if (e) {
      return true
    } else {
      return false
    }
  }
}

// ========================================================
// Usage:
// ========================================================
waitForElement('.classThatDoesntExist-should-timeout', () => console.log('found!'))

const waitForPagetype = (pagetype, callback) => {
  const waitForRouter = (cb) => {
    var t1 = new Date().getTime()
    var dif = 0
    var reqAnId = window.requestAnimationFrame(lookForElement)

    function lookForElement() {
      var t2 = new Date().getTime()
      dif = (t2 - t1) / 1000

      if (dif < 3) {
        if (elementFound()) {
          cb()
          cancelAnimationFrame(reqAnId)
        } else {
          window.requestAnimationFrame(lookForElement)
        }
      } else {
        cancelAnimationFrame(reqAnId)
      }
    }

    function elementFound() {
      if (
        window &&
        window.next &&
        window.next.router &&
        window.next.router.events &&
        window.next.router.events.on &&
        typeof window.next.router.events.on === 'function' &&
        window.digitalData &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType
      ) {
        return true
      } else {
        return false
      }
    }
  }

  if (pagetype && typeof pagetype === 'string' && !window[`waitForPagetype${pagetype}`]) {
    window[`waitForPagetype${pagetype}`] = true

    waitForRouter(() => {
      if (window.digitalData.page.category.pageType === pagetype) {
        callback()
        window[`waitForPagetype${pagetype}`] = false
      } else {
        window.next.router.events.on('routeChangeComplete', function (route) {
          if (route === pagetype) {
            callback()
          }
        })
      }
    })
  }
}

waitForPagetype('glp', () => {
  console.log('gasdfasdfasd DONE')
})

const observerArray = (() => {
  let observerArray = []

  const observeElement = (cssSelector, callback) => {
    if (cssSelector && callback && document.querySelector(cssSelector) && !window[`observe${cssSelector}`]) {
      const config = { attributes: true, childList: true, subtree: true }
      const element = document.querySelector(cssSelector)

      const callbackWrapper = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
          callback(mutation.target)
        }
      }
      window[`observe${cssSelector}`] = new MutationObserver(callbackWrapper)

      window[`observe${cssSelector}`].observe(element, config)
    }
  }

  const init = () => {
    if (window['observerArray']) {
      observerArray = window['observerArray']
    }
  }
  init()

  const add = (cssSelector, callback) => {
    if (cssSelector && callback && !observerArray.find((observer) => observer.cssSelector === cssSelector)) {
      //   Add to array
      observerArray.push({
        cssSelector,
        callback,
      })

      // Run callback
      callback(cssSelector)

      //   Observe element
      observeElement(cssSelector, callback)

      //   Store in window
      window['observerArray'] = observerArray
    }
  }

  const remove = (cssSelector) => {
    if (cssSelector && observerArray.find((observer) => observer.cssSelector === cssSelector)) {
      //   Remove from array
      observerArray = observerArray.filter((observer) => observer.cssSelector !== cssSelector)

      //   Store in window
      window['observerArray'] = observerArray

      //   Remove observer
      if (window[`observe${cssSelector}`] && typeof window[`observe${cssSelector}`].disconnect === 'function') {
        window[`observe${cssSelector}`].disconnect()

        //   Remove from window
        delete window[`observe${cssSelector}`]
      }
    }
  }

  return { add, remove }
})()

// ========================================================
// Example usage:
// ========================================================
observerArray.add('header', () => {
  console.log('header changed!')
})

observerArray.add('.Module1', () => {
  console.log('Module1 changed!')
})

setTimeout(() => {
  document.querySelector('header').innerHTML = '<h1>New header</h1>'

  observerArray.remove('.Module1')
  observerArray.remove('header')
  setTimeout(() => {
    document.querySelector('header').innerHTML = '<h1>New header</h1>'
    document.querySelector('.Module1').innerHTML = '<h1>New Module1</h1>'
  }, 1000)
}, 1000)

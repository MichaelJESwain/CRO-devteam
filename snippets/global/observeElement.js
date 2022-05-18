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

// ========================================================
// Usage:
// ========================================================
observeElement('header', () => {
  console.log('Element changed!')
})

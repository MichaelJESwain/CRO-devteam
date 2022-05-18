const runIfInViewport = (element, callback) => {
  const randomId = Math.random().toString(36).substring(2, 15)
  const options = {
    rootMargin: '0px',
    threshold: 0.5,
  }

  const internalCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (window[`observer-${randomId}`]) {
          window[`observer-${randomId}`].disconnect()
        }
        callback()
      }
    })
  }

  if (!window[`observer-${randomId}`] && element) {
    window[`observer-${randomId}`] = new IntersectionObserver(internalCallback, options)
    window[`observer-${randomId}`].observe(element)
  }
}

// ========================================================
// Usage:
// ========================================================
runIfInViewport(
  document.querySelector(
    '#__next > main > div.CollectionWrapper > div:nth-child(4) > div.ModuleImageOnlyTeaser.ModuleImageOnlyTeaser--section'
  ),
  () => console.log('found!')
)

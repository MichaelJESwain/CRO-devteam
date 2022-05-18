const fireAdobeEvent = (eventName) => {
  if (window.s && window.s.tl) {
    window.s.tl(window, 'o', eventName)
  }
}

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
    fireAdobeEvent(eventName)
    fireOptimizelyEvent(eventName)

    setTimeout(() => {
      window[`hasFiredEvent-${eventName}`] = false
    }, 100)
  }
}

// ========================================================
// Usage:
// ========================================================
fireBothEvents('CK-ID-event-name')

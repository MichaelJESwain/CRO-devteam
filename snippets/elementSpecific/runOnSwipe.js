const runOnSwipe = (element, callback, threshold = 0) => {
  let touchstartX = 0
  let touchendX = 0
  let dif = 0

  if (element) {
    element.addEventListener('touchstart', (e) => {
      touchstartX = e.changedTouches[0].screenX
    })

    element.addEventListener('touchend', (e) => {
      touchendX = e.changedTouches[0].screenX

      // Calculate dif between touchstart and touchend in absolute pixels
      dif = Math.abs(touchstartX - touchendX)
      if (dif > threshold) {
        callback()
      }
    })
  }
}

// ========================================================
// Example usage

// runOnSwipe(
//   document.querySelectorAll('.slick-track')[1],
//   () => {
//     console.log('==============')
//     console.log('Running!!')
//     console.log('==============')
//   },
//   70
// )

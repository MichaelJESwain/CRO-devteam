const addCss = function (css) {
  var s = document.createElement('style')
  s.innerHTML = css
  var h = document.querySelector('head')
  h.appendChild(s)
  return s
}

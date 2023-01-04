const removeThis = function (e) {
	if (e && e.parentElement) {
		e.parentElement.removeChild(e)
	}
}

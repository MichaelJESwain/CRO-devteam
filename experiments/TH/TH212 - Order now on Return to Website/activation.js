function callbackFn(activate) {
	let elementInterval;
  function getCookie(name) {
    let res = false;
    const value = `; ${document.cookie}`;
    const parts = value.split(`;${name}=`);
    if (parts.length === 2) {
      res = true;
    }
    return res;
  }
  
  function setCookie() {
    var date = new Date();
    date.setTime(date.getTime()+(10*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = "TH212_has_seen_toast_component=true"+expires+"; path=/";
  }
  
  function check() {
    if (
      window &&
      window.sessionStorage &&
      window.sessionStorage.tt_pixel_session_index &&
      window.sessionStorage.tt_pixel_session_index.includes('0') &&
      document.querySelectorAll('.basket-panel__product').length &&
      !getCookie('TH212_has_seen_toast_component')
    ) {
      setCookie();
      clearInterval(elementInterval);
      activate();
    }
  }
  
  elementInterval = setInterval(check, 100);
}

// URL Match:
// (uk|nl|de|fr|it|es).tommy.com
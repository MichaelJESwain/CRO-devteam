function callbackFn(activate) {
    let elementInterval;
    function check() {         
        if (
            window &&
            document.querySelector('.wishlistPage') !== null &&
            document.querySelector('[data-testid="EmptyWishlist-component"]') == null &&
            document.querySelector('[data-testid="FilledWishlist-component"] h2') &&
            window.digitalData &&
            window.digitalData.user &&
            window.digitalData.user.profile &&
            window.digitalData.user.profile.userLoggedIn && 
            window.digitalData.user.profile.userLoggedIn !== '1'
            ) {
            clearInterval(elementInterval);
            activate();
        }
    }
    elementInterval = setInterval(check, 100);
}
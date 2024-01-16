window.th150 = {
    placeAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    },
    translations: {
        uk: {
v1: "The items in your Wishlist are saved for a limited time. to keep them in your favourites!",       link: "Sign in or register",
v2: "DON'T MISS OUT ON YOUR FAVOURITES. Sign in or register to save your Wishlist for later and access it anytime and from any device. Sign in or register"
        },
        nl: {
v1: "De items op je Wishlist worden tijdelijk bewaard.  om ze in je favorieten te houden!",
link: "Schrijf je in of registreer",
v2: "LOOP JE FAVORIETEN NIET MIS. Schrijf je in of registreer om je Wishlist voor later te bewaren en altijd en overal te kunnen bekijken. Schrijf je in of registreer"
        },
        de: {
v1: "Die Artikel der Wunschliste werden nur für eine bestimmt Zeit gespeichert.  um sie unter deinen Favoriten zu sichern!",
link: "Melde dich an oder registriere dich,",
v2: "LASS DIR DEINE FAVES NICHT ENTGEHEN. Melde dich an oder registriere dich, um deine Wunschliste für später zu speichern und jederzeit von jedem Gerät auf sie zuzugreifen. Jetzt anmelden oder registrieren"
        },
        fr: {
v1: "Les articles de votre liste de souhaits sont sauvegardés durant une période limitée.  pour les conserver parmi vos favoris !",
link: "Connectez-vous ou inscrivez-vous",
v2: "NE PERDEZ PAS VOS FAVORIS. Connectez-vous ou inscrivez-vous pour sauvegarder votre liste de souhaits afin de pouvoir y accéder ultérieurement depuis l’appareil de votre choix. Se connecter ou s’inscrire"
        },
        it: {
v1: "Gli articoli nella tua wishlist vengono salvati per un periodo limitato.  per mantenerli nei tuoi preferiti!",
link: "Accedi o registrati",
v2: "NON PERDERE I TUOI PREFERITI. Accedi o registrati per poter salvare e recuperare la tua wishlist in ogni momento e da qualsiasi dispositivo. Accedi o registrati"
        },
        es: {
v1: "Los artículos de tu wishlist se guardan por un tiempo limitado.  para mantenerlos en tus favoritos!",
link: "¡Suscríbete o regístrate",
v2: "¡HAZTE CON TUS FAVORITOS. Suscríbete o regístrate para guardar tu wishlist para más tarde y acceder a ella en cualquier momento y desde cualquier dispositivo. Suscríbete o regístrate"
        },
        pl: {
v1: "Artykuły są przechowywane na liście życzeń przez ograniczony czas.  aby z niej nie zniknęły!",
link: "Zaloguj się lub zarejestruj,",
v2: "ZACHOWAJ SWOJĄ LISTĘ ULUBIONYCH ARTYKUŁÓW. Zaloguj się lub zarejestruj, aby zapisać swoją listę życzeń i mieć do niej dostęp w dowolnym momencie z każdego urządzenia. Zaloguj się lub zarejestruj."
        },
    },
};
/*
Clicks on log in on Wishlist page - ADOBE NEW
TH150.2/CK377 - Clicks on Log in
*/
optimizely.utils.waitForElement('[data-testid="filledWishlist-sign-in-pvh-button"]').then(function(btn){
    btn.addEventListener('click', () => {
        optimizely.sendAnalyticsEvents("TH150.2-CK377 - Clicks on Log in")
     })
})
optimizely.utils.waitForElement('[data-testid="HeaderAccount-signin-button"]').then(function(btn){
    btn.addEventListener('click', () => {
        optimizely.sendAnalyticsEvents("TH150.2-CK377 - Clicks on Log in")
     })
})
const TH256 = {
    copy: {
        uk: 'Please read and accept the terms and conditions before placing the order.',
        de: 'Bitte lesen und akzeptieren Sie unsere allgemeinen Geschäftsbedingungen, bevor Sie die Bestellung aufgeben.',
        fr: 'Veuillez lire et accepter les conditions générales avant de passer votre commande.',
        it: 'Leggi e accetta i termini e condizioni prima di effettuare l’ordine.',
        es: 'Lee y acepta los términos y condiciones antes de realizar el pedido.',
        pl: 'Przed złożeniem zamówienia prosimy o przeczytanie i zaakceptowanie regulaminu.',
    }[window.location.host.split('.')[0]],
    init: () => {
        const errorMesage = document.createElement("span");
        errorMesage.setAttribute("class", "TH256_error_message");
        errorMesage.innerHTML = `${TH256.copy}`;

        window.optimizely.get("utils").observeSelector('[data-testid="checkout-terms-conditions-Checkbox-Component-content"]', elem => {
            elem.appendChild(errorMesage);
        });
    }
};
TH256.init();
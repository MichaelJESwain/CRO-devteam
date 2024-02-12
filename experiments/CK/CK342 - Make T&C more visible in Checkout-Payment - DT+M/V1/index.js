const CK342 = {
    copy: {
        uk: 'Please read and accept the terms and conditions before placing the order.',
        de: 'Bitte lesen und akzeptieren Sie unsere allgemeinen Geschäftsbedingungen, bevor Sie die Bestellung aufgeben.',
        fr: 'Veuillez lire et accepter les conditions générales avant de passer votre commande.',
        it: 'Leggi e accetta i termini e condizioni prima di effettuare l’ordine.',
        es: 'Lee y acepta los términos y condiciones antes de realizar el pedido.',
        pl: 'Przed złożeniem zamówienia prosimy o przeczytanie i zaakceptowanie regulaminu.',
    }[window.location.host.split('.').pop()],
    init: () => {
        CK342.addCss();
        const errorMesage = document.createElement("span");
        errorMesage.setAttribute("class", "CK342_error_message");
        errorMesage.innerHTML = `${CK342.copy}`;

        window.optimizely.get("utils").observeSelector('[data-testid="checkout-terms-conditions-Checkbox-Component-content"]', elem => {
            elem.appendChild(errorMesage);
        });
    },
    addCss: () => {
        const css = document.createElement("style");
        css.innerHTML = `
            .CK342_error_message {
                display: none;
                color: #E10000;
                margin-top: 8px;
                font-size: 14px;
                line-height: 20px;
            }
            [data-testid="checkout-terms-conditions-Checkbox-Component"][class*="Checkbox_isError"] .CK342_error_message {
                display: block;
            }
            [data-testid="checkout-terms-conditions-Checkbox-Component"][class*="Checkbox_isError"] [data-testid="checkout-terms-conditions-Checkbox-Component-icon"] {
                border-color: #000c2d;
            }
            [data-testid="checkout-terms-conditions-Checkbox-Component-content"] span:nth-child(1),
            [data-testid="checkout-terms-conditions-Checkbox-Component-content"] span:nth-child(1) a {
                color: #000c2d;
            }
            [class*="CheckoutLayout_PlaceOrderButton"] {
                padding-top: 24px;
            }
        `;
        document.head.appendChild(css);
    }
}
CK342.init();
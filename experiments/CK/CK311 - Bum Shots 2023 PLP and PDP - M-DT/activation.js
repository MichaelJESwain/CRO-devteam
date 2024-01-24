function callbackFn(activate, options) {
    const utils = window.optimizely.get('utils');

    const bumShotProductIds = [
        "000QD3860E_C45",
        "000QD3954E_VLL",
        "000QD5087E_100",
        "000QD5087E_P7A",
        "000QD5087E_UB1",
        "000QD5088E_100",
        "000QD5088E_P7A",
        "000QD5088E_UB1",
        "000QD3540E_001",
        "000QD3539E_001",
        "0000D1618E_100",
        "000QD3539E_100",
        "0000D1617E_100",
        "000QD3540E_100",
        "0000D3428E_1LC",
        "0000D3429E_001",
        "0000D3429E_1LC",
        "0000D1618E_001",
        "0000D1617E_001",
        "0000D1617E_020",
        "000QD3636E_001",
        "000QD3636E_020",
        "000QD3637E_001",
        "000QD3637E_020",
        "0000D1618E_020",
        "0000D1618A_2NT",
        "0000D1617A_2NT",
        "000QD3754E_001",
        "000QD3766E_7NS",
        "000QD3766E_UB1",
        "000QD3763E_UB1",
        "000QD3767E_UB1",
        "000QD3763E_100",
        "000QD3587E_WZB",
        "000QD3587E_001",
        "0000D1617A_0PP",
        "0000D1618A_0PP",
        "0000D3428E_001",
        "000QD5059E_100",
        "000QD5059E_9T4",
        "000QD3954E_100",
        "000QD3954E_9T4",
        "000QD3955E_9T4",
        "000QD3767E_VLL",
        "000QD3767E_YAT",
        "000QD3539E_VAE",
        "000QD3859E_ANK",
        "000QD3859E_C45",
        "000QD3860E_ANK",
        "000QD3954E_9MD",
        "000QD3955E_VLL",
        "000QD3971E_VAE",
        "000QD3767E_7NS",
        "0000D1618E_2NU",
        "0000D1617E_VAE",
        "0000D1618E_BNE",
        "000QD3954E_UB1",
        "0000D1618E_VAE",
        "0000D1617E_2NU",
        "0000D1617E_BNE",
        "000QD3955E_UB1",
        "000QD3539E_8HP",
        "000QD3956E_UB1",
        "000QD3763E_VLL",
        "000QD3955E_100",
        "000QD3763E_YAT",
        "000QD3859E_792",
        "000QD3954E_P7A",
        "000QD3972E_94P",
        "000QD3971E_3CI",
        "000QD3956E_P7A",
        "000QD3971E_94P",
        "000QD3972E_3CI",
        "000QD3859E_9MJ",
        "0000D1617E_AD4",
        "0000D1617E_AO0",
        "0000D1618E_AO0",
        "000QD3766E_AO0",
        "000QD3766E_YAT",
        "000QD3767E_AO0",
        "000QD3767E_LR0",
        "000QD3954E_5L7",
        "000QD3954E_AO0",
        "000QD3955E_P7A"
        ];

    utils.observeSelector('.product-list__product, .pdp [data-testid="ProductImages-component"] [class*="Carousel_slide_"]:nth-child(1) [data-testid="prod-mainImage_img"]', function(elem) {
        if (elem.classList.contains('product-list__product')) {
            if (bumShotProductIds.indexOf(elem.getAttribute('data-primarycolour')) > -1) {
                this.cancelObservation();
                activate();
            }
        } else  {
            const url = window.location.href;
            bumShotProductIds.forEach(function(bumShotId) {
                let bumshotIDD = bumShotId.toLowerCase().split("_").join("");
                if (url.indexOf(bumshotIDD) > -1) {
                    activate();
                    this.cancelObservation();
                }
            });

        }
    });
}
const CK311 = {
    targetProducts: `
    [id="000QD3540E001"].product-list__product, 
    [id="000QD3539E001"].product-list__product,
    [id="0000D1618E100"].product-list__product,
    [id="000QD3539E100"].product-list__product,
    [id="0000D1617E100"].product-list__product,
    [id="000QD3540E100"].product-list__product,
    [id="0000D3428E1LC"].product-list__product,
    [id="0000D3429E001"].product-list__product,
    [id="0000D3429E1LC"].product-list__product,
    [id="0000D1618E001"].product-list__product,
    [id="0000D1617E001"].product-list__product,
    [id="0000D1617E020"].product-list__product,
    [id="000QD3636E001"].product-list__product,
    [id="000QD3636E020"].product-list__product,
    [id="000QD3637E001"].product-list__product,
    [id="000QD3637E020"].product-list__product,
    [id="0000D1618E020"].product-list__product,
    [id="0000D1618A2NT"].product-list__product,
    [id="0000D1617A2NT"].product-list__product,
    [id="000QD3754E001"].product-list__product,
    [id="000QD3766E7NS"].product-list__product,
    [id="000QD3766EUB1"].product-list__product,
    [id="000QD3763EUB1"].product-list__product,
    [id="000QD3767EUB1"].product-list__product,
    [id="000QD3763E100"].product-list__product,
    [id="000QD3587EWZB"].product-list__product,
    [id="000QD3587E001"].product-list__product,
    [id="0000D1617A0PP"].product-list__product,
    [id="0000D1618A0PP"].product-list__product,
    [id="000QD3767E7NS"].product-list__product,
    [id="0000D3428E001"].product-list__product,
    [id="0000D1618E2NU"].product-list__product,
    [id="0000D1617EVAE"].product-list__product,
    [id="0000D1618EBNE"].product-list__product,
    [id="000QD3954EUB1"].product-list__product,
    [id="000QD5059E100"].product-list__product,
    [id="0000D1618EVAE"].product-list__product,
    [id="0000D1617E2NU"].product-list__product,
    [id="000QD5059E9T4"].product-list__product,
    [id="000QD3767EVLL"].product-list__product,
    [id="000QD3954E100"].product-list__product,
    [id="0000D1617EBNE"].product-list__product,
    [id="000QD3955EUB1"].product-list__product,
    [id="000QD3539E8HP"].product-list__product,
    [id="000QD3956EUB1"].product-list__product,
    [id="000QD3763EVLL"].product-list__product,
    [id="000QD3955E100"].product-list__product,
    [id="000QD3767EYAT"].product-list__product,
    [id="000QD3954E9T4"].product-list__product,
    [id="000QD3763EYAT"].product-list__product,
    [id="000QD3955E9T4"].product-list__product,
    [id="000QD3859E792"].product-list__product,
    [id="000QD3954EP7A"].product-list__product,
    [id="000QD3972E94P"].product-list__product,
    [id="000QD3971E3CI"].product-list__product,
    [id="000QD3956EP7A"].product-list__product,
    [id="000QD3971E94P"].product-list__product,
    [id="000QD3972E3CI"].product-list__product,
    [id="000QD3955EP7A"].product-list__product,
    [id="000QD3859E9MJ"].product-list__product,
    [id="0000D1617EAD4"].product-list__product,
    [id="0000D1617EAO0"].product-list__product,
    [id="0000D1618EAO0"].product-list__product,
    [id="000QD3766EAO0"].product-list__product,
    [id="000QD3766EYAT"].product-list__product,
    [id="000QD3767EAO0"].product-list__product,
    [id="000QD3767ELR0"].product-list__product,
    [id="000QD3859EANK"].product-list__product,
    [id="000QD3859EC45"].product-list__product,
    [id="000QD3860EANK"].product-list__product,
    [id="000QD3954E5L7"].product-list__product,
    [id="000QD3954E9MD"].product-list__product,
    [id="000QD3954EAO0"].product-list__product,
    [id="000QD3955EVLL"].product-list__product,
    [id="000QD3971EVAE"].product-list__product`,
    init: function() {
        window.optimizely.get('utils').observeSelector(CK311.targetProducts, function(product) {
            const productId = product.getAttribute('data-primarycolour');
             if (product.classList.contains('product-tile-static')) {
                product.querySelector('.ProductImage').classList.add('CK311_changed_product_image');
            } else {
                window.optimizely.get('utils').waitUntil(function() {
                    return product.querySelectorAll('.slick-slide .ProductImage').length;
                }).then(function() {
                    product.classList.add('CK311_changed_product');
                });
            }
        });
    }
};
CK311.init();
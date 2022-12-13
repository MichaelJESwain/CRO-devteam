function callbackFn(activate) {
    let elementInterval;
    const productSKUs = [
        'WW0WW35668_09Y',
        'UM0UM02721_0KG',
        'WW0WW35931_DW5',
        'WW0WW35625_0KR',
        'WW0WW35679_09Y',
        'WW0WW31990_09Y',
        'WW0WW36622_GW8',
        'WW0WW35932_GW8',
        'WW0WW35692_09Y',
        'WW0WW37751_VLP',
        'WW0WW36180_YBI',
        'WW0WW36701_C6X',
        'WW0WW37396_09Y',
        'WW0WW35922_DW5',
        'WW0WW37398_DW5',
        'WW0WW37479_DW5',
        'WW0WW36159_DW5',
        'WW0WW36162_DW5',
        'UW0UW03959_0JG',
        'WW0WW35747_DW5',
        'WW0WW35909_0A4',
        'WW0WW35913_DW5',
        'WW0WW36716_0GE',
        'WW0WW37312_DW5',
        'WW0WW37439_YBL',
        'WW0WW37465_YBI',
        'WW0WW37479_YBL',
        'AW0AW13387_YBI',
        'FW0FW07058_DW5',
        'MW0MW29057_DW5',
        'MW0MW29399_1CU',
        'MW0MW28208_VLP',
        'MW0MW28187_VLP',
        'MW0MW27427_GW8',
        'MW0MW28747_C7L',
        'MW0MW28089_DW5',
        'MW0MW28096_0GY',
        'MW0MW27374_C7L',
        'MW0MW27693_DW5',
        'MW0MW28720_0A4',
        'MW0MW28732_GWJ',
        'MW0MW29253_0HD',
        'MW0MW29254_0GY',
        'MW0MW29252_0A4',
        'MW0MW28044_DW5',
        'MW0MW28045_YBI',
        'MW0MW28052_DW5',
        'MW0MW28229_YBI',
        'FM0FM04369_DW5',
        'THF5504425_350',
        'THF5600425_350'
    ];
    
    function plpHasProductSKU() {
        let res = false;
        for (let i = 0; i < productSKUs.length; i++) {
           if (document.querySelector(`[data-uid=${productSKUs[i]}]`)) {
               res = true;
               i = productSKUs.length;
           }
        }
        return res;
    }

    function check() {         
        if (
            window &&
            window.digitalData &&
            window.digitalData.page &&
            window.digitalData.page.category &&
            window.digitalData.page.category.pageType &&
            window.digitalData.page.category.pageType === 'plp' &&
            plpHasProductSKU()
        ) {
            clearInterval(elementInterval);
            activate();
        }
    }

    elementInterval = setInterval(check, 100);
}

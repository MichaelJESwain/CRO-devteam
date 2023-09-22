/* jshint ignore:start */
if (/[?&]cvqa=false/i.test(window.location.search)) {
    document.cookie = 'cvqa=false;path=/'
} else if (/[?&]cvqa/i.test(window.location.search)) {
    document.cookie = 'cvqa=true;path=/'
}

if (/[?&]cvqa2=false/i.test(window.location.search)) {
    document.cookie = 'cvqa2=false;path=/'
} else if (/[?&]cvqa2/i.test(window.location.search)) {
    document.cookie = 'cvqa2=true;path=/'
}

if (/[?&]cvqa3=false/i.test(window.location.search)) {
    document.cookie = 'cvqa3=false;path=/'
} else if (/[?&]cvqa3/i.test(window.location.search)) {
    document.cookie = 'cvqa3=true;path=/'
}

var langID;

setLangId();

(function () {
    //Activate page logic
    if (window.location.href.indexOf('checkout/confirmation') >= 0) {
        //Confirmation page - Set survey div holder
        var waitForHolder = setInterval(function () {
          	var holder = document.querySelectorAll('.yourOrderWrapper');

            if (holder.length) {
                clearInterval(waitForHolder)
             	document.querySelector('#surveyDiv').parentNode.insertBefore(holder, document.querySelector('#surveyDiv').nextSibling);
            }
        })
    }

    var waitForWindowDDIndex = 0
    var waitForWindowDigitalData = setInterval(function () {
        if (
            window.digitalData &&
            window.digitalData.page &&
            window.digitalData.page.category.pageType &&
            typeof window.$ === 'function' &&
            langID
        ){
            clearInterval(waitForWindowDigitalData)

            //Do page logic here

            //Feedback button styling
            $('body').append(
                '<style>#surveyFeedback{position:relative;z-index:10;}#surveyFeedback span{font-family: Klein Medium Condensed New, Klein Medium New, KleinCondensedMed, Futura, Helvetica, Arial, sans-serif;font-size: 13px;}#surveyFeedback .mopinion-survey-content .btn-open-survey.tab.tab-bottom-right.allow-button {opacity: 1;visibility: visible;width: 35px !important;text-align: center;height: 35px;border-radius: 50%;padding: 0 !important;bottom: 7px;left: 7px;background: rgba(0, 0, 0, 0.6) !important;border:none !important;}#surveyFeedback .mopinion-survey-content .btn-open-survey.tab.tab-bottom-right.allow-button i {left: 8px;}#surveyFeedback .mopinion-survey-content .btn-open-survey.tab.tab-bottom-right.allow-button span {display:none !important;}@media screen and (max-width: 544px) {#surveyFeedback .mopinion-survey-content .btn-open-survey.tab.tab-bottom-right.allow-button i {left: 10px;}}</style>'
            )
            
        } else if (waitForWindowDDIndex > 100) {
            clearInterval(waitForWindowDigitalData)
        }

        waitForWindowDDIndex++
    }, 50)
})();

window.optimizely = window.optimizely || []
if (document.cookie.indexOf('ck_new_vs_return_cv_session') == -1) {
    document.cookie = 'ck_new_vs_return_cv_session=true; path=/;'

    var cvSetCountrySegment = function (cvCountry) {
        window.optimizely.push({
            type: 'user',
            attributes: {
                9579830856: cvCountry,
            },
        })
    }

    if (window.location.href.indexOf('www.calvinklein.nl') > -1) {
        cvSetCountrySegment('NL')
    } else if (window.location.href.indexOf('wwww.calvinklein.de') > -1) {
        cvSetCountrySegment('DE')
    } else if (window.location.href.indexOf('www.calvinklein.co.uk') > -1) {
        cvSetCountrySegment('UK')
    } else if (window.location.href.indexOf('www.calvinklein.fr') > -1) {
        cvSetCountrySegment('FR')
    } else if (window.location.href.indexOf('www.calvinklein.ru') > -1) {
        cvSetCountrySegment('RU')
    } else if (window.location.href.indexOf('www.calvinklein.es') > -1) {
        cvSetCountrySegment('ES')
    } else if (window.location.href.indexOf('www.calvinklein.it') > -1) {
        cvSetCountrySegment('IT')
    } else if (window.location.href.indexOf('www.calvinklein.pl') > -1) {
        cvSetCountrySegment('PL')
    }

    if (document.cookie.indexOf('ck_new_vs_return_cv_month') == -1) {
        window.optimizely.push({
            type: 'user',
            attributes: {
                9602950004: 'CK_new_visitor',
            },
        })

        var cvNowPlus30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        document.cookie =
            'ck_new_vs_return_cv_month=true;expires=' +
            cvNowPlus30Days.toUTCString() +
            '; path=/;'
    } else {
        window.optimizely.push({
            type: 'user',
            attributes: {
                9602950004: 'CK_returning_visitor',
            },
        })
    }
}

var trackDelayed = function () {
    const waitForPageReady = setInterval(function () {
        if (window && 
            window.optimizely && 
            window.optimizely.get('custom/adobeIntegrator') !== undefined && 
            sessionStorage &&
            typeof window.utag != 'undefined' && 
            typeof window.utag.link === 'function') {
                clearInterval(waitForPageReady);
                window.optimizely.get('custom/adobeIntegrator').trackDelayedCampaigns();
            }
        }, 100);
}

window.optimizely.push({
    type: 'addListener',
    filter: {
        type: 'lifecycle',
        name: 'campaignDecided',
    },
    handler: trackDelayed,
})

function setLangId() {
    if (
        window.digitalData &&
        window.digitalData.site &&
        window.digitalData.site.attributes &&
        window.digitalData.site.attributes.storeLanguage
    ) {
        langID = convertToLanguage(window.digitalData.site.attributes.storeLanguage)
    } else {
        setTimeout(function () {
            setLangId()
        }, 100)
    }
}

function convertToLanguage(s) {
    var string = s.split('_')
    return string[0] + '_' + string[1].toUpperCase()
}
/* jshint ignore:end */

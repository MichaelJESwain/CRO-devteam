const utils = window["optimizely"].get("utils");

let faqCTA_desktop;
let faqCTA_mobile;
let faqUIDrawer;
let faqUIDrawerOverlay;

function displayFAQAnswers(index) {
    if (document.querySelector('.faq-answer--show') && document.querySelector('.faq-answer--show') !== document.querySelectorAll('.faq-ui-draw_level-two .faq-list-item .faq-answer')[index]) {
        document.querySelector('.faq-answer--show').classList.remove('faq-answer--show');
        document.querySelector('.faq-chevron-icon--animate').classList.remove('faq-chevron-icon--animate');

    }
    setTimeout(function() {
        document.querySelectorAll('.faq-ui-draw_level-two .faq-list-item .faq-answer')[index].classList.toggle('faq-answer--show');
        document.querySelectorAll('.faq-ui-draw_level-two .faq-list-item .faq-chevron-icon')[index].classList.toggle('faq-chevron-icon--animate');
    }, 200);

    setTimeout(function() {
        document.querySelectorAll('.faq-ui-drawer_main')[1].scrollTop = document.querySelectorAll('.faq-ui-draw_level-two .faq-list-item')[index].offsetTop - (document.querySelector('.faq-ui-draw_level-two .faq-ui-drawer_header').offsetHeight + 24 + document.querySelector('.faq-return-button').offsetHeight);
    }, 600);
}

function closeFAQAnswers() {
        document.querySelectorAll('.faq-answer--show').forEach(function(faqAnswer) {
            faqAnswer.classList.remove('faq-answer--show');
        });

        document.querySelectorAll('.faq-chevron-icon--animate').forEach(function(chevron) {
            chevron.classList.remove('faq-chevron-icon--animate');
        });
}

function displayFAQDrawer() {
    document.querySelector('.faq-ui-drawer_overlay').style.display = 'block';
    setTimeout(function() {
        faqUIDrawerOverlay.classList.add('faq-ui-drawer_overlay_show');
        faqUIDrawer.classList.add('faq-ui-drawer_show');
    }, 100);
}

function closeFAQDrawer() {
    faqUIDrawer.classList.remove('faq-ui-drawer_show');
    faqUIDrawerOverlay.classList.remove('faq-ui-drawer_overlay_show');
    setTimeout(function() {
        faqUIDrawerOverlay.style.display = 'none';
        if (document.querySelector('.faq-ui-drawer--transition')) {
            document.querySelector('.faq-ui-drawer--transition').classList.remove('faq-ui-drawer--transition');
        }
        if (document.querySelectorAll('.faq-answer--show').length) {
            closeFAQAnswers();
        }
    }, 300);
}


function updateLevel2Content(index) {
    document.querySelector('.faq-ui-draw_level-two h2').textContent = `${dictionary[window.digitalData.site.attributes.storeCountry].faqContent[index].faqTopic}`;
    document.querySelector('.faq-ui-draw_level-two .faq-ui-drawer_header p').textContent = `${dictionary[window.digitalData.site.attributes.storeCountry].faqContent[index].faqTopic_description}`;

    for (let j = 0; j < document.querySelectorAll('.faq-ui-draw_level-two .faq-ui-drawer_main > div').length; j++) {
        if (j !== index) {
            document.querySelectorAll('.faq-ui-draw_level-two .faq-ui-drawer_main > div')[j].style.display = 'none';
        } else {
            document.querySelectorAll('.faq-ui-draw_level-two .faq-ui-drawer_main > div')[j].style.display = 'block';
        }
    }
}

function adjustLevel2ContentHeight() {
    const faqElements_size = document.querySelector('.faq-ui-draw_level-two .faq-ui-drawer_header').offsetHeight + 64 + document.querySelector('.faq-return-button').offsetHeight;
    document.querySelector('.faq-ui-draw_level-two .faq-ui-drawer_main').style.height = `calc(100% - ${faqElements_size}px)`;
}

function displayLevel2Content() {
    document.querySelector('.faq-ui-drawer-slider').classList.add('faq-ui-drawer--transition');
}

function closeLevel2Content() {
    document.querySelector('.faq-ui-drawer-slider').classList.remove('faq-ui-drawer--transition');
    if (document.querySelectorAll('.faq-answer--show').length) {
        closeFAQAnswers();
    }
}

function getLevel1Content() {
    let res = '';
    for (let i = 0; i < dictionary[window.digitalData.site.attributes.storeCountry].faqContent.length; i++) {

            res += `<div class="faq-list-item">
                        <div class="faq-topic">
                            <span>${dictionary[window.digitalData.site.attributes.storeCountry].faqContent[i].faqTopic}</span>
                            <span class="faq-topic-icon">${chevron_right}</span>
                        </div>
                    </div>
                    `;
        }
    return res;
}

function getLevel2Content() {
    let res = ``;
    for (let i = 0; i < dictionary[window.digitalData.site.attributes.storeCountry].faqContent.length; i++) {
        res += `<div>`;
        for (let j = 0; j < dictionary[window.digitalData.site.attributes.storeCountry].faqContent[i].faqList.length; j++) {
            res += `<div class="faq-list-item">
                        <div class="faq-question">
                            <span>${dictionary[window.digitalData.site.attributes.storeCountry].faqContent[i].faqList[j].question}</span>
                            <span class="faq-chevron-icon">${chevron_down}</span>
                        </div>
                        <div class="faq-answer">
                            <span>${dictionary[window.digitalData.site.attributes.storeCountry].faqContent[i].faqList[j].answer}</span>
                        </div>
                    </div>`;
        }
        res += `</div>`;
    }
    return res;
}

function createUIComponents() {
    faqCTA_mobile = document.createElement('button');
    faqCTA_mobile.setAttribute('class', 'faq-cta-mobile');
    faqCTA_mobile.innerHTML = `${faqCTAIcons[0]}`;

    
    faqCTA_desktop = document.createElement('button');
    faqCTA_desktop.setAttribute('class', 'faq-cta-desktop');
    faqCTA_desktop.innerHTML = `
                        <span class="faq-cta_icon">${faqCTAIcons[0]}</span>
                        <span class="faq-cta_text">${dictionary[window.digitalData.site.attributes.storeCountry].level1Title[0]}</span>
                        `;

    faqUIDrawer = document.createElement('div');
    faqUIDrawer.setAttribute('class', 'faq-ui-drawer');
    faqUIDrawer.innerHTML = `<div class="faq-ui-drawer_inner">
                                <button class="faq-ui-drawer_close-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 17 18" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.36399 1.22183C0.754514 0.831301 1.38768 0.831301 1.7782 1.22183L8.14216 7.58579L14.5061 1.22183C14.8966 0.831302 15.5298 0.831301 15.9203 1.22183C16.3109 1.61235 16.3109 2.24552 15.9203 2.63604L9.55638 9L15.9203 15.364C16.3109 15.7545 16.3109 16.3876 15.9203 16.7782C15.5298 17.1687 14.8966 17.1687 14.5061 16.7782L8.14216 10.4142L1.7782 16.7782C1.38768 17.1687 0.754514 17.1687 0.36399 16.7782C-0.0265347 16.3876 -0.0265344 15.7545 0.36399 15.364L6.72795 9L0.36399 2.63604C-0.0265344 2.24551 -0.0265347 1.61235 0.36399 1.22183Z" fill="#00174F"></path>
                                    </svg>
                                </button>
                                <div class="faq-ui-drawer-slider">
                                    <div class="faq-ui-drawer-info-container faq-ui-draw_level-one">
                                        <div class="faq-ui-drawer_header">             
                                                <h2>${dictionary[window.digitalData.site.attributes.storeCountry].level1Title[0]}</h2> 
                                                <p>${dictionary[window.digitalData.site.attributes.storeCountry].level1Description}</p>                                               
                                            </div>
                                        <div class="faq-ui-drawer_main"> 
                                        ${getLevel1Content()}
                                        </div>
                                    </div>
                                    <div class="faq-ui-drawer-info-container faq-ui-draw_level-two">
                                        <div class="faq-ui-drawer_header">
                                            <h2></h2>
                                            <p></p>
                                        </div>
                                        <div class="faq-ui-drawer_main"> 
                                            ${getLevel2Content()}
                                        </div>
                                        <button class="faq-return-button">
                                            <span>${chevron_right} </span>
                                            <span class="faq-return-button-text">${dictionary[window.digitalData.site.attributes.storeCountry].level2BackButton_copy[0]}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>`;
    
    faqUIDrawerOverlay = document.createElement('div');
    faqUIDrawerOverlay.setAttribute('class', 'faq-ui-drawer_overlay');

    faqCTA_desktop.addEventListener('click', function() {
        displayFAQDrawer();
    });

    faqCTA_mobile.addEventListener('click', function() {
        displayFAQDrawer();
    });

    faqUIDrawer.querySelector('.faq-ui-drawer_close-button').addEventListener('click', function() {
        closeFAQDrawer();
    });

    faqUIDrawerOverlay.addEventListener('click', function() {
        closeFAQDrawer();
    });

    faqUIDrawer.querySelector('.faq-return-button').addEventListener('click', function() {
        closeLevel2Content();
    });

    for (let i = 0; i < faqUIDrawer.querySelectorAll('.faq-ui-draw_level-one .faq-list-item').length; i++) {
        faqUIDrawer.querySelectorAll('.faq-ui-draw_level-one .faq-list-item')[i].addEventListener('click', function() {
            updateLevel2Content(i);
            displayLevel2Content();
            adjustLevel2ContentHeight();
        });
    }


    for (let i = 0; i < faqUIDrawer.querySelectorAll('.faq-ui-draw_level-two .faq-list-item').length; i++) {
        faqUIDrawer.querySelectorAll('.faq-ui-draw_level-two .faq-list-item')[i].addEventListener('click', function() {
            displayFAQAnswers(i);
        });
    }
}

function appendUIComponents() {
    document.querySelector('header .mobile-tablet-width-layout').parentElement.insertBefore(faqCTA_desktop, document.querySelector('header .mobile-tablet-width-layout'));
    document.querySelector('[data-testid="navigation"]').parentElement.insertBefore(faqCTA_mobile, document.querySelector('[data-testid="navigation"]'));
    document.querySelector('body').appendChild(faqUIDrawer);
    document.querySelector('body').appendChild(faqUIDrawerOverlay);

    // Update nav icons
    document.querySelector('[data-testid="sign-in-button"]').insertBefore(sign_in_icon, document.querySelector('[data-testid="sign-in-button"]').firstChild);
    document.querySelector('[data-testid="WishlistCount__icon"]').insertBefore(wishlist_icon, document.querySelector('[data-testid="WishlistCount__icon"]').firstChild);
    document.querySelector('[data-testid="MiniBasketToggle__link"] > span').insertBefore(shopping_bag_icon, document.querySelector('[data-testid="MiniBasketToggle__link"] > span').firstChild);

    document.querySelector('[data-testid="SearchInput"] + button').appendChild(search_input_icon);
    document.querySelector('[data-testid="SearchToggle"]').appendChild(search_toggle_icon);
}

createUIComponents();
appendUIComponents();

utils.observeSelector('header', () => {
    appendUIComponents();
});

utils.observeSelector('[data-testid="attribute-selector__selectors"]', () => {
    appendUIComponents();
});

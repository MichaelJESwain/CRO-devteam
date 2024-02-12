const CK378 = {
    dictionary: {
        moduleTitle: {
            uk: 'Recommended for you',
            nl: 'Echt iets voor jou',
            de: 'Für dich empfholen',
            fr: 'Sélectionné pour vous',
            it: 'Consigliati per te.',
            es: 'Nos gusta para ti',
          	pl: 'Polecany dla Ciebie'
        },
        buttonText: {
            uk: 'Load More',
            nl: 'Meer laden',
            de: 'Mehr laden',
            fr: 'Voir plus',
            it: 'Carica altro',
            es: 'Ver más',
          	pl: 'Załaduj więcej'
        }
    },
    init: () => {
        const module2Slides = document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection3"] [class*="Carousel_slide_"]');
        CK378.buildReccGrid(module2Slides);
    },
    buildReccGrid: (module2Slides) => {
        const reccGrid = document.createElement('div');
        reccGrid.setAttribute('class', 'CK378_reccGrid_container');
        reccGrid.innerHTML = `
            <div class="CK378_reccGrid_title_container">
                <h2 class="CK378_reccGrid_title">${CK378.dictionary.moduleTitle[window.location.host.split('.').pop()]}</h2>
            </div>
            <div class="CK378_reccGrid_content CK378_reccGrid_content_initialView">
            </div>
            <div class="CK378_reccGrid_button_container">
                <button class="CK378_reccGrid_button">${CK378.dictionary.buttonText[window.location.host.split('.').pop()]}</button>
            </div>
        `;
        
        reccGrid.querySelector('.CK378_reccGrid_button').addEventListener('click', () => {
            reccGrid.querySelector('.CK378_reccGrid_content_initialView').classList.remove('CK378_reccGrid_content_initialView');
            reccGrid.querySelector('.CK378_reccGrid_button_container').classList.add('CK378_hide');
        });

        document.querySelector('[data-testid="Recommendations-component-pdp_rec_injection3"]').parentElement.insertBefore(reccGrid, document.querySelector('[data-testid="Recommendations-component-pdp_rec_injection3"]'));

        module2Slides.forEach(slide => {
            slide.removeAttribute('style');
            reccGrid.querySelector(".CK378_reccGrid_content").appendChild(slide);
        });

        CK378.adjustRowHeight([
            [module2Slides[0], module2Slides[1]],
            [module2Slides[2], module2Slides[3]],
            [module2Slides[4], module2Slides[5]],
            [module2Slides[6], module2Slides[7]],
        ]);

        reccGrid.querySelector('.CK378_reccGrid_content').classList.add('CK378_reccGrid_content_initialView');
    },
    adjustRowHeight: (rows) => {
        rows.forEach(row => {
            const slide1 = row[0].querySelector('[class*="Recommendations_title_"]');
            const slide2 = row[1].querySelector('[class*="Recommendations_title_"]');

            if (slide1.offsetHeight === slide2.offsetHeight) {
                slide1.parentElement.classList.add("CK378_slideHeight_adjusted");
                slide2.parentElement.classList.add("CK378_slideHeight_adjusted");
            }
        });
    }
};
CK378.init();
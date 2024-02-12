const TH282 = {
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
          	pl: 'Załaduj więcej',
        }
    },
    init: () => {
        const module2Slides = document.querySelectorAll('[data-testid="Recommendations-component-pdp_rec_injection2"] [class*="Carousel_slide_"]');
        TH282.buildReccGrid(module2Slides);
    },
    buildReccGrid: (module2Slides) => {
        const reccGrid = document.createElement('div');
        reccGrid.setAttribute('class', 'TH282_reccGrid_container');
        reccGrid.innerHTML = `
            <div class="TH282_reccGrid_title_container">
                <h2 class="TH282_reccGrid_title">${TH282.dictionary.moduleTitle[window.location.host.split('.')[0]]}</h2>
            </div>
            <div class="TH282_reccGrid_content">
            </div>
            <div class="TH282_reccGrid_button_container">
                <button class="TH282_reccGrid_button">${TH282.dictionary.buttonText[window.location.host.split('.')[0]]}</button>
            </div>
        `;
        
        reccGrid.querySelector('.TH282_reccGrid_button').addEventListener('click', () => {
            reccGrid.querySelector('.TH282_reccGrid_content_initialView').classList.remove('TH282_reccGrid_content_initialView');
            reccGrid.querySelector('.TH282_reccGrid_button_container').classList.add('TH282_hide');
        });

        document.querySelector('[data-testid="Recommendations-component-pdp_rec_injection2"]').parentElement.insertBefore(reccGrid, document.querySelector('[data-testid="Recommendations-component-pdp_rec_injection2"]').nextElementSibling);

        module2Slides.forEach(slide => {
            slide.removeAttribute('style');
            reccGrid.querySelector(".TH282_reccGrid_content").appendChild(slide);
        });

        TH282.adjustRowHeight([
            [module2Slides[0], module2Slides[1]],
            [module2Slides[2], module2Slides[3]],
            [module2Slides[4], module2Slides[5]],
            [module2Slides[6], module2Slides[7]],
        ]);

        reccGrid.querySelector('.TH282_reccGrid_content').classList.add('TH282_reccGrid_content_initialView');
    },
    adjustRowHeight: (rows) => {
        rows.forEach(row => {
            const slide1 = row[0].querySelector('[class*="Recommendations_title_"]');
            const slide2 = row[1].querySelector('[class*="Recommendations_title_"]');

            if (slide1.offsetHeight === slide2.offsetHeight) {
                slide1.parentElement.classList.add("TH282_slideHeight_adjusted");
                slide2.parentElement.classList.add("TH282_slideHeight_adjusted");
            }
        });
    }
};
TH282.init();
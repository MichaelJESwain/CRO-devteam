const utils = window["optimizely"].get('utils');

utils.waitForElement('[data-testid="button--click-and-reserve"]').then(function() {
    trigger();
});

const placeBefore = function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
};
const placeAfter = function (newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

function trigger(){
  const button = document.querySelector('[data-click-target][data-testid="Button-secondary"]');
	const divButton = document.querySelector('[data-testid="button--click-and-reserve"]');
	const uspMessages = document.querySelector('[data-testid="usp-section"]').lastChild;
  
  const location_Icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.97349 1.5C13.7143 1.5 16.7468 4.53251 16.7468 8.2733C16.7468 11.6281 11.9877 18.49 9.97349 18.49C7.95931 18.49 3.2002 11.6281 3.2002 8.2733C3.2002 4.53251 6.2327 1.5 9.97349 1.5ZM9.97349 2.6375C6.86093 2.6375 4.3377 5.16073 4.3377 8.2733C4.3377 11.0699 8.69506 17.3525 9.97349 17.3525C11.2519 17.3525 15.6093 11.0699 15.6093 8.2733C15.6093 5.16073 13.0861 2.6375 9.97349 2.6375Z" fill="#00174F" stroke="#00174F" stroke-width="0.1"/>
    <path d="M9.97332 4.32349C11.9722 4.32349 13.5926 5.94391 13.5926 7.94281C13.5926 9.9417 11.9722 11.5621 9.97332 11.5621C7.97443 11.5621 6.354 9.9417 6.354 7.94281C6.354 5.94391 7.97443 4.32349 9.97332 4.32349ZM9.97332 5.35758C8.54554 5.35758 7.3881 6.51502 7.3881 7.94281C7.3881 9.37059 8.54554 10.528 9.97332 10.528C11.4011 10.528 12.5585 9.37059 12.5585 7.94281C12.5585 6.51502 11.4011 5.35758 9.97332 5.35758Z" fill="#00174F" stroke="#00174F" stroke-width="0.2"/>
    </svg>`;
    
    const location = document.createElement("span");
    location.innerHTML = `${location_Icon}`;
  	location.id = 'locationId';

    //Place elements
    if(divButton.childElementCount < 2){
    	placeBefore(location, button);
    }
  	
  	//placeAfter(divButton, uspMessages);
    
    // Styles    
  	button.classList.add('newFinderInStoreBtn');
    divButton.classList.add('newFinderInStoreDiv');
  
}

//Adobe Event
function adobeEvent(){
  utils.waitUntil(function () {
    return window.s && window.s.tl; //Adobe event
  }).then(function () {
    window.s.tl(this, 'o', 'TH152_Click_Finder_Store');
  });
}

document.querySelector('[data-testid="button--click-and-reserve"]').addEventListener('click', adobeEvent);

// Changing color in a PDP page
utils.observeSelector('[data-attribute="PRODUCT_ATTR_PRODUCT_ATTR_COLOUR"]', () => {
  //console.log("Changed the color");
  trigger();
});

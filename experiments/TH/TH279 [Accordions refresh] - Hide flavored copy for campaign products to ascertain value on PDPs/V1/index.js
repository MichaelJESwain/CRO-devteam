const utils = window["optimizely"].get("utils");
const TH279 = {
    mainFunction: function(){
        const container = document.querySelector('[data-testid="accordion-content"] div');
      	const nodes = document.querySelector('[data-testid="accordion-content"] div').childNodes;
        let count = 0;
        nodes.forEach(function(node){
         if(typeof node.textContent === 'string' && node.nodeValue !== null && node.nodeValue.includes('.') && node.nodeValue[node.nodeValue.length - 1] === '.' ){
                container.removeChild(node);
                container.querySelectorAll('br')[count].style.display = "none";
                count += 1;
            }
        })
       if(count === 1 ){
        container.querySelectorAll('br')[count].style.display = "none";
        }
        else if(count === 2){
            container.querySelectorAll('br')[count].style.display = "none";
            container.querySelectorAll('br')[count + 1].style.display = "none";
        }
      
    },
};
utils.observeSelector('[data-testid="accordion-content"] div', () => {
    TH279.mainFunction();
});
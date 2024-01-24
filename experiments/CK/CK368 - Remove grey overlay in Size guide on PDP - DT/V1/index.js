const utils = window["optimizely"].get("utils");
const CK368 = {
    addCss: function (css) {
        var s = document.createElement('style')
        s.innerHTML = css
        var h = document.querySelector('head')
        h.appendChild(s)
        return s
    },
    mainFunction: function(){
      console.log('CK368 started')
        this.addCss(`
        [class*=Modal_ModalOverlay__]{
            background-color: transparent;
        }
				[class*=SizeGuideTable_ModalContentCustom__] {
      		width: 40vw !important;
  			}
       `);
    }
};
utils.observeSelector('.ReactModal__Content--after-open[data-testid="sizeGuide-Modal-component"]', () => { 
    CK368.mainFunction(); 
})
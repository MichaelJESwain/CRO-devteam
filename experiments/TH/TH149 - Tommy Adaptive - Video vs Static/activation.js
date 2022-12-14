function callbackFn(activate, options) {
    if(/.*(at|be|bg|hr|cz|dk|ee|fi|fr|de|hu|ie|it|lv|lt|lu|nl|pl|pt|ro|sk|si|es|se|ch|uk)\.tommy\.com\/tommy-adaptive\.*/.test(window.location.href)) {
        var utils = window["optimizely"].get("utils");
        utils.waitForElement('.THModule1').then(function() {
        activate();
      });
    }
    
}
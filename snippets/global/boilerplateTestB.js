const testName = {

    init: function() {
       const example = "this is an example";
       testName.importantFunction(example);         
    },
    importantFunction: function(elem) {
        console.log(`the experiment started: ${elem}`);
    },
    
};

testName.init();
function callbackFn(activate, options) {
    window.optimizely.get("utils").waitUntil(() => {
       return window &&
       window.digitalData &&
       window.digitalData.page &&
       window.digitalData.page.category &&
       window.digitalData.page.category.pageType &&
       window.digitalData.page.category.primaryCategory;
   }).then(() => {
       if (window.digitalData.page.category.pageType.indexOf("glp") > -1 &&
       window.digitalData.page.category.primaryCategory.indexOf("men") > -1) {
           activate();
       }
   });
}
const observer = new window.IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        console.log(`do somenting`);
        return
    }
    //console.log('LEAVE')
  }, {
    root: null,
    threshold: 0.4, // set offset 0.4 means trigger if atleast 40% of element in viewport
  })
  
  const element = document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
  observer.observe(element);
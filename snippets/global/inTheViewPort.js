const observer = new window.IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        console.log(`do somenting`);
        return
    }
    //console.log('LEAVE')
  }, {
    root: null,
    threshold: 0.4, // set offset 0.1 means trigger if atleast 10% of element in viewport
  })
  observer.observe(element);
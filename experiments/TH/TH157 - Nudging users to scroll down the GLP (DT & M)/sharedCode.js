window.TH157={waitForElement:function(e,t){var n=(new Date).getTime(),o=window.requestAnimationFrame((function c(){var r=(new Date).getTime();(r-n)/1e3<3?document.querySelector(e)?(t(e),cancelAnimationFrame(o)):window.requestAnimationFrame(c):cancelAnimationFrame(o)}))},addCss:function(e){var t=document.createElement("style");return t.innerHTML=e,document.querySelector("head").appendChild(t),t},handleClick:function(e){const t=e.target,n=t.getAttribute("data-exp");let o,c=!1;document.querySelector(`div[data-exp="${n}"]`)?(o=document.querySelector(`div[data-exp="${n}"]`),t===document.querySelector("[class*=newsletter-footer__inner]")&&(c=!0)):document.querySelector(`section[data-exp="${n}"]`)?o=document.querySelector(`section[data-exp="${n}"]`):document.querySelector(`article[data-exp="${n}"]`)?o=document.querySelector(`article[data-exp="${n}"]`):document.querySelector(`footer[data-exp="${n}"]`)&&(o=document.querySelector(`footer[data-exp="${n}"]`)),o.scrollIntoView(!0);const r=Math.max(document.documentElement.clientHeight,window.innerHeight||0);window.scrollBy(0,(o.getBoundingClientRect().height-r)/2),setTimeout((()=>{document.querySelector(".activeDot").classList.toggle("activeDotWhite",c)}),500)},createDots:e=>{if(null===document.querySelector(".exp-dots-div")){const t=document.createElement("div");t.classList.add("exp-dots-div");document.querySelector(".exp-bar").appendChild(t);const n='<span class="exp-dot"></span>';let o='<span class="exp-dot activeDot"></span>';for(let t=0;t<e-1;t++)o+=n;t.innerHTML=`${o}`;const c=document.querySelectorAll(".exp-dot");let r=1;c.forEach((e=>{e.setAttribute("data-exp",`${r}`),e.addEventListener("click",window.TH157.handleClick),r+=1}))}},createScrollBar:e=>{if(null===document.querySelector(".exp-bar")){const e=document.createElement("div");e.classList.add("exp-bar");document.querySelector('[data-testid="glp-page"]').appendChild(e)}const t=60+14*e;window.TH157.addCss(`\n        .exp-bar{\n            z-index: 102;\n            position: fixed;\n            right: 26px;\n            top: calc(50% - ${t/2}px);\n            display: flex;\n            flex-direction: column;\n            justify-content: space-evenly;\n            align-items: center;\n            width: 14px;\n            height: ${t}px;\n            border-radius: 12px;\n        }\n    `)},observeElement:function(e){window.digitalData.site.attributes.siteDeviceVersion;new window.IntersectionObserver((([t])=>{t.isIntersecting&&window.TH157.waitForElement(".exp-dot",(()=>{let t=parseInt(e.getAttribute("data-exp"))-1,n=parseInt(e.getAttribute("data-exp"))+1,o=parseInt(e.getAttribute("data-exp"))-2,c=parseInt(e.getAttribute("data-exp"))+2;if(document.querySelector(`span[data-exp='${t}']`)&&document.querySelector(`span[data-exp='${t}']`).classList.remove("activeDot"),document.querySelector(`span[data-exp='${n}']`)&&document.querySelector(`span[data-exp='${n}']`).classList.remove("activeDot"),document.querySelector(`span[data-exp='${o}']`)&&document.querySelector(`span[data-exp='${o}']`).classList.remove("activeDot"),document.querySelector(`span[data-exp='${c}']`)&&document.querySelector(`span[data-exp='${c}']`).classList.remove("activeDot"),document.querySelectorAll(".exp-dot.activeDot").length>0&&document.querySelector(".exp-dot.activeDot").classList.remove("activeDot"),e.classList.contains("item")){let t=e.parentNode.parentNode.parentNode.parentNode;document.querySelector(`span[data-exp='${t.getAttribute("data-exp")}']`).classList.add("activeDot")}else if(e.classList.contains("ProductSlider__keen__slide")||e.classList.contains("THShopTheLook-media")){let e=document.querySelector(".THShopTheLook-info > div");document.querySelector(`span[data-exp='${e.getAttribute("data-exp")}']`).classList.add("activeDot")}else document.querySelector(`span[data-exp='${e.getAttribute("data-exp")}']`).classList.add("activeDot")}))}),{root:null,threshold:.4}).observe(e)},checkBanner:e=>{window.TH157.waitForElement(".activeDot",(()=>{const t=document.querySelector(".activeDot").getBoundingClientRect(),n=e.getBoundingClientRect();let o=!1;t.top>n.top&&t.bottom<n.bottom?o=!0:(o=!1,document.querySelector(".exp-dot.activeDotWhite")&&document.querySelector(".exp-dot.activeDotWhite").classList.remove("activeDotWhite")),document.querySelector(".activeDot").classList.toggle("activeDotWhite",o)}))},observeBanner:function(e){new window.IntersectionObserver((([e])=>{e.isIntersecting&&document.addEventListener("scroll",(function(){window.TH157.checkBanner(document.querySelector("[class*=newsletter-footer_]"))}))}),{root:null,threshold:.8}).observe(e)},count:0,addId:function(e){window.TH157.count+=1,e.setAttribute("data-exp",`${window.TH157.count}`)},arrayModules:()=>{const e=[];return window.TH157.waitForElement(".THContentCollection",(()=>{if(document.querySelector(".THContentCollection").childNodes.forEach((function(t){e.push(t),window.TH157.addId(t)})),document.querySelector('[data-testid="olapicSpecificWidget"]')){e.push(document.querySelector('[data-testid="olapicSpecificWidget"]')),window.TH157.addId(document.querySelector('[data-testid="olapicSpecificWidget"]')),document.querySelectorAll('div[data-testid="olapicSpecificWidget"] li.instagram_graph').forEach((e=>{window.TH157.observeElement(e)}))}document.querySelector('[data-testid="THSeoContainer"]')&&(e.push(document.querySelector(".THSeoContainer--teaser")),window.TH157.addId(document.querySelector(".THSeoContainer--teaser"))),document.querySelector('[data-testid="NewsletterFooter"]')&&(e.push(document.querySelector("[class*=newsletter-footer__inner]")),window.TH157.addId(document.querySelector("[class*=newsletter-footer__inner]")),window.TH157.observeBanner(document.querySelector("[class*=newsletter-footer__inner]"))),document.querySelector('[data-testid="MembershipBanner"]')&&(e.push(document.querySelector("[class*=membership-banner__body_]")),window.TH157.addId(document.querySelector("[class*=membership-banner__body_]"))),document.querySelector('[data-testid="Footer"]')&&(e.push(document.querySelector('[data-testid="Footer"]')),window.TH157.addId(document.querySelector('[data-testid="Footer"]'))),e.map((e=>{window.TH157.observeElement(e),e.addEventListener("scroll",window.TH157.observeElement(e))})),window.TH157.createScrollBar(e.length),window.TH157.createDots(e.length)})),e}};const utils=window.optimizely.get("utils"),fireAdobeEvent=e=>{utils.waitUntil((function(){return utag&&utag.link})).then((function(){utag.link({event_name:`${e}`,percentage_scroll:`${percentage}`})}))},fireOptimizelyEvent=e=>{window.optimizely=window.optimizely||[],window.optimizely.push({type:"event",eventName:e,tags:{percentage:`${percentage}`}})},fireBothEvents=e=>{window[`hasFiredEvent-${e}`]||(window[`hasFiredEvent-${e}`]=!0,fireAdobeEvent(e),fireOptimizelyEvent(e),setTimeout((()=>{window[`hasFiredEvent-${e}`]=!1}),100))},arrayPercentages=[];let percentage=0;const fireScrollEvent=()=>{let e=window.scrollY/document.querySelector('[data-testid="glp-page"]').clientHeight,t=Math.round(100*e);arrayPercentages.push(t)};function clickEvent(){var e;arrayPercentages.sort((function(e,t){return t-e})),percentage=arrayPercentages[0],e="TH157-user-scroll-behavior",window[`hasFiredEvent-${e}`]||(window[`hasFiredEvent-${e}`]=!0,fireAdobeEvent(e),fireOptimizelyEvent(e),setTimeout((()=>{window[`hasFiredEvent-${e}`]=!1}),100))}document.addEventListener("scroll",fireScrollEvent),document.querySelector('[data-testid="nav-primary"]').addEventListener("click",clickEvent),document.querySelector('.flex-row[class*="actions_"]').addEventListener("click",clickEvent),document.querySelector('[class*="auto-play-carousel_"]').addEventListener("click",clickEvent),document.querySelectorAll('[data-cta=""]').forEach((function(e){e.addEventListener("click",clickEvent)})),document.querySelectorAll(".cta").forEach((function(e){e.addEventListener("click",clickEvent)})),utils.waitForElement('[data-term-suggestions=""] li[class*="term-suggestions__item"]').then((function(){document.querySelectorAll('[data-term-suggestions=""] li[class*="term-suggestions__item"]').forEach((function(e){e.addEventListener("click",clickEvent)})),document.querySelector('[data-testid="product-suggestions"]').addEventListener("click",clickEvent)})),document.querySelectorAll("picture").forEach((function(e){e.addEventListener("click",clickEvent)})),document.querySelectorAll("[data-pagetype]").forEach((function(e){e.addEventListener("click",clickEvent)})),document.querySelector('[data-testid="Footer"]').addEventListener("click",clickEvent);
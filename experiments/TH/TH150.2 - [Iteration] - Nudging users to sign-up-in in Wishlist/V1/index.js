const th150 = {
    createMsg: function(){
        const domain  = window.location.hostname.split('.')[0];
        const text = window.th150.translations[domain].v1;
        const text1 = text.split('.')[0];
        const text2 = text.split('.')[1];
        const wrapper = document.createElement('div');
        wrapper.classList.add('exp-wishlist');

        wrapper.innerHTML = `<div class="exp-wrap">
        <div class="exp-svg"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8.4" stroke="#F5A623" stroke-width="1.2"/>
    <path d="M10.6001 13.4C10.6001 13.7314 10.3315 14 10.0001 14C9.66873 14 9.4001 13.7314 9.4001 13.4L9.4001 8.6C9.4001 8.26863 9.66873 8 10.0001 8C10.3315 8 10.6001 8.26863 10.6001 8.6L10.6001 13.4Z" fill="#F5A623"/>
    <path d="M10.6001 6.4C10.6001 6.73137 10.3315 7 10.0001 7C9.66873 7 9.4001 6.73137 9.4001 6.4C9.4001 6.06863 9.66873 5.8 10.0001 5.8C10.3315 5.8 10.6001 6.06863 10.6001 6.4Z" fill="#F5A623"/>
    </svg></div>
<div class="exp-texts">
        <span>${text1}.</span>
        <span class="exp-link">${window.th150.translations[domain].link}</span>
        <span>${text2}</span>
</div>
    </div>
        `;
        return wrapper;
    },
    mainFunction: function(){ 
        const reference =  document.querySelector('[data-testid="FilledWishlist-component"] h2');
        if(document.querySelector('.exp-wishlist') == null){
            document.querySelector('[class*=FilledWishlist_TextContent___]').style.display = "none";
            window.th150.placeAfter(th150.createMsg(), reference);
document.querySelector('[data-testid="filledWishlist-sign-in-pvh-button"]').style.visibility = "hidden";
        }

        document.querySelector('.exp-link').addEventListener('click', () => {
            document.querySelector('[data-testid="filledWishlist-sign-in-pvh-button"]').click();
        })

    }
}
optimizely.utils.observeSelector('[data-testid="FilledWishlist-component"] h2', () => {
    th150.mainFunction();
})
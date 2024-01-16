const ck377 = {
    createMsg: function(){
        const arr = window.location.hostname.split('.')
        const domain  = arr[arr.length - 1];
        const text = window.ck377.translations[domain].v2;
        const text1 = text.split('.')[0];
        const text2 = text.split('.')[1];
        const text3 = text.split('.')[2];
        const wrapper = document.createElement('div');
        wrapper.classList.add('exp-wishlist');

        wrapper.innerHTML = `<div class="exp-wrap">
        <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8.4" stroke="#FF8F00" stroke-width="1.2"/>
        <path d="M10.6001 13.4C10.6001 13.7314 10.3315 14 10.0001 14C9.66873 14 9.4001 13.7314 9.4001 13.4L9.4001 8.6C9.4001 8.26863 9.66873 8 10.0001 8C10.3315 8 10.6001 8.26863 10.6001 8.6L10.6001 13.4Z" fill="#FF8F00"/>
        <path d="M10.6001 6.4C10.6001 6.73137 10.3315 7 10.0001 7C9.66873 7 9.4001 6.73137 9.4001 6.4C9.4001 6.06863 9.66873 5.8 10.0001 5.8C10.3315 5.8 10.6001 6.06863 10.6001 6.4Z" fill="#FF8F00"/>
        </svg></div>
    <div class="exp-texts">
     <div class="exp-title-msg">${text1}</div><div>${text2}.</div><div class="exp-cta">${text3}</div>
    </div>
    </div>
        `;
        return wrapper;
    },
    mainFunction: function(){
        const reference =  document.querySelector('[data-testid="FilledWishlist-component"] h2');
        if(document.querySelector('.exp-wishlist') == null){
            document.querySelector('[class*=FilledWishlist_TextContent___]').style.display = "none";
            window.ck377.placeAfter(ck377.createMsg(), reference);
            document.querySelector('[data-testid="filledWishlist-sign-in-pvh-button"]').style.visibility = "hidden";
        }
        document.querySelector('.exp-cta').addEventListener('click', () => {
            document.querySelector('[data-testid="filledWishlist-sign-in-pvh-button"]').click();
        })

    }
}
optimizely.utils.observeSelector('[data-testid="FilledWishlist-component"] h2', () => {
    ck377.mainFunction();
})
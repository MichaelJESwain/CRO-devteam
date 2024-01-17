const utils = window["optimizely"].get("utils");
const ck224 = {
    createLink: function(){
        const part1 = window.digitalData.cart.item[0].productName;
        const part2 = window.digitalData.cart.item[0].productCombi;
        const p1 = part1.replaceAll(' ', '-');
        return `/${p1}-${part2}`;
    },
    main: function(){
        const reference = document.querySelector('[class*=mini_bag_notification_mb_notification_imageContainer__]');
        const link = document.createElement('a');
        link.setAttribute('href', ck224.createLink());
        link.classList.add('exp-link-pdp');
        link.style.padding = '0';

        if(document.querySelector('.exp-link-pdp') == null){
            reference.append(link);
            link.append(reference.querySelector('img'));
        }

    },
}
utils.waitForElement('[class*=mini_bag_notification_mb_notification_imageContainer__]').then(() => {
ck224.main();
})
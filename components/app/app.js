'use strict';
(function() {
    let $el = document.querySelector('.js-menu');
    let data = {
        title: "headphones",
        items: ["sony", "philips", "behringer"]
    };

    let menu = new Menu($el, data);
    menu.render();
})();
'use strict';
(function() {
    let $menuEl = document.querySelector('.js-menu');
    let data = {
        title: "headphones",
        items: ["sony", "philips", "behringer"]
    };

    let $formEl = document.querySelector('.js-form')

    let menu = new Menu($menuEl, data);
    menu.render();

    let form = new Form($formEl);
    form.render();
})();
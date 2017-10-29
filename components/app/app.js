'use strict';
(function() {
    let $menuEl = document.querySelector('.js-menu');
    let data = {
        title: "headphones",
        items: [{
            url: "sony",
            anchor: "sony"
            }, {
            url: "philips",
            anchor: "philips"
            }, {
            url: "behringer",
            anchor: "behringer"}]
    };

    let $formEl = document.querySelector('.js-form');

    let $appEl = document.querySelector('.js-app');

    let $categEl = document.querySelector('.js-categories');

    let $amountEl = document.querySelector('.js-money-left');    

    let menu = new Menu($menuEl, data);
    menu.render();

    let form = new Form($formEl);
    form.render();

    let categories = new Categories($categEl);
    categories.render();

    let moneyLeft = new MoneyLeft($amountEl);
    moneyLeft.setAmount(0);
    moneyLeft.render();

    $appEl.addEventListener('formSubmit',(e) => menu.addItem(e.detail));
})();
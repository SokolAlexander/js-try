"use strict";

(function() {
    class Categories {


        constructor($el) {
            this.$el = $el;

            this._initEvents();
        }

        render() {
            this.$el.innerHTML = `<table><th>Choose a category</th><tr><td>Car</td></tr><tr><td>Food</td></tr><tr>
            <td>Clothes</td></tr><tr><td>fun</td></tr><tr><td>+</td></tr></table>`;
        }

        _initEvents() {
            this.$el.addEventListener("click", this._onClick.bind(this));
        }

        _onClick(e) {
            console.log(e.target);
        }
    };

    window.Categories = Categories;
})();
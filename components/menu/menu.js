'use strict';

(function() {
    /** 
     * Class representing a menu
    */
    class Menu {

        /**
         * Create a menu
         * @param {HTML element} $el 
         * @param {Object} data 
         */
        constructor($el, data) {
            this.$el = $el;
            this.data = data;

            this._initEvents();
        }

        _getItems() {
            return this.data.items.reduce((res, item) => `${res}<li>${item}<div class="delete"></div></li>`, '')
        }

        _initEvents() {
            this.$el.addEventListener('click', this._onClick.bind(this))
        }

        _onClick(e) {
            let self = this;
            if (e.target.tagName === "LI") {
                console.log(e.target);
            } else if (e.target.classList.contains('delete')) {
                console.log(this);   
                console.log(self);               
                
                this.delete(e.target.parentNode);
            }
        }

        delete($li) {
            console.log($li);
            console.log(this.$el);
            $li.parentNode.removeChild($li);
        }

        /**
         * Render a  menu
         */
        render() {
            this.$el.innerHTML = `${this.data.title}<ul>
            ${this._getItems()}
           </ul>`
        }
    };

    window.Menu = Menu;
})();
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
            return this.data.items.reduce((res, item) => `${res}<li data-index="${this.data.items.indexOf(item)}">${item}<div class="delete"></div></li>`, '')
        }

        _initEvents() {
            this.$el.addEventListener('click', this._onClick.bind(this))
        }

        _onClick(e) {
            if (e.target.tagName === "LI") {
                console.log(e.target);
            } else if (e.target.classList.contains('delete')) {         
                this.delete(e.target.parentNode);
            }
        }

        delete($itemToBeRemoved) {
            let indexToBeRemoved = parseInt($itemToBeRemoved.dataset.index, 10);
           this.data.items = this.data.items.filter((item, index) => {
               console.log(indexToBeRemoved !== index);
               return indexToBeRemoved !== index;
            });
           console.log(this.data.items)
           this.render();
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
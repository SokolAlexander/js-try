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

        /**
         * Form a list of li elements  in HTML
         * @return {string}
         */
        _getItems() {
            return this.data.items.reduce((res, item) => `${res}<li data-index="${this.data.items.indexOf(item)}">${item.anchor}<div class="delete"></div></li>`, '')
        }

        /**
         * initialise event listener of click on a menu
         */
        _initEvents() {
            this.$el.addEventListener('click', this._onClick.bind(this))
        }

        /**
         * process event of click on the menu
         * @param {event} e 
         */
        _onClick(e) {
            if (e.target.tagName === "LI") {
                console.log(e.target);
            } else if (e.target.classList.contains('delete')) {         
                this.delete(e.target.parentNode);
            }
        }

        /**
         * rewriting data array without item to be deleted and re-rendering menu
         * @param {HTMLElement}  
         */
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

        /**
         * add  item on form submit
         * @param {Object} item 
         */
        addItem(item) {
            this.data.items.push(item);
            this.render();
        }

    };

    //export
    window.Menu = Menu;
})();
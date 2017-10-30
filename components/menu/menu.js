'use strict';

(function() {
    /** 
     * Class representing a menu
    */
    class Menu {

        /**
         * Create a menu
         * @param {HTML element} $el 
         * @param {Array of objects} data 
         */
        constructor($el, data) {
            this.$el = $el;
            this.data = data;

            this._initEvents();
        }
		
		/**
		*Get formated date
		*@return {string}
		*/
		_getDate() {
			let date = new Date();
			return date.toLocaleDateString();
		}

        /**
         * Form a list of li elements  in HTML
         * @return {string}
         */
        _getItems() {	
            return this.data.reduce((res, item) => res += `<tr data-index="${this.data.indexOf(item)}">
																<td>${item.category} ${this._getComment(this.data.indexOf(item))}</td>
																<td>${item.amount}</td>
																<td><div class="delete"></div></td>
																</tr>`, '')
        }

		/**
		*get comment if there is one
		*return {string}
		*/
		_getComment(index) {
		if (this.data[index].comment) {
		return `<span class="show-comment">+</span>
			    <div class="comment">${this.data[index].comment}</div>`;
		}
		
		return '';
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
			if (e.target.classList.contains('show-comment')) {
			let $commentParent = e.target.parentNode;
			$commentParent.classList.toggle("display-comment");
			}
             else if (e.target.classList.contains('delete')) {         
                this.delete(e.target.parentNode.parentNode);
            } 
        }

        /**
         * rewriting data array without item to be deleted 
		 * and re-rendering menu and dispatch event to re-render counter
         * @param {HTMLElement}  
         */
        delete($itemToBeRemoved) {
			
			let indexToBeRemoved = parseInt($itemToBeRemoved.dataset.index, 10);
			let dataChange = new CustomEvent('dataChange', {bubbles: true, detail: this.data[indexToBeRemoved].amount});
            this.data = this.data.filter((item, index) => {
               return indexToBeRemoved !== index;
            });
            this.render();
			

			this.$el.dispatchEvent(dataChange);
            }

        /**
         * Render a  menu, dispatch event to re-render counter
         */
        render() {
			if (this.data[0]) { 
            this.$el.innerHTML = `<table class="spents">
			<th colspan=3>${this._getDate()}</th>
			${this._getItems()}</table>`
			} else {
				this.$el.innerHTML = '';
			}
			

        }

        /**
         * add  item on form submit
         * @param {Object} item 
         */
        addItem(item) {
            this.data.unshift(item);
            this.render();
        }

		
		/**
		*get summ for counter
		*return {number}
		*/
		_getSumm() {
			return this.data.reduce((res, item) => res += +item.amount, 0);
		}	
		
		
    };

    //export
    window.Menu = Menu;
})();
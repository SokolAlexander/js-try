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
/* 			return this.data.reduce((res, item) => res += `	<th colspan=3>${this._getDate()}</th>
															<tr data-index="${this.data.indexOf(item)}">
															<td>${item.category} ${this._getComment(this.data.indexOf(item))}</td>
															<td>${item.amount}</td>
															<td><div class="delete"></div></td>
															</tr>`, '')
			 */
			let res = `<th colspan=3>${this.data[0].date}</th>${this._getOneItem(0)}`;
			
			let i = 1;
			while (this.data[i]) {
				if (this.data[i - 1].date === this.data[i].date) {res += `${this._getOneItem(i)}`;
				} else {
					res += `<th colspan=3>${this.data[i].date}</th>${this._getOneItem(i)}`
				};
			i++;
			} 
			
			return res;
		}
		
		_getOneItem(index) {
			return `<tr data-index="${index}">
					<td>${this.data[index].category} ${this._getComment(index)}</td>
					<td>${this.data[index].amount}</td>
					<td><div class="delete"></div></td>
					</tr>`
		}

		/**
		*get comment if there is one
		*return {string}
		*/
		_getComment(index) {
		if (this.data[index].comment) {
		return `<span class="show-comment"></span>
			    <div class="comment">${this.data[index].comment}</div>`;
		}
		
		return '';
		}
		
        /**
         * initialise event listener of click on a menu
         */
        _initEvents() {
            this.$el.addEventListener('click', () => this._onClick.call(this, event));
        }

        /**
         * process event of click on the menu
         * @param {event} e 
         */
        _onClick(e) {
			if (!this.isRendered) return;
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
            console.log(this.data);
            let dataChange = new CustomEvent('elDelete', {bubbles: true, 
                                                           detail: {amount: this.data[indexToBeRemoved].amount,
                                                                    sign: this.data[indexToBeRemoved].sign}
                                                          });
            
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
			${this._getItems()}</table>`
			} else {
				this.$el.innerHTML = '';
			}
			
			this.isRendered = true;
			}
        

        /**
         * add  item on form submit
         * @param {Object} item 
         */
        addItem(item) {
            this.data.unshift(item);
			this.data[0].date = this._getDate();
            this.render();
        }
		/**
         * get data set for reports
         * @return {object}
         */
		getRepData() {
			let repData = {};
			
			for (let i = 0; i < this.data.length; i++) {
				if (this.data[i].category in repData) {
					repData[this.data[i].category] += +this.data[i].amount;
				} else repData[this.data[i].category] = +this.data[i].amount
			}
			return repData;
		}
		
    };
	
    //export
    window.Menu = Menu;
})();
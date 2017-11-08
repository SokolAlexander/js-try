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
			this.$setDate = document.querySelector('.set-date');

            this._initEvents();
			this._setFullData();
        }
		
		_setFullData() {
			this.fullData = [];
			
			for (let i = 0; i < this.data.length; i++) {
				this.fullData.push(this.data[i]);
			}
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
			let res = `<th colspan=3 class="date">${this.data[0].date.toLocaleDateString()}</th>${this._getOneItem(0)}`;
			
			let i = 1;
			while (this.data[i]) {
				if (this.data[i - 1].date.toLocaleDateString() === this.data[i].date.toLocaleDateString()) {res += `${this._getOneItem(i)}`;
				} else {
					res += `<th colspan=3 class="date">${this.data[i].date.toLocaleDateString()}</th>${this._getOneItem(i)}`
				};
			i++;
			} 
			
			return res;
		}
		
		_getOneItem(index, actData = this.data) {
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
            this.$el.addEventListener('click', this._onClick.bind(this));
        }
		
		_onSubmit(e) {
			debugger;
			e.preventDefault();
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
					this._delete(e.target.parentNode.parentNode);
				} 
					else if (e.target.classList.contains('show-date-button')) {
						let dateFrom = this.$el.querySelector('.from').value;
						let dateTo = this.$el.querySelector('.to').value;
						this._filterByDate(dateFrom, dateTo);
					}
						else if (e.target.classList.contains('drop-date-button')) {
							this._dropDate();
						}
        }
		
		_filterByDate(dateFrom, dateTo) {

			if (!dateFrom && !dateTo) return;
			
			if (!dateFrom) dateFrom = new Date();
			if (!dateTo) dateTo = new Date();
			
			let dateFromMs = new Date(dateFrom).valueOf();
			let dateToMs = new Date(dateTo).valueOf();
			
			if (dateFromMs > dateToMs) {
				dateFromMs = new Date(dateTo).valueOf();
				dateToMs = new Date(dateFrom).valueOf();
			};
						
			this.data = this.data.filter((item, i, arr) => {
				return ((new Date(item.date).valueOf() > dateFromMs) && (new Date(item.date).valueOf() < dateToMs))
			});
			
			this.render();
		}
		
		_dropDate() {
			this.data = this.fullData;
			this.render();
		}
		
        /**
         * rewriting data array without item to be deleted 
		 * and re-rendering menu and dispatch event to re-render counter
         * @param {HTMLElement}  
         */
        _delete($itemToBeRemoved) {
            let indexToBeRemoved = parseInt($itemToBeRemoved.dataset.index, 10);
            let dataChange = new CustomEvent('elDelete', {bubbles: true});
            
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
            this.$el.innerHTML = `<div class="set-date"><form class="set-date">
			<input class="from" type="date">
			<input class="to" type="date">
			<input class="show-date-button" type="button" value="SHOW">
			<input class="drop-date-button" type="button" value="DROP">
			</form>
			</div>
			<table class="spents">
			${this._getItems()}</table>`
			} else {
				this.$el.innerHTML = `<div class="set-date"><form class="set-date">
			<input class="from" type="date">
			<input class="to" type="date">
			<input class="show-date-button" type="button" value="SHOW">
			<input class="drop-date-button" type="button" value="DROP">
			</form>`;
			}
			
			this.isRendered = true;
		}
        

        /**
         * add  item on form submit
         * @param {Object} item 
         */
        addItem(item) {
            this.data.unshift(item);
			let today = new Date();
			this.data[0].date = today;
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
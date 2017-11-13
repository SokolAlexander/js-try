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
		
		/**
		 * initialise event listener of click on a menu
		 */
		_initEvents() {
			this.$el.addEventListener('click', this._onClick.bind(this));
		}
		
		/**
		 * copy data for setting date range
		 */
		_setFullData() {
			this.fullData = [];
			
			for (let i = 0; i < this.data.length; i++) {
				this.fullData.push(this.data[i]);
			}
		}

		/**
		 * Render a menu
		 */
		render() {
			
			if (this.data[0]) { 
				this.$el.innerHTML = `${this._getDateDiv()}
				<table class="spents">
				${this._getItems()}</table>`
				} else {
				this.$el.innerHTML = `${this._getDateDiv()}	`;
			}
		this.isRendered = true;
		}
	
		/**
		 * get html for a form to choose date manually
		 * @return {HTML string}
		 */
		_getDateDiv() {
			let startDate = this._getFormattedDate(new Date());
			let endDate = this._getFormattedDate(new Date());

			if (this.data[0]) {
				startDate = this._getFormattedDate(this.data[this.data.length - 1].date);
				endDate = this._getFormattedDate(this.data[0].date);
			};
			return `<div class="set-date-range"><form class="set-date-range">
			<input class="from" type="date" value="${startDate}">
			<input class="to" type="date" value="${endDate}">
			<input class="set-date-range-button" type="button" value="SHOW">
			<input class="drop-date-range-button" type="button" value="DROP">
			</form>
			</div>`
		}
	
		/**
		 * get date in format yyyy-MM-dd (for a form)
		 * @param {Object Date} date 
		 * @return {string}
		 */
		_getFormattedDate(date) {
			let month = (1 + date.getMonth() + '').length === 1 ? '0' + (1 + date.getMonth()) : 1 + date.getMonth();
			let day = (date.getDate() + '').length === 1 ? '0' + date.getDate() : date.getDate();
			return date.getFullYear() + '-' + month + '-' + day;
		}
		
        /**
		 * Form a list of li elements  in HTML
		 * @return {HTML string}
         */
		_getItems() {	
			let res = `<th colspan=3 class="date">${this.data[0].date.toLocaleDateString()}
					   </th>${this._getOneItem(0)}`;
			
			let i = 1;
			while (this.data[i]) {
				if (this.data[i - 1].date.toLocaleDateString() === this.data[i].date.toLocaleDateString()) {
					res += `${this._getOneItem(i)}`;
				} else {
					res += `<th colspan=3 class="date">${this.data[i].date.toLocaleDateString()}
					</th>${this._getOneItem(i)}`
				};
				i++;
			} 
			return res;
		}
		
		/**
		 * get HTML for one item of menu
		 * @param {number} index 
		 * @return {HTMLstring}
		 */
		_getOneItem(index) {
			return `<tr data-index="${index}">
					<td>${this.data[index].category} ${this._getComment(index)}</td>
					<td>${this.data[index].amount}</td>
					<td><div class="delete"></div></td>
					<td><div class="show-date-change">
					<div class='hidden date-change'>
					<input type='date'>
					<input type='button' value='ok' class='date-change-button'>
					<div class='hide-date-change'></div>
					</div></div></td>					
					</tr>`
		}

		/**
		*get comment if there is one
		*@return {HTMLstring}
		*/
		_getComment(index) {
			if (this.data[index].comment) {
			return `<span class="show-comment"></span>
					<div class="comment">${this.data[index].comment}</div>`;
			}
			return '';
		}
		

		
		/**
		 * process event of click on the menu, call certain function
		 * @param {event} e 
         */
		_onClick(e) {
			if (!this.isRendered) return;
			
			switch (this._classListContains(e.target.classList)) {
				case 0: {e.target.parentNode.classList.toggle('display-comment');break}
				case 1: {this._delete(e.target.parentNode.parentNode);break}
				case 2: {e.target.parentNode.classList.add('hidden');break}
				case 3: {this._changeItemDate(e.target.parentNode.parentNode.parentNode.parentNode);break}
				case 4: {e.target.querySelector('input').parentNode.classList.remove('hidden');break}
				case 5: {this._filterByDate(this.$el.querySelector('.from').value, this.$el.querySelector('.to').value);break}
				case 6: {this._dropDate();break}
			}
        }
		
		/**
		 * Change date of an item and put it in a right place in data array
		 * @param {HTMLObject} item 
		 */
		_changeItemDate(item) {
			let date = item.querySelector('input').value;
			this.data[item.dataset.index].date = new Date(date);

			this._sortByDate();
			this.render();
		}

		/**
		 * sort this.data by date of an item
		 */
		_sortByDate() {
			this.data.sort((a, b) => {
				if (a.date.valueOf() > b.date.valueOf()) return -1;
				return 1;
			})
		}
		
		/**
		 * check if classlist of clicked element contains certain class
		 * @param {Array of classNames} targClassList 
		 * @return {number}
		 */
		_classListContains(targClassList) {
			if (targClassList.contains('show-comment')) {
				return 0;
			};
			if (targClassList.contains('delete')) {  
				return 1;
			}; 
			if (targClassList.contains('hide-date-change')) {
				return 2;
			};
			if (targClassList.contains('date-change-button')) {
				return 3;
			};
			if (targClassList.contains('show-date-change')) {
				return 4;
			};
			if (targClassList.contains('set-date-range-button')) {
				return 5;
			};
			if (targClassList.contains('drop-date-range-button')) {
				return 6;
			};
		}
		
		/**
		 * filters data by manually set date
		 * @param {string yyyy-MM-dd} dateFrom 
		 * @param {string yyyy-MM-dd} dateTo 
		 */
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

		/**
		 * drop the date interval and render full data
		 */
		_dropDate() {
			this.data = this.fullData;
			this.render();
		}
		
        /**
         * filtering data array without item to be deleted 
		 * and re-rendering menu and dispatching event to re-render counter
         * @param {HTMLElement}  
         */
        _delete($itemToBeRemoved) {
            let indexToBeRemoved = parseInt($itemToBeRemoved.dataset.index, 10);
            let dataChange = new CustomEvent('menuChange', {bubbles: true});
            
            this.data = this.data.filter((item, index) => {
                return indexToBeRemoved !== index;
            });

            this.render();			
            this.$el.dispatchEvent(dataChange);
        }

        /**
         * add item on form submit
         * @param {Object} item
         */
        addItem(item) {
            let dataChange = new CustomEvent('menuChange', {bubbles: true});
			
            this.data.unshift(item);
			let today = new Date();
			this.data[0].date = today;
			this.render();
            this.$el.dispatchEvent(dataChange);			
		}

		/**
         * get dataset for reports
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
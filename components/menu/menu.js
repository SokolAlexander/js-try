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

		_getFormattedDate(date) {
			let month = (1 + date.getMonth() + '').length === 1 ? '0' + (1 + date.getMonth()) : 1 + date.getMonth();
			let day = (date.getDate() + '').length === 1 ? '0' + date.getDate() : date.getDate();
			return date.getFullYear() + '-' + month + '-' + day;
		}

        /**
         * Form a list of li elements  in HTML
         * @return {string}
         */
        _getItems() {	
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
		
		_classListContains(targClassList) {
			if (targClassList.contains('show-comment')) {
				console.log(0);
				return 0;
				};
				if (targClassList.contains('delete')) {  
					console.log(1);	
					return 1;
					}; 
					if (targClassList.contains('hide-date-change')) {
							return 2;
						};
						if (targClassList.contains('date-change-button')) {
								//rewrite with closest
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
         * process event of click on the menu
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
            this.$el.innerHTML = `${this._getDateDiv()}
			<table class="spents">
			${this._getItems()}</table>`
			} else {
				this.$el.innerHTML = `${this._getDateDiv()}	`;
			}
			
			this.isRendered = true;
		}

		_getDateDiv() {
			let startDate = this._getFormattedDate(new Date());
			let endDate = this._getFormattedDate(new Date());
			console.log('inside getdatediv');
			if (this.isRendered) {
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
         * add  item on form submit
         * @param {Object} item 
         */
        addItem(item) {
            this.data.unshift(item);
			let today = new Date();
			this.data[0].date = today;
            this.render();
		}
		
		_changeItemDate(item) {
			//console.log(item);
			let calendar = item.querySelector('input');
			let date = calendar.value;
			this.data[item.dataset.index].date = new Date(date);

			// this.data.sort((elem1, elem2) => {
			// 	console.log(elem1.date + ' ' + elem1.date.valueOf());
			// 	console.log(this.data[item.dataset.index].date + ' ' + this.data[item.dataset.index].date.valueOf());
			// 	if (elem1.date.valueOf() >= this.data[item.dataset.index].date.valueOf()) return 1;
			// 	return -1;
			// });
			let newDateItem = this.data.splice(item.dataset.index, 1)[0];
			let i = 0;
			
			while (this.data[i].date.valueOf() > newDateItem.date.valueOf()) {
				console.log(this.data[i].date.valueOf() > newDateItem.date.valueOf());	
				i++;
				if (i >= this.data.length) break;
				continue;
				 
			};
			this.data.splice(i, 0, newDateItem);

			console.log(this.data);

			this.render();
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
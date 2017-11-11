'use strict';

(function() {
	
	/**
	 * class representing a whole application
	 */
	class App {
		
		/**
		 * construct an app
		 * @param {HTMLElement}  
		 */
		constructor($el) {
			this.$appEl = $el;
			
			//getting all HTML elements
			this.$menuEl = document.querySelector('.js-menu');
			this.$formEl = document.querySelector('.js-form');
			this.$spentEl = document.querySelector('.js-spent');
			this.$incomeEl = document.querySelector('.js-income');
			this.$amountEl = document.querySelector('.js-money-left');  
			
			this.$arrowEl = document.querySelector('.js-arrow');
			this.categPosition = false;
			
			this.$repEl = document.querySelector('.js-report');
			this.$showRepEl = document.querySelector('.js-show-report');
			
			
			//setting all the categs and data (temp)
			this.dataIn = [{category: 'Apartment', amount: 100, comment: 'test', sign: 1, date: new Date('2017.11.02')}, 
						  {category: 'salary', amount: 50, comment: 'test', sign: 1, date: new Date('2017.11.02')},
						  {category: 'percents', amount: 20, comment: 'test', sign: 1, date: new Date('2017.08.20')},
						  {category: 'gifts', amount: 30, comment: 'test', sign: 1, date: new Date('2017.08.20')},];
			this.dataOut = [];
			this.categs = ['Car', 'Food', 'Clothes'];
			this.categsIn = ['Salary', 'Percents', 'Gifts'];
			
			//creating all js elements and rendering		
			this.menuIn = new Menu(this.$menuEl, this.dataIn);
			this.menuIn.name = 'menuIn';
			this.menuIn.render();

			this.menuOut = new Menu(this.$menuEl, this.dataOut);
			this.menuOut.name = 'menuOut';
			
			this.counter = new Counter(this.$amountEl);
			this.counter.computeAmount(this.menuIn.getRepData(), this.menuOut.getRepData());

			this.form = new Form(this.$formEl);
			this.form.render();

			//1 - income - left - plus when adding, minus when deleting
			//0 - spents - right - minus when adding, plus when deleting
			this.spent = new Categories(this.$spentEl, this.categs, 0);
			this.spent.render();
		
			this.income = new Categories(this.$incomeEl, this.categsIn, 1);
			this.income.render();

			this.reportIn = new Report(this.$repEl);
			this.reportOut = new Report(this.$repEl);

			this._initEvents();
		}
	
		/**
		 * initialise all event listeners
		 */
		_initEvents() {
			this.$appEl.addEventListener('pickCategory', this._onItemAdd.bind(this));
			this.$appEl.addEventListener('menuChange', (e) => {
				this.counter.computeAmount(this.menuIn.getRepData(), this.menuOut.getRepData())});
			
			this.$arrowEl.addEventListener('click', this._changeCategoryPos.bind(this));
			this.$showRepEl.addEventListener('click', this._showRep.bind(this));
		}
		
		/**
		 * process adding an item
		 * @param {event} e 
		 */
		_onItemAdd(e) {
			let newItem = this.form.getData(e.detail);
			//if (this.menuIn.isRendered) {
				if (this.menuIn.isRendered) this.menuIn.addItem(newItem)
				else {
					this.menuOut.addItem(newItem);
					//this.counter.computeAmount(this.menuIn.getRepData(), this.menuOut.getRepData());
					}
			//}
		}
		
		/**
		 * change category position, menu, report
		 */
		_changeCategoryPos() {
			if (this.categPosition) {
					this.categPosition = this.spent.moveRight();
					this.income.moveRight();
					this.menuIn.render();
					this.menuOut.isRendered = false;
					this.reportIn.setData(this.menuIn.getRepData());
				} else {
					this.categPosition = this.spent.moveLeft();
					this.income.moveLeft();
					this.menuOut.render();
					this.menuIn.isRendered = false;
					this.reportIn.setData(this.menuOut.getRepData());
				};
			this.$arrowEl.classList.toggle('arrow-transform');
		}

		/**
		 * show report div
		 */	
		_showRep() {
			this.$repEl.classList.remove('report-hidden');
		
			if (!this.categPosition) {
					this.reportIn.setData(this.menuIn.getRepData())
				} else {
					this.reportOut.setData(this.menuOut.getRepData())
				};
			
			this.$repEl.scrollIntoView();
			}
		};
		
	window.App = App;
})();
'use strict';

(function() {
	
		let $menuEl = document.querySelector('.js-menu');
		let data = [];
		let categs = ['Car', 'Food', 'Clothes'];
		let categsIn = ['Salary', 'Percents', 'Gifts'];

		let $formEl = document.querySelector('.js-form');

		let $appEl = document.querySelector('.js-app');

		let $spentEl = document.querySelector('.js-spent');
		
		let $incomeEl = document.querySelector('.js-income');

		let $amountEl = document.querySelector('.js-money-left');    

		let menu = new Menu($menuEl, data);
		menu.render();

		let form = new Form($formEl);
		form.render();

		let spent = new Categories($spentEl, categs, 0);
		spent.render();
		
		let income = new Categories($incomeEl, categsIn, 1);
		income.render();

		//1 - income - left - plus when adding, minus when deleting
		//0 - spents - right - minus when adding, plus when deleting

		let counter = new Counter($amountEl);
		counter.setAmount(0);

		$appEl.addEventListener('pickCategory', (e) => {
													   let newItem = form.getData(e.detail);
													   if (newItem) {menu.addItem(newItem);
													   //counter.setAmount(e.detail.sign ? counter.amount + +newItem.amount : counter.amount - newItem.amount);
													   //debugger;
													   counter.computeAmount(menu.data)};
													   });
		
		$appEl.addEventListener('dataChange', (e) => {counter.computeAmount(menu.data)});
		
})();
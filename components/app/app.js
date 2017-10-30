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

		let spent = new Categories($spentEl, categs, 1);
		spent.render();
		
		let income = new Categories($incomeEl, categsIn, 0);
		income.render();

		let counter = new Counter($amountEl);
		counter.setAmount(0);

		$appEl.addEventListener('pickCategory',(e) => {let newItem = form.getData(e.detail.categ);
													   if (newItem) {menu.addItem(newItem);
													   counter.setAmount(counter.amount + (-1 * e.detail.sign) * newItem.amount));
													   };
													   });
		
		$appEl.addEventListener('dataChange', (e) => counter.setAmount(counter.amount + +e.detail));
		
})();
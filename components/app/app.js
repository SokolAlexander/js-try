'use strict';

(function() {
	
	let dataIn = [];
	let dataOut = [];
	let categs = ['Car', 'Food', 'Clothes'];
	let categsIn = ['Salary', 'Percents', 'Gifts'];
	
	let $menuEl = document.querySelector('.js-menu');
	let $formEl = document.querySelector('.js-form');
	let $appEl = document.querySelector('.js-app');
	let $spentEl = document.querySelector('.js-spent');
	let $incomeEl = document.querySelector('.js-income');
	let $amountEl = document.querySelector('.js-money-left');    
	
	let $arrowEl = document.querySelector('.arrow');
	let categPosition = false;
	
	let menuIn = new Menu($menuEl, dataIn);
	menuIn.render();

	let menuOut = new Menu($menuEl, dataOut)

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
											if (newItem) {menuIn.addItem(newItem);s
											counter.computeAmount(menuIn.dataIn)};
											});
	
	$appEl.addEventListener('dataChange', (e) => {counter.computeAmount(menuIn.dataIn)});
	
	$arrowEl.addEventListener('click', () => {if (categPosition) {
		categPosition = spent.moveRight();
		income.moveRight();
		} else {
			categPosition = spent.moveLeft();
			income.moveLeft();
		};
		$arrowEl.classList.toggle('arrow-transform')})
})();
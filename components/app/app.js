'use strict';

(function() {
	
	let dataIn = [{category: 'car', amount: 100, comment: 'test', sign: 1, date: '02.11.2017'}, 
				  {category: 'salary', amount: 10, comment: 'test', sign: 1, date: '02.08.2017'},
				  {category: 'percents', amount: 20, comment: 'test', sign: 1, date: '02.08.2017'},
				  {category: 'gifts', amount: 30, comment: 'test', sign: 1, date: '02.08.2017'},];
	let dataOut = [];
	let categs = ['Car', 'Food', 'Clothes'];
	let categsIn = ['Salary', 'Percents', 'Gifts'];
	
	let $menuEl = document.querySelector('.js-menu');
	let $formEl = document.querySelector('.js-form');
	let $appEl = document.querySelector('.js-app');
	let $spentEl = document.querySelector('.js-spent');
	let $incomeEl = document.querySelector('.js-income');
	let $amountEl = document.querySelector('.js-money-left');    
	
	let $arrowEl = document.querySelector('.js-arrow');
	let categPosition = false;
	
	let $repEl = document.querySelector('.js-report');
	let $showRepEl = document.querySelector('.js-show-report');
	//let $showPieEl = document.querySelector('.js-show-pie');
	let	reportIn = new Report($repEl);
	let	reportOut = new Report($repEl);
		
	
	let menuIn = new Menu($menuEl, dataIn);
	menuIn.name = 'menuIn';
	menuIn.render();

	let menuOut = new Menu($menuEl, dataOut);
	menuOut.name = 'menuOut';

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
											if (newItem) {
												if (newItem.sign) menuIn.addItem(newItem)
													else menuOut.addItem(newItem);
											counter.computeAmount(newItem) };
											});
	
	$appEl.addEventListener('elDelete', (e) => {
		//if false then -1 - true, else 1 then 0 = false
		e.detail.sign -= 1;
		counter.computeAmount(e.detail)});
	
	$arrowEl.addEventListener('click', () => {if (categPosition) {
		categPosition = spent.moveRight();
		income.moveRight();
		menuIn.render();
		menuOut.isRendered = false;
		reportIn.setData(menuIn.getRepData());
		} else {
			categPosition = spent.moveLeft();
			income.moveLeft();
			menuOut.render();
			menuIn.isRendered = false;
			reportIn.setData(menuOut.getRepData());
		};
		$arrowEl.classList.toggle('arrow-transform')});
		
	$showRepEl.addEventListener('click', () => {
		
		$repEl.classList.remove('report-hidden');
		
		if (!categPosition) {
			reportIn.setData(menuIn.getRepData())
			} else {
				reportOut.setData(menuOut.getRepData())
			};
			
		$repEl.scrollIntoView();
	
	});

	reportIn.makePie(menuIn.getRepData());
})();
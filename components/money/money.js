(function() {

    class Counter {

        constructor($el) {
            this.$el = $el;
			
			this._initEvents();
        }

        computeAmount(income, outcome) {
			
			let summIn = 0;
			for (let key in income) {
				summIn += +income[key]; 
			}
			
			let summOut = 0;
			for (let key in outcome) {
				summOut += +outcome[key]; 
			}
		
            this.amount = summIn - summOut;
            this._render();
        }

        setAmount(amnt) {
            this.amount = amnt;
			this._render();
        }

        _render() {
            this.$el.innerHTML = `${this.amount}<div class="edit"></div>`;
        }
		
		_initEvents() {
			this.$el.addEventListener('click', this.editAmount.bind(this));
		}
		
		editAmount(e) {
			if (e.target.classList.contains('edit')) {
			let newAmount = +prompt('Enter new amount?', this.amount);
			this.setAmount(newAmount);
			}
		}
    };

    window.Counter = Counter;
})();
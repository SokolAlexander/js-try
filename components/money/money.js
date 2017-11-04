(function() {

    class Counter {

        constructor($el) {
            this.$el = $el;
			
			this._initEvents();
        }

        computeAmount(lastItem) {
            // let amnt = dataIn.reduce((res, item) => res += +item.amount, 0) - 
            //            dataOut.reduce((res, item) => res -= item.amount, 0);
            //console.log(lastItem);
            this.amount += lastItem.sign ? +lastItem.amount : -lastItem.amount;
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
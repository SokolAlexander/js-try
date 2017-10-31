(function() {

    class Counter {

        constructor($el) {
            this.$el = $el;
			
			this._initEvents();
        }

        computeAmount(data) {
            let amnt = data.reduce((res, item) => res += item.sign ? +item.amount : -item.amount, 0);
            this.setAmount(amnt);
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
			let newAmount = prompt('Enter new amount?', this.amount);
			this.setAmount(newAmount);
			}
		}
    };

    window.Counter = Counter;
})();
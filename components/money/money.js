(function() {

    class Counter {

        constructor($el) {
            this.$el = $el;
			
			this._initEvents();
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
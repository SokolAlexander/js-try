(function() {

	/**
	 * class representing a money counter
	 */
    class Counter {

		/**
		 * Create a money counter
		 * @param {HTMLElement}  
		 */
        constructor($el) {
            this.$el = $el;
        }

		/**
		 * compute remaining amount of money based on income/outcome
		 * @param {Object} income 
		 * @param {Object} outcome 
		 */
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

		/**
		 * render a counter
		 */
        _render() {
            this.$el.innerHTML = `${this.amount}<div class="edit"></div>`;
        }
		
    };

    window.Counter = Counter;
})();
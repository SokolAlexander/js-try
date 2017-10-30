'use strict';

(function(){

    class Form {

        /**
         * create a form
         * @param {HTMLElement}  
         */
        constructor($el) {
            this.$el = $el;
            this._initEvents();
        }

        /**
         * render a form
         */
        render() {
            this.$el.innerHTML = `<form><table class="form-wrapper"><tr><td><input type="number" placeholder="amount of money"></td>
                                  <td><input type="text" placeholder="comment (unnessecary)">
                                  </td></tr></table></form><div class="error"></div>`;
        }

        /**
         * initialise event listeners
         */
        _initEvents() {
            this.$el.addEventListener('submit', this._onSubmit.bind(this));
        }

        /**
         * Submit form
         * @param {event} event 
         */
        _onSubmit(event) {
            event.preventDefault();
           /*  debugger;
            
            let amount = this.$el.querySelector("input[type='number']").value;
            let comment = this.$el.querySelector("input[type='text']").value;
            
            let formSubmit = new CustomEvent('formSubmit', {bubbles: true, detail: {url: url, anchor: anchor}});

            if (amount) {
                console.log(`form submitted, url: ${url}, anchor: ${anchor}`);
                this.$el.dispatchEvent(formSubmit);
                this.$el.querySelector('form').reset();
                }; */
        }
		
		/**
		*Get data from form, if there is amount, call _requestAmount otherwise
		*@param {string}
		*return {object}
		*/
		getData(category) {
            let amount = this.$el.querySelector("input[type='number']").value;
			console.log(amount);
            let comment = this.$el.querySelector("input[type='text']").value;
			
			if (!amount) {
				console.log(amount);
				this._showWarning();
				return false;
			}
			
			this._hideWarning();
			this.$el.querySelector('form').reset();
			
			return {category: category,
					amount: amount,
					comment: comment}
		}
		
		/**
		*Show warning that requests to fill the amount field
		*/
		_showWarning() {
			let error = this.$el.querySelector('.error')
			error.innerHTML = 'Enter a number';
			error.classList.add('display-error');
			
		}
		
		_hideWarning() {
			let error = this.$el.querySelector('.error')
			error.classList.remove('display-error');
			}
		}
		
    //export
    window.Form = Form;
})();
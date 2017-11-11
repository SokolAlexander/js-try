'use strict';

(function(){

    /**
     * class representing a form for data input
     */
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
         * prevent form from submitting
         * @param {event} event 
         */
        _onSubmit(event) {
            event.preventDefault();
        }
		
		/**
		*Get data from form, if there is amount, call _showWarning otherwise
		*@param {Object}
		*@return {object}
		*/
		getData(item) {
            let amount = this.$el.querySelector("input[type='number']").value;
            let comment = this.$el.querySelector("input[type='text']").value;
			
			if (!amount) {
				this._showWarning();
				return false;
			}
			
			this._hideWarning();
            this.$el.querySelector('form').reset();
			
			return {category: item.category,
					amount: amount,
                    comment: comment,
                    sign: item.sign}
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